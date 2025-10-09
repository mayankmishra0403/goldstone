import Link from 'next/link';

export default function RoomNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Room Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the room you're looking for.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}