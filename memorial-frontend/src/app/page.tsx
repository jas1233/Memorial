import memorials from "@/data/memorials.json";
import MemorialCard from "@/components/MemorialCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Online Memorial</h1>
      <Link href="/create" className="block text-center mb-6 text-blue-600 underline">+ Create a Memorial</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memorials.map((memorial) => (
          <MemorialCard key={memorial.id} memorial={memorial} />
        ))}
      </div>
    </div>
  );
}
