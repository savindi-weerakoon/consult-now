'use client';

import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';
import { useRoleRedirect } from '@/app/hooks/useRoleRedirect';

export default function SelectRolePage() {
    const auth = useAuth();
    const router = useRouter();
    useRoleRedirect();

    const email = auth.user?.profile?.email;

    const assignGroup = async (group) => {
        await fetch('/api/assign-group', {
            method: 'POST',
            body: JSON.stringify({ group, username: auth.user.profile['cognito:username'] }),
        });

        await localStorage.setItem('cognito:group', group);

        router.push(`/dashboard/${group}`);
    };

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
