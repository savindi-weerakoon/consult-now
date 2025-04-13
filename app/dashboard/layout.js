// app/dashboard/layout.js
'use client';

import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';
import { useSignOut } from '@/app/hooks/useSignOut';
import { useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/app/components/Breadcrumb';

export default function DashboardLayout({ children }) {
    const auth = useAuth();
    const router = useRouter();
    const { signOut } = useSignOut();

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            router.push('/');
        }
    }, [auth.isLoading, auth.isAuthenticated]);

    if (auth.isLoading) {
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

    if (!auth.isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <Breadcrumb />

                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                        {auth.user?.profile?.email}
                    </span>
                    <button
                        onClick={signOut}
                        className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            {/* Nested route content */}
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}
