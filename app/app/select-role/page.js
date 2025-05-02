'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRoleRedirect } from '@/app/hooks/useRoleRedirect';

export default function SelectRolePage() {
    const router = useRouter();
    useRoleRedirect(); // If the user already has a role, redirect

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (err) {
                console.error('User not authenticated:', err);
                router.push('/');
            }
        };

        fetchUser();
    }, [router]);

    const assignGroup = async (group) => {
        if (!user) return;

        await fetch('/api/assign-group', {
            method: 'POST',
            body: JSON.stringify({
                group,
                username: user.username,
            }),
        });

        localStorage.setItem('cognito:group', group);
        router.push(`/dashboard/${group}`);
    };

    const email = user?.signInUserSession?.idToken?.payload?.email || '';

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
            <h1 className="text-2xl font-semibold mb-4">Welcome {email} 👋</h1>
            <p className="text-gray-600 mb-6">Select how you want to use ConsultNow:</p>
            <div className="flex gap-6">
                <button
                    onClick={() => assignGroup('customer')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                    I’m a Customer
                </button>
                <button
                    onClick={() => assignGroup('counsellor')}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                    I’m a Counsellor
                </button>
            </div>
        </main>
    );
}
