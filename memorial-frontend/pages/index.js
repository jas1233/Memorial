"use client";
import { useEffect, useState } from "react";
import { fetchMemorials } from "@/api/memorials";
import MemorialCard from "@/components/MemorialCard";

export default function Home() {
    const [memorials, setMemorials] = useState([]);

    useEffect(() => {
        fetchMemorials().then(setMemorials);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Online Memorial</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {memorials.map((memorial) => (
                    <MemorialCard key={memorial._id} memorial={memorial} />
                ))}
            </div>
        </div>
    );
}
