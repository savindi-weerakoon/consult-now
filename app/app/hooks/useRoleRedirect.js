'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hub } from 'aws-amplify/utils';
import { getCurrentUser } from 'aws-amplify/auth';

export const useRoleRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        // Function to check and redirect based on group
        const checkUser = async () => {
            try {
                const user = await getCurrentUser();
                const groups = user.signInUserSession?.idToken?.payload['cognito:groups'] || [];

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
                console.error('User not authenticated:', error);
                router.push('/');
            }
        };

        // Listen for sign-in events
        const unsubscribe = Hub.listen('auth', ({ payload }) => {
            if (payload.event === 'signInWithRedirect') {
                checkUser();
            }
        });

        // Initial check
        checkUser();

        return unsubscribe;
    }, [router]);
};
