import 'styles/globals.css'
import { SessionProvider } from "next-auth/react";
import AuthGuard from 'components/auth/authGuard';

function MyApp({
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  return (
    <SessionProvider session={session}>
      {Component.requireAuth ? (
        <AuthGuard pageProps={pageProps} verifyAuth={Component.verifyAuth}>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp
