"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-16 h-16 border-4 border-t-[#1b9c85] border-b-[#159872] border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
        <h2 className="text-3xl mb-4 font-semibold">Product not found</h2>
        <Link
          href="/products"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1b9c85] to-[#159872] text-white shadow-md hover:scale-105 transition-transform"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-6xl overflow-hidden bg-white">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-96 md:h-auto">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center text-gray-800">
          <h1 className="text-4xl font-bold mb-4 text-[#1b9c85]">
            {product.name}
          </h1>
          <p className="mb-4">
            <span className="font-semibold mr-2">Category:</span>
            <span className="inline-block bg-[#159872]/10 text-[#159872] px-3 py-1 rounded-full font-medium border border-[#1b9c85]/50 shadow-sm">
              {product.category}
            </span>
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>
          <p className="text-2xl font-bold mb-6 text-[#1b9c85] bg-gray-100 py-2 px-4 rounded-xl shadow-md inline-block border border-[#1b9c85]/50 hover:scale-105 transform transition-all duration-300">
            Price: ${product.price}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1b9c85] to-[#159872] text-white font-medium shadow-md hover:scale-105 transition-transform"
            >
              Go Back
            </button>
            <Link
              href="/products"
              className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium shadow-md transition-transform hover:scale-105"
            >
              All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
