'use client';

import { useAuth } from 'react-oidc-context';

export const useSignOut = () => {
    const auth = useAuth();

    const signOut = () => {
        auth.removeUser();
        localStorage.removeItem('cognito:group');

        const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
        const logoutUri = process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI;
        const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;

        const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
        window.location.href = logoutUrl;
    };

    return { signOut };
};
