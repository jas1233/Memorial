"use client";

import { useState, useEffect } from "react";
import MemorialCard from "@/components/MemorialCard";

export default function Home() {
  const [memorials, setMemorials] = useState([]);

  useEffect(() => {
    async function fetchMemorials() {
      const res = await fetch("http://memorial-production.up.railway.app");
      const data = await res.json();
      setMemorials(data);
    }
    fetchMemorials();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Online Memorial</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memorials.map((memorial) => (
          <MemorialCard key={memorial._id} memorial={memorial} />
        ))}
      </div>
    </div>
  );
}
