'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from 'aws-amplify';

export const useRoleRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                // Get the currently authenticated user
                const user = await Auth.currentAuthenticatedUser();

                // Extract groups from user's attributes
                const groups = user.signInUserSession.idToken.payload['cognito:groups'] || [];

                // Handle redirection based on groups
                if (groups.length === 0) {
                    router.push('/select-role');
                } else if (groups.includes('customer')) {
                    router.push('/dashboard/customer');
                } else if (groups.includes('counsellor')) {
                    router.push('/dashboard/counsellor');
                } else {
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Error fetching user:', error);

                // Redirect to home page if user is unauthenticated
                router.push('/');
            }
        };

        checkUser();
    }, [router]);
};