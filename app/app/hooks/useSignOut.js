'use client';

import { signOut } from 'aws-amplify/auth';

export const useSignOut = () => {
    const signOutHandler = async () => {
        try {
            localStorage.removeItem('cognito:group');

            const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
            const logoutUri = process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI;
            const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;

            const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;

            // Sign out from Amplify session
            await signOut();

            // Redirect to Cognito Hosted UI logout
            window.location.href = logoutUrl;
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return { signOut: signOutHandler };
};
