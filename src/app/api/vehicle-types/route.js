import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const DB_NAME = "automotivecarcare";
const COLLECTION_NAME = "vehicletypes";

// GET - Fetch all vehicle types
export async function GET() {
  try {
    const client = await connectDB();
    const db = client.db(DB_NAME);
    const vehicleTypes = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ order: 1 })
      .toArray();
    
    return NextResponse.json({ 
      success: true, 
      vehicleTypes 
    });
  } catch (error) {
    console.error("GET vehicle types error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new vehicle type
export async function POST(request) {
  try {
    const client = await connectDB();
    const db = client.db(DB_NAME);
    const body = await request.json();
    
    // Add timestamps
    const vehicleData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection(COLLECTION_NAME).insertOne(vehicleData);
    
    const vehicleType = {
      _id: result.insertedId,
      ...vehicleData,
    };
    
    return NextResponse.json({ 
      success: true, 
      vehicleType 
    });
  } catch (error) {
    console.error("POST vehicle type error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete vehicle type
export async function DELETE(request) {
  try {
    const client = await connectDB();
    const db = client.db(DB_NAME);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Vehicle type ID is required" },
        { status: 400 }
      );
    }
    
    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id),
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Vehicle type not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Vehicle type deleted successfully" 
    });
  } catch (error) {
    console.error("DELETE vehicle type error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
