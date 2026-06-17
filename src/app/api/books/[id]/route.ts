import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";
import { getSession } from "@/lib/session";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const book = await Book.findOne(query);
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch book details", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const available = Number(body.availableCopies ?? 0);
    let computedStatus = body.status;
    if (available === 0) {
      computedStatus = "Out of Stock";
    } else if (computedStatus === "Out of Stock") {
      computedStatus = "Available";
    }

    const book = await Book.findOneAndUpdate(
      query,
      {
        title: body.title,
        author: body.author,
        isbn: body.isbn || undefined,
        category: body.category,
        totalCopies: Number(body.totalCopies ?? 1),
        availableCopies: available,
        shelfLocation: body.shelfLocation,
        status: computedStatus,
      },
      { new: true, runValidators: true },
    );

    if (!book) {
      return NextResponse.json({ message: "Book not found or access denied" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update book details", error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { schoolId, role } = session;

    await connectDB();
    const { id } = await params;

    const query: Record<string, any> = { _id: id };
    if (role !== "Super Admin") {
      query.schoolId = schoolId;
    }

    const book = await Book.findOneAndDelete(query);
    if (!book) {
      return NextResponse.json({ message: "Book not found or access denied" }, { status: 404 });
    }
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete book record", error: (error as Error).message },
      { status: 500 },
    );
  }
}
