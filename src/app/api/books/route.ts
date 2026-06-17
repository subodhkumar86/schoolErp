import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, any> = {};
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    } else {
      const filterSchoolId = searchParams.get("schoolId");
      if (filterSchoolId) query.schoolId = filterSchoolId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } },
      ];
    }
    if (category) query.category = category;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Compute library statistics scoped to the active tenant/school
    const statsQuery: Record<string, any> = {};
    if (role !== "Super Admin") statsQuery.schoolId = schoolId;

    const allBooks = await Book.find(statsQuery);
    let totalCopiesSum = 0;
    let availableCopiesSum = 0;
    let outOfStockCount = 0;

    allBooks.forEach((b) => {
      totalCopiesSum += b.totalCopies || 0;
      availableCopiesSum += b.availableCopies || 0;
      if ((b.availableCopies || 0) <= 0) {
        outOfStockCount++;
      }
    });

    const stats = {
      totalTitles: allBooks.length,
      totalBooks: totalCopiesSum,
      availableBooks: availableCopiesSum,
      issuedBooks: Math.max(0, totalCopiesSum - availableCopiesSum),
      outOfStock: outOfStockCount,
    };

    return NextResponse.json({ data: books, total, stats, page, limit });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch library catalog", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const body = await request.json();

    const targetSchoolId = role === "Super Admin" ? (body.schoolId || null) : schoolId;
    if (!targetSchoolId && role !== "Super Admin") {
      return NextResponse.json({ message: "School Tenant ID required" }, { status: 400 });
    }

    const available = Number(body.availableCopies ?? body.totalCopies ?? 1);
    const total = Number(body.totalCopies ?? 1);
    let computedStatus = body.status || "Available";
    if (available === 0) {
      computedStatus = "Out of Stock";
    }

    const book = await Book.create({
      schoolId: targetSchoolId,
      title: body.title,
      author: body.author,
      isbn: body.isbn,
      category: body.category,
      shelfLocation: body.shelfLocation || "",
      availableCopies: available,
      totalCopies: total,
      status: computedStatus,
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add book to catalog", error: (error as Error).message },
      { status: 500 },
    );
  }
}
