import { useParams } from "next/navigation";
import memorials from "@/data/memorials.json";
import Image from "next/image";

export default function MemorialPage() {
  const { id } = useParams();
  const memorial = memorials.find((mem) => mem.id === id);

  if (!memorial) return <p className="text-center mt-10 text-gray-500">Memorial not found</p>;

  return (
    <div className="container mx-auto p-8 text-center">
      <Image src={memorial.image} alt={memorial.name} width={200} height={200} className="rounded-full mx-auto" />
      <h1 className="text-3xl font-bold mt-4">{memorial.name}</h1>
      <p className="text-gray-500">{memorial.dob} - {memorial.dod}</p>
      <p className="mt-4 text-lg">{memorial.bio}</p>
    </div>
  );
}

