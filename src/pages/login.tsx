import { signInWithGoogle } from "@/lib/auth";


export default function LoginPage() {
    return ( 
        <div>
            <h1>Login</h1>
            <button onClick={signInWithGoogle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in with Google</button>
        </div>
    )
}