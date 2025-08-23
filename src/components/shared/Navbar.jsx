"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoMenu, IoClose, IoHomeOutline, IoBagOutline, IoGridOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const ActionButton = ({ href, label, color = "#1b9c85", fullWidth = false, onClick }) => {
  const baseStyle =
    "rounded-full px-5 py-2 font-medium transition-all duration-300 flex items-center justify-center gap-2";

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={fullWidth ? "w-full" : ""}>
      <Link
        href={href || "#"}
        className={baseStyle}
        style={{ border: `1px solid ${color}`, color: color, backgroundColor: "transparent" }}
        onClick={onClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = color;
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = color;
        }}
      >
        {label}
      </Link>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const logoColor = "#1b9c85";

  const navItems = [
    { title: "Home", path: "/", icon: <IoHomeOutline size={20} /> },
    { title: "Products", path: "/products", icon: <IoBagOutline size={20} /> },
    ...(status === "authenticated" && session?.user
      ? [{ title: "Dashboard", path: "/dashboard/add-product", icon: <IoGridOutline size={20} /> }]
      : []),
  ];

  const isActive = (path) => pathname === path;

  const renderAuthButton = () => {
    if (status === "loading")
      return <div className="w-24 h-10 bg-gray-400/50 rounded-full animate-pulse" />;
    if (status === "authenticated" && session?.user)
      return (
        <ActionButton
          label="Logout"
          color={logoColor}
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: "/" });
          }}
        />
      );
    return <ActionButton href="/login" label="Login" color={logoColor} />;
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/60 backdrop-blur-lg shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50">
            <g fill="none" stroke={logoColor} strokeWidth="3">
              <circle cx="10" cy="40" r="4" />
              <circle cx="30" cy="40" r="4" />
              <path d="M3 5 L15 5 L28 35 L40 35" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
          <span className="text-xl font-bold text-gray-900">Shopy</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300`}
              style={{
                background: isActive(item.path) ? "rgba(27,156,133,0.15)" : "transparent",
                color: isActive(item.path) ? "#1b9c85" : "#333",
              }}
            >
              {item.icon} <span>{item.title}</span>
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">{renderAuthButton()}</div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-2xl ml-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-white/70 backdrop-blur-lg border-t border-gray-200 shadow-md"
        >
          <ul className="flex flex-col space-y-3 p-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-[#1b9c85]/20 hover:text-[#1b9c85]"
                  style={{ color: isActive(item.path) ? "#1b9c85" : "#333" }}
                >
                  {item.icon} <span>{item.title}</span>
                </Link>
              </li>
            ))}
            <li>{renderAuthButton()}</li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
