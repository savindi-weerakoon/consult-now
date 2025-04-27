'use client';
// ✅ Do NOT mark this whole file as 'use client'
// Because `metadata` must be server-side

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AuthProviderWrapper from './auth-wrapper'; // NEW FILE

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Authenticator>
          {({ signOut }) => (
            <AuthProviderWrapper>
              <header style={{ margin: '20px' }}>
                <button
                  onClick={signOut}
                  style={{
                    fontSize: '0.8rem',
                    padding: '5px 10px',
                    marginTop: '20px',
                  }}
                >
                  Sign Out
                </button>
              </header>
              {children}
            </AuthProviderWrapper>
          )}
        </Authenticator>
      </body>
    </html>
  );
}
