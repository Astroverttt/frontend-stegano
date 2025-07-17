"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ArtworkCard from "@/components/ArtworkCard";
import Navbar from "@/components/Navbar";

interface Artwork {
  id: string;
  title: string;
  username: string;
  image_url: string;
  likes: number;
}

export default function HomePage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DEV_LINK}/artworks`)
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch(() => {
        setArtworks([]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white text-black min-h-screen pt-24 px-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Showcase Your Digital Art
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join the community of creative digital artists
        </p>

        {/* Search bar
        <div className="max-w-xl mx-auto mb-6">
          <div className="flex gap-2 border rounded-full px-4 py-2">
            <input
              placeholder="What are you looking for?"
              className="flex-grow outline-none text-sm"
            />
            <button className="text-white bg-pink-500 px-4 py-1 rounded-full text-sm">
              Search
            </button>
          </div>
        </div> */}

        {/* Filter kategori */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {[
            "All Categories",
            "Sub Categories",
            "Latest",
            "Popular",
            "Brand Logo",
            "Football",
            "Paint",
          ].map((cat, i) => (
            <button
              key={i}
              className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100 transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Artwork list */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!loading && artworks.length > 0
            ? artworks.map((art) => (
                <ArtworkCard
                  key={art.id}
                  title={art.title}
                  username={art.username}
                  imageUrl={art.image_url}
                  likes={art.likes}
                />
              ))
            : !loading && (
                <div className="col-span-full text-center">
                  <Image
                    src="/no-data.jpg"
                    alt="No Data"
                    width={300}
                    height={300}
                    className="mx-auto mb-4"
                  />
                  <h2 className="text-lg text-gray-500">
                    404 - No artworks found
                  </h2>
                </div>
              )}
        </div>
      </div>
    </>
  );
}
