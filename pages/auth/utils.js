import { signIn } from "next-auth/react";

export async function handleLogin(user, password) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let callbackUrl = urlParams.get('callbackUrl');
    let redirect = true;

    if(!callbackUrl) {
        callbackUrl = "";
        redirect = false;
    }

    return await signIn('credentials', {
        callbackUrl: callbackUrl,
        redirect: redirect,
        email: user,
        password: password,
    });
}