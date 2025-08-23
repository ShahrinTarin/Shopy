"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false); // for form submit
  const [pageLoading, setPageLoading] = useState(true); // for page load spinner

  const logoColor = "#1b9c85";

  useEffect(() => {
    if (status !== "loading") {
      setPageLoading(false); // stop page loader once session is checked
      if (!session) router.push("/api/auth/signin");
    }
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/productsave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
         toast.success("Product added!");
        setProduct({ name: "", price: "", description: "" });
      } else {
        toast.error("Failed to add product.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-[#1b9c85]/40 border-t-[#1b9c85] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Background Gradients */}
        <div
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-tr from-[#1b9c85]/50 to-[#1b9c85]/20 rounded-full blur-3xl"
          style={{ animation: "spinGlow 30s linear infinite" }}
        ></div>
        <div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-bl from-[#1b9c85]/40 to-[#1b9c85]/10 rounded-full blur-3xl"
          style={{ animation: "spinReverseGlow 40s linear infinite" }}
        ></div>

        {/* Animated Logo */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="40"
            viewBox="0 0 200 50"
            className="cursor-pointer"
            style={{ animation: "floatGlow 4s ease-in-out infinite", transformOrigin: "50% 50%" }}
          >
            <g fill="none" stroke={logoColor} strokeWidth="3">
              <circle cx="15" cy="40" r="5" />
              <circle cx="45" cy="40" r="5" />
              <path d="M5 5 L20 5 L35 35 L50 35" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text
              x="60"
              y="35"
              fontFamily="Arial, sans-serif"
              fontSize="28"
              fill={logoColor}
              fontWeight="bold"
            >
              Shopy
            </text>
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-[#1b9c85] mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="p-3 border border-[#1b9c85]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b9c85] transition placeholder-gray-400"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="p-3 border border-[#1b9c85]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b9c85] transition placeholder-gray-400"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              placeholder="Write a description..."
              className="p-3 border border-[#1b9c85]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b9c85] transition placeholder-gray-400 resize-none h-28"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1b9c85] cursor-pointer hover:bg-[#159872] text-white py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
          >
            {loading && (
              <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        {/* Inline Animations */}
        <style>
          {`
            @keyframes floatGlow {
              0%, 100% { transform: translateY(0); filter: brightness(100%); }
              50% { transform: translateY(-8px); filter: brightness(115%); }
            }
            @keyframes spinGlow {
              0% { transform: rotate(0deg); filter: brightness(100%); }
              50% { filter: brightness(120%); }
              100% { transform: rotate(360deg); filter: brightness(100%); }
            }
            @keyframes spinReverseGlow {
              0% { transform: rotate(360deg); filter: brightness(100%); }
              50% { filter: brightness(120%); }
              100% { transform: rotate(0deg); filter: brightness(100%); }
            }
          `}
        </style>
      </div>
    </div>
  );
}
