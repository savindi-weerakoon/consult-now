'use client';
import './globals.css';

import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { useRouter } from 'next/navigation';
import { useRoleRedirect } from './hooks/useRoleRedirect';

Amplify.configure(awsExports);

export default function RootLayout({ children }) {
  useRoleRedirect();
  
  const router = useRouter();

  return (
    <html lang="en">
      <body className='flex flex-center items-center justify-center flex-col bg-white'>
        <Authenticator>
          {({ signOut }) => (
            <div className='w-full min-h-screen flex flex-col'>
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
            </div>
          )}
        </Authenticator>
      </body>
    </html>
  );
}
