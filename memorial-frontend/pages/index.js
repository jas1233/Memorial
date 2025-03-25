import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [memorials, setMemorials] = useState([]);

  useEffect(() => {
    await axios.post("memorial-production.up.railway.app", form);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Memorials</h1>
      <div className="grid grid-cols-3 gap-4">
        {memorials.map((m, index) => (
          <div key={index} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{m.name}</h2>
            <p>{m.birthDate} - {m.deathDate}</p>
            <p>{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
