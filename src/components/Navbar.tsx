"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
	return (
		<nav className="w-full sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b bg-white text-black">
			<Link href="/" className="font-bold text-lg">
				ArtPort
			</Link>

			<div className="flex space-x-4">
				<Link href="/explore">Explore</Link>
				<div className="w-0.5 bg-gray-200" />
				<Link href="#">Categories</Link>
				<div className="w-0.5 bg-gray-200" />
				<Link href="#">Artist</Link>
				<div className="w-0.5 bg-gray-200" />
				<Link href="#">About Us</Link>
				<div className="w-0.5 bg-gray-200" />
				<Link href="#">Contact</Link>
				<Link href="/profile">
					<FaUserCircle className="text-2xl hover:text-gray-500 cursor-pointer" />
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
