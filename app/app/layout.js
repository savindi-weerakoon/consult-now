'use client';
// ✅ Do NOT mark this whole file as 'use client'
// Because `metadata` must be server-side

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Amplify imports
import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './../aws-exports';

// Configure Amplify
Amplify.configure(awsExports);

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Authenticator>
          {({ signOut }) => (
            <>
              <header className="px-6 py-4 flex justify-between items-center bg-white shadow-md">
                <h1 className="text-2xl font-bold text-blue-800">ConsultNow</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => signOut()}
                      className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </header>
              {children}
            </>
          )}
        </Authenticator>
      </body>
    </html>
  );
}
