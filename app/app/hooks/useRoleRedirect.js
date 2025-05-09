'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hub } from 'aws-amplify/utils';
import { fetchAuthSession } from 'aws-amplify/auth';

export const useRoleRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const checkUserGroups = async () => {
            try {
                let groups = [];

                // Check localStorage first (in case group was just selected)
                const localGroup = localStorage.getItem('cognito:group');
                if (localGroup) {
                    groups = [localGroup];
                }

                // Try to get ID token and decode groups from it
                const session = await fetchAuthSession();
                const idToken = session.tokens?.idToken?.toString();

                if (idToken) {
                    const payload = JSON.parse(atob(idToken.split('.')[1]));
                    const awsGroups = payload['cognito:groups'];

                    if (awsGroups) {
                        groups = awsGroups;
                        localStorage.removeItem('cognito:group'); // Clean up if previously stored
                    }
                }

                // Perform redirection based on groups
                if (groups.length === 0) {
                    router.push('/select-role');
                } else if (groups.includes('customer')) {
                    router.push('/dashboard/customer');
                } else if (groups.includes('counsellor')) {
                    router.push('/dashboard/counsellor');
                } else {
                    router.push('/dashboard');
                }
            } catch (err) {
                console.error('Failed to check user groups:', err);
                router.push('/');
            }
        };

        // Listen to auth events like signInWithRedirect
        const unsubscribe = Hub.listen('auth', ({ payload }) => {
            if (payload.event === 'signInWithRedirect') {
                checkUserGroups();
            }
        });

        // Initial call
        checkUserGroups();

        return unsubscribe;
    }, [router]);
};
