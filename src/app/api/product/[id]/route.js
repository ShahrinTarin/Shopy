import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params; 
    const db = await connectDB();
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
  }
}
