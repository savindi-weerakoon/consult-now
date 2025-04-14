'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'react-oidc-context';

export const useRoleRedirect = () => {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!auth.isLoading) {
            if (!auth.isAuthenticated) {
                router.push('/');
            } else {
                let cognitoGroupLocalStorage = null;
                const raw = localStorage.getItem('cognito:group');
                if (raw) {
                    cognitoGroupLocalStorage = [raw];
                }

                let cognitoGroupAWS = auth.user?.profile?.['cognito:groups'];
                if (cognitoGroupAWS) {
                    localStorage.removeItem('cognito:group');
                }

                const groups = cognitoGroupAWS || cognitoGroupLocalStorage || [];

                if (groups.length === 0) {
                    router.push('/select-role');
                } else if (groups.includes('customer')) {
                    router.push('/dashboard/customer');
                } else if (groups.includes('counsellor')) {
                    router.push('/dashboard/counsellor');
                } else {
                    router.push('/dashboard');
                }
            }
        }
    }, [auth.isLoading, auth.isAuthenticated, auth.user?.profile]);
};
