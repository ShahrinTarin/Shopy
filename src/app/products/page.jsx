"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const highlightColor = "#1b9c85";

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-16 h-16 border-4 border-t-[#1b9c85] border-b-[#159872] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
        Our <span style={{ color: highlightColor }}>Products</span>
        <div
          className="w-36 h-1 mx-auto mt-4 rounded-full"
          style={{ backgroundColor: highlightColor }}
        ></div>
      </h1>

      {/* Products Grid */}
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#1b9c85]/40"
          >
            {/* Image */}
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                className="group-hover:scale-110 transition-transform duration-500"
              />
              {/* Price Badge */}
              <div
                className="absolute bottom-3 left-3 text-white px-4 py-1 rounded-full font-semibold shadow-md text-sm"
                style={{ backgroundColor: highlightColor }}
              >
                ${product.price}
              </div>
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="text-lg md:text-xl font-semibold mb-3 group-hover:text-[#1b9c85] transition-colors">
                {product.name}
              </h2>
              <p className="text-gray-500 mb-5 line-clamp-3 text-sm">
                {product.description}
              </p>
              <Link
                href={`/products/${product._id}`}
                className="inline-block px-6 py-2 rounded-full font-medium text-white shadow-md hover:shadow-lg transition"
                style={{ backgroundColor: highlightColor }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
