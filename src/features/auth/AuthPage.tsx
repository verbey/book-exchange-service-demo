"use client"

import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"
import useAuthPage from "./useAuthPage"
import { Link } from "react-router"

function AuthPage() {
    const { mode, opposite } = useAuthPage()

    return (
        <div>
            {mode === "login" ? <LoginForm /> : <RegisterForm />}

            <div className="mt-4">
                <Link to={opposite.to} className="underline text-blue-600 hover:text-blue-700">
                    {opposite.text}
                </Link>
            </div>

            <div className="mt-2">
                <Link to="/" className="underline text-blue-600 hover:text-blue-700">Go to main page</Link>
            </div>
        </div>
    )
}

export default AuthPage