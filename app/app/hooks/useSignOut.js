'use client';

import { signOut } from '@/lib/amplify-auth';

export const useSignOut = () => {
    const handleSignOut = async () => {
        try {
            localStorage.removeItem('cognito:group');
            await signOut(); // 🔐 will trigger hosted UI redirect
        } catch (err) {
            console.error('Sign-out error:', err);
        }
    };

    return { signOut: handleSignOut };
};
