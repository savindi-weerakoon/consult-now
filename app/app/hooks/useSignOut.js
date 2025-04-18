'use client';

import { Auth } from '@/lib/amplify-auth';

export const useSignOut = () => {
    const signOut = async () => {
        try {
            localStorage.removeItem('cognito:group');
            await Auth.signOut();
        } catch (err) {
            console.error('Sign-out error:', err);
        }
    };

    return { signOut };
};
