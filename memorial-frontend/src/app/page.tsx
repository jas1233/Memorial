"use client";
import { useEffect, useState } from "react";

interface Memorial {
  _id: string;
  name: string;
  message: string;
}

export default function Home() {
  const [memorials, setMemorials] = useState<Memorial[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMemorials() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/memorials`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setMemorials(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchMemorials();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !message) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/memorials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (!res.ok) throw new Error("Failed to add memorial");

      const newMemorial = await res.json();
      setMemorials((prev) => [...prev, newMemorial]);

      // Clear form
      setName("");
      setMessage("");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold">Memorials</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Memorial Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <input
          type="text"
          placeholder="Enter Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Enter Message"
          className="border p-2 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Memorial
        </button>
      </form>

      {/* Memorial List */}
      <div className="mt-5">
        {memorials.length > 0 ? (
          memorials.map((memorial) => (
            <div key={memorial._id} className="border p-4 my-2">
              <h2 className="text-xl font-semibold">{memorial.name}</h2>
              <p>{memorial.message}</p>
            </div>
          ))
        ) : (
          <p>No memorials found.</p>
        )}
      </div>
    </main>
  );
}
