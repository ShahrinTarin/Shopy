"use client";

import React from "react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-[#b2fef7] via-[#80cbc4]/70 to-[#1b9c85]/50 text-gray-700 py-6 overflow-hidden border-t border-gray-200">
      
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Slogan */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 50 50"
              className="drop-shadow-md"
            >
              <g fill="none" stroke="#00695c" strokeWidth="3">
                <circle cx="10" cy="40" r="4" />
                <circle cx="30" cy="40" r="4" />
                <path
                  d="M3 5 L15 5 L28 35 L40 35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span className="text-lg font-bold text-[#00695c]">Shopy</span>
          </div>
          <p className="text-gray-600 text-sm text-center md:text-left">
            Your one-stop shop for amazing products.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="#"
            className="hover:text-[#004d40] transition-all transform hover:scale-110"
          >
            <BsFacebook size={22} />
          </a>
          <a
            href="#"
            className="hover:text-[#004d40] transition-all transform hover:scale-110"
          >
            <BsTwitter size={22} />
          </a>
          <a
            href="#"
            className="hover:text-[#004d40] transition-all transform hover:scale-110"
          >
            <BsInstagram size={22} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-gray-500 text-center text-xs mt-3">
        &copy; {new Date().getFullYear()} Shopy. All rights reserved.
      </div>

      {/* Floating soft gradient circles */}
      <div className="absolute -top-16 -left-16 w-36 h-36 bg-gradient-to-tr from-[#00695c]/20 via-[#80cbc4]/10 to-[#b2fef7]/0 rounded-full blur-3xl animate-spin-slow"></div>
      <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-gradient-to-bl from-[#00695c]/20 via-[#80cbc4]/10 to-[#b2fef7]/0 rounded-full blur-3xl animate-spin-slow-reverse"></div>

      <style>
        {`
          @keyframes spinGlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spinReverseGlow {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          .animate-spin-slow { animation: spinGlow 60s linear infinite; }
          .animate-spin-slow-reverse { animation: spinReverseGlow 60s linear infinite; }
        `}
      </style>
    </footer>
  );
};

export default Footer;
