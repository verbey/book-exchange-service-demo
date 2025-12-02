"use client"

import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router"
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
