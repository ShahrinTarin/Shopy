"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductHighlights = () => {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/productsfilter")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const highlightColor = "#1b9c85"; 
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-16 h-16 border-4 border-t-[#1b9c85] border-b-[#159872] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-28 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 relative inline-block">
          Featured <span style={{ color: highlightColor }}>Products</span>
          <div
            className="w-24 h-1 mx-auto mt-2 rounded-full"
            style={{ backgroundColor: highlightColor }}
          ></div>
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300"
            >
              {/* Product Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-110 transition duration-500"
                />
                {/* Price Overlay */}
                <div
                  className="absolute top-3 right-3 text-white px-3 py-1 rounded-full font-semibold shadow-md"
                  style={{ backgroundColor: highlightColor }}
                >
                  ${product.price}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>

                <p className="text-gray-500 mb-4">
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </p>

                <Link
                  href={`/products/${product._id}`}
                  className="inline-block px-6 py-2 rounded-full font-medium text-white transition"
                  style={{ backgroundColor: highlightColor }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="bg-white border px-8 py-3 rounded-full font-semibold transition"
            style={{
              borderColor: highlightColor,
              color: highlightColor,
            }}
          >
            See All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
