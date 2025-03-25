import { useState } from "react";
import axios from "axios";

export default function AddMemorial() {
  const [form, setForm] = useState({ name: "", birthDate: "", deathDate: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/memorials", form);
    alert("Memorial Added");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">Add Memorial</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
        <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 w-full" />
        <input type="date" onChange={(e) => setForm({ ...form, birthDate: e.target.value })} className="border p-2 w-full" />
        <input type="date" onChange={(e) => setForm({ ...form, deathDate: e.target.value })} className="border p-2 w-full" />
        <textarea placeholder="Message" onChange={(e) => setForm({ ...form, message: e.target.value })} className="border p-2 w-full"></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
      </form>
    </div>
  );
}
