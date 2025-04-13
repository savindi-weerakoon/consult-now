'use client';

import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
  authority: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_8yPX9gkFI',
  client_id: 'g3pu1re5fb7j7fm0u6geekpav',
  redirect_uri: 'http://localhost:3000',
  post_logout_redirect_uri: 'http://localhost:3000',
  response_type: 'code',
  scope: 'email openid phone',
};

export default function AuthProviderWrapper({ children }) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
