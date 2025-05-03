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
                debugger
                const session = await fetchAuthSession();
                const idToken = session.tokens?.idToken?.toString();

                if (!idToken) throw new Error('No ID token found');

                const payload = JSON.parse(atob(idToken.split('.')[1]));
                const groups = payload['cognito:groups'] || [];

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

        const unsubscribe = Hub.listen('auth', ({ payload }) => {
            if (payload.event === 'signInWithRedirect') {
                checkUserGroups();
            }
        });

        checkUserGroups();

        return unsubscribe;
    }, [router]);
};
