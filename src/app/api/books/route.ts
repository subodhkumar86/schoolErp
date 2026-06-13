import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Compute library statistics across ALL books
    const allBooks = await Book.find({});
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
      { message: "Failed to fetch library catalog", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Auto calculate status based on available copies
    const available = Number(body.availableCopies ?? body.totalCopies ?? 1);
    const total = Number(body.totalCopies ?? 1);
    let computedStatus = body.status || "Available";
    if (available === 0) {
      computedStatus = "Out of Stock";
    }

    const book = await Book.create({
      ...body,
      availableCopies: available,
      totalCopies: total,
      status: computedStatus,
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add book to catalog", error },
      { status: 500 },
    );
  }
}
