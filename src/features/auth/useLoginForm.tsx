"use client"

import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router"
import useAuthStore from "../../stores/useAuthStore"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    email: z.email({ message: "Invalid email address" }).trim(),
    password: z.string().min(1, { message: "Password is required" }),
})

export function useLoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
        setIsSubmitting(true)
        try {
            // NOTE: I am using json-server to mock server logic and this tool cannot return jwt upon POST request
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                let message = `Server returned ${res.status}`
                try {
                    const body = await res.json()
                    if (body && body.message) message = body.message
                } catch {
                    // ignore
                }
                throw new Error(message)
            }

            const body = await res.json()
            console.log("Login success:", body)

            // json-server used in this demo does not return a JWT or username.
            // Save mock credentials into the Zustand store so the app can behave
            // as if the server returned them.
            const setName = useAuthStore.getState().setName
            const setJwt = useAuthStore.getState().setJwt
            const mockName = body?.name ?? data.email.split("@")[0]
            const mockJwt = body?.token ?? `mock-jwt-${Math.random().toString(36).slice(2)}`
            setName(mockName)
            setJwt(mockJwt)
            console.log("Saved mock auth to store", { mockName, mockJwt })

            form.reset()
            navigate("/", { replace: true })
        } catch (error) {
            console.error("Login error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return { form, isSubmitting, onSubmit }
}
