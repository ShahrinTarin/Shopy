import { connectDB } from "@/lib/connectDB";

export async function GET() {
  try {
    const db = await connectDB();
    
    // Fetch only 6 products
    const products = await db.collection("products")
      .find({})
      .limit(6)
      .toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}
