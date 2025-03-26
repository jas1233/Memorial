'use client';
import { useState } from 'react';
import { format } from 'date-fns';

interface Tribute {
  name: string;
  message: string;
  date: string;
}

interface Memorial {
  _id: string;
  name: string;
  birthDate: string;
  deathDate: string;
  biography: string;
  imageUrl?: string;
  tributes: Tribute[];
}

interface MemorialCardProps {
  memorial: Memorial;
}

export default function MemorialCard({ memorial }: MemorialCardProps) {
  const [tribute, setTribute] = useState({
    name: '',
    message: '',
  });
  const [tributes, setTributes] = useState<Tribute[]>(memorial.tributes || []);

  const handleTributeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTribute(prev => ({ ...prev, [name]: value }));
  };

  const handleTributeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tribute.name || !tribute.message) return;

    try {
      const response = await fetch(`/api/memorials/${memorial._id}/tributes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tribute),
      });

      if (response.ok) {
        const newTribute = await response.json();
        setTributes(prev => [...prev, newTribute]);
        setTribute({ name: '', message: '' });
      }
    } catch (error) {
      console.error('Error adding tribute:', error);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center space-x-4">
          {memorial.imageUrl && (
            <img
              className="h-24 w-24 rounded-full object-cover"
              src={memorial.imageUrl}
              alt={memorial.name}
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{memorial.name}</h1>
            <p className="text-gray-600">
              {format(new Date(memorial.birthDate), 'MMMM d, yyyy')} -{' '}
              {format(new Date(memorial.deathDate), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Biography</h2>
          <p className="mt-1 text-gray-600 whitespace-pre-line">{memorial.biography}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Tributes</h2>
          <div className="mt-4 space-y-4">
            {tributes.map((tribute, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{tribute.name}</p>
                <p className="text-gray-600 mt-1">{tribute.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {format(new Date(tribute.date), 'MMMM d, yyyy')}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleTributeSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={tribute.name}
                onChange={handleTributeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Tribute
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                value={tribute.message}
                onChange={handleTributeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Tribute
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
