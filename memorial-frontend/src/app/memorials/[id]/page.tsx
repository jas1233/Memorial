"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function MemorialDetails() {
    const { id } = useParams();
    const [memorial, setMemorial] = useState(null);

    useEffect(() => {
        fetch(`/api/memorials/${id}`).then(res => res.json()).then(setMemorial);
    }, [id]);

    if (!memorial) return <p>Loading...</p>;

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold">{memorial.name}</h1>
            <p>{memorial.dob} - {memorial.dod}</p>
            <p>{memorial.message}</p>
        </div>
    );
}
