// app/lib/amplify-auth.js
import { Amplify } from 'aws-amplify';
import {
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  signInWithRedirect,
  signUp,
} from '@aws-amplify/auth';

Amplify.configure({
  Auth: {
    region: 'eu-north-1',
    userPoolId: 'eu-north-1_8yPX9gkFI',
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN?.replace(/^https?:\/\//, ''),
    redirectSignIn: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URL,
    redirectSignOut: process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI,
    responseType: 'code',
  }
});

// Export individual functions
export {
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  signInWithRedirect,
  signUp,
};
