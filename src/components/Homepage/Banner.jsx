"use client";
import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full h-screen relative">
      {/* Background Image */}
      <Image
        src="https://png.pngtree.com/background/20210710/original/pngtree-nordic-minimalist-furniture-banner-design-picture-image_1039338.jpg"
        alt="Modern Interior"
        fill
        style={{ objectFit: "cover" }}
        className="absolute top-0 left-0 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Centered Text */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 md:px-24">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          We Help You <br /> Make Modern Interior
        </h1>
        <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-xl">
          We will help you create elegant and luxurious interiors designed by professional interior designers.
        </p>
        {/* Optional CTA Button */}
        <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;