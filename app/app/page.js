'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signInWithRedirect } from '@/lib/amplify-auth';

export default function LandingPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const signIn = async () => {
    try {
      await signInWithRedirect();
    } catch (err) {
      console.error('Sign-in error:', err);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null); // Not signed in
      } finally {
        setIsChecking(false);
      }
    };

    checkUser();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-between">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">ConsultNow</h1>

        {!isChecking && (
          user ? (
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={signIn}
              className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-green-700 transition"
            >
              Sign In
            </button>
          )
        )}
      </header>

      {/* Hero Section */}
      <section className="text-center px-4 py-20 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
          Empowering mental well-being, one session at a time
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          ConsultNow connects you with certified counsellors and wellness professionals anytime, anywhere.
          Safe. Confidential. Affordable.
        </p>
        <button
          onClick={signIn}
          className="bg-green-600 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:bg-green-700 transition"
        >
          Get Started Now
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 border-t">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Licensed Counsellors</h3>
            <p className="text-gray-500 text-sm">
              Access a network of certified professionals across specializations.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Secure Messaging</h3>
            <p className="text-gray-500 text-sm">
              Chat or book sessions with end-to-end encrypted messaging.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Book Anytime</h3>
            <p className="text-gray-500 text-sm">
              Schedule appointments at your convenience with flexible availability.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400">
        © {new Date().getFullYear()} ConsultNow. All rights reserved.
      </footer>
    </main>
  );
}
