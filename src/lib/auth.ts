import {supabase} from "./supabase";

// sign in with google
export async function signInWithGoogle() {
    const {data , error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
    });
    if ( error) throw error;
    console.log("User Data:", data );
    window.location.href = '/';
}