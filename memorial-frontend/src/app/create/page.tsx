"use client";
import { useState } from "react";

export default function CreateMemorial() {
  const [form, setForm] = useState({ name: "", dob: "", dod: "", bio: "", image: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Memorial Created:", form);
    alert("Memorial submitted successfully!");
  };

  return (
    <div className="container mx-auto p-8 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Create a Memorial</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Name" className="border p-2 w-full" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="date" className="border p-2 w-full" onChange={(e) => setForm({ ...form, dob: e.target.value })} />
        <input type="date" className="border p-2 w-full" onChange={(e) => setForm({ ...form, dod: e.target.value })} />
        <textarea placeholder="Short bio" className="border p-2 w-full" onChange={(e) => setForm({ ...form, bio: e.target.value })}></textarea>
        <input type="text" placeholder="Image URL" className="border p-2 w-full" onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Create Memorial</button>
      </form>
    </div>
  );
}

