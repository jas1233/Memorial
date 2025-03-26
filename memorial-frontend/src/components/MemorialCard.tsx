import Link from "next/link";

export default function MemorialCard({ memorial }) {
    return (
        <Link href={`/memorials/${memorial._id}`}>
            <div className="p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-bold">{memorial.name}</h2>
                <p>{memorial.dob} - {memorial.dod}</p>
                <p>{memorial.message}</p>
            </div>
        </Link>
    );
}

