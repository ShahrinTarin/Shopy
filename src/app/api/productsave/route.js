import { connectDB } from "@/lib/connectDB";

export async function POST(req) {
  try {
    const body = await req.json();
    const db = await connectDB();

    const result = await db.collection("products").insertOne(body);

    return new Response(
      JSON.stringify({ success: true, insertedId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
