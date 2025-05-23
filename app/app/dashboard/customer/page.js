'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useRoleRedirect } from '@/app/hooks/useRoleRedirect';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useRoleRedirect();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        const groups = currentUser?.signInUserSession?.idToken?.payload['cognito:groups'] || [];

        if (groups.includes('customer')) {
          router.push('/dashboard/customer');
        } else if (groups.includes('counsellor')) {
          router.push('/dashboard/counsellor');
        } else {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error('User not authenticated:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          <p className="text-lg text-blue-700 font-semibold animate-pulse">
            Loading ConsultNow...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const email = user?.signInUserSession?.idToken?.payload?.email || '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">ConsultNow Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{email}</span>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome 👋</h2>
        <p className="text-gray-600 mb-2">
          This is your personalized dashboard. From here, you’ll be able to:
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>View available counsellors</li>
          <li>Book your sessions</li>
          <li>Send and receive messages</li>
        </ul>
      </main>
    </div>
  );
}
