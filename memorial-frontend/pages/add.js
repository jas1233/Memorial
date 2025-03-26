"use client";
import { useState } from "react";
import { addMemorial } from "@/api/memorials";

export default function AddMemorial() {
    const [form, setForm] = useState({ name: "", dob: "", dod: "", message: "", image: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addMemorial(form);
        window.location.href = "/";
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold">Add Memorial</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Name" className="w-full p-2 border" onChange={handleChange} required />
                <input type="date" name="dob" className="w-full p-2 border" onChange={handleChange} required />
                <input type="date" name="dod" className="w-full p-2 border" onChange={handleChange} required />
                <textarea name="message" placeholder="Message" className="w-full p-2 border" onChange={handleChange} required></textarea>
                <input type="text" name="image" placeholder="Image URL (optional)" className="w-full p-2 border" onChange={handleChange} />
                <button type="submit" className="w-full bg-blue-500 text-white p-2">Add Memorial</button>
            </form>
        </div>
    );
}
