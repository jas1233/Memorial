import MemorialCard from '@/components/MemorialCard';
import { connectToDB } from '@/lib/mongodb';
import Memorial from '@/models/memorial';
import Link from 'next/link';

export default async function Home() {
  await connectToDB();
  const memorials = await Memorial.find().sort({ createdAt: -1 }).limit(10);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Recent Memorials</h1>
        <Link
          href="/create"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create a Memorial
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memorials.map(memorial => (
          <Link key={memorial._id} href={`/memorials/${memorial._id}`}>
            <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {memorial.imageUrl && (
                <img
                  className="w-full h-48 object-cover"
                  src={memorial.imageUrl}
                  alt={memorial.name}
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{memorial.name}</h2>
                <p className="text-gray-600 mt-1">
                  {new Date(memorial.birthDate).toLocaleDateString()} -{' '}
                  {new Date(memorial.deathDate).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-500 line-clamp-3">{memorial.biography}</p>
                <div className="mt-3 text-sm text-indigo-600">
                  {memorial.tributes?.length || 0} tributes
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {memorials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No memorials yet. Be the first to create one.</p>
        </div>
      )}
    </div>
  );
}
