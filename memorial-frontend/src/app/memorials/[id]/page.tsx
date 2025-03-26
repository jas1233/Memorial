import MemorialCard from '@/components/MemorialCard';
import { connectToDB } from '@/lib/mongodb';
import Memorial from '@/models/memorial';
import { notFound } from 'next/navigation';

export default async function MemorialPage({ params }: { params: { id: string } }) {
  await connectToDB();
  const memorial = await Memorial.findById(params.id);

  if (!memorial) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <MemorialCard memorial={JSON.parse(JSON.stringify(memorial))} />
    </div>
  );
}
