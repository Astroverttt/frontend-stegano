"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b bg-white text-black">
      <div className="flex gap-6 font-medium">
        <Link href="/" className="font-bold text-lg">
          ArtPort
        </Link>
        <Link href="#">About Us</Link>
        <Link href="#">Contact</Link>
      </div>

      <div>
        <Link href="/profile">
          <FaUserCircle className="text-2xl hover:text-gray-500 cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
