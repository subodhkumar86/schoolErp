import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch book details", error },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // Auto compute status based on copies
    const available = Number(body.availableCopies ?? 0);
    let computedStatus = body.status;
    if (available === 0) {
      computedStatus = "Out of Stock";
    } else if (computedStatus === "Out of Stock") {
      computedStatus = "Available";
    }

    const book = await Book.findByIdAndUpdate(
      id,
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
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update book details", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete book record", error },
      { status: 500 },
    );
  }
}
