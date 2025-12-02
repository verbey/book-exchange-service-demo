"use client"

import { useMemo } from "react"
import { useLocation } from "react-router"

type AuthMode = "login" | "register"

export function useAuthPage() {
    const location = useLocation()

    const { mode } = useMemo(() => {
        const pathname = location?.pathname || ""

        let mode: AuthMode = "register"
        if (pathname.includes("/login")) mode = "login"
        else if (pathname.includes("/register")) mode = "register"
        return { mode }
    }, [location])

    const opposite = useMemo(() => {
        if (mode === "register") return { to: "/login", text: "Go to login page" }
        return { to: "/register", text: "Create an account" }
    }, [mode])

    return {
        mode,
        opposite,
    }
}

export default useAuthPage
