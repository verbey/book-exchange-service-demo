"use client"

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.email({ message: "Invalid email address" }).trim(),
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export function useRegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        "defaultValues": {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        }
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
        setIsSubmitting(true)
        try {
            // Remove confirmPassword before sending to the server
            // confirmPassword is only used for client-side validation
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...payload } = data

            const res = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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

            const created = await res.json()
            console.log('User created:', created)

            form.reset()
            navigate('/', { replace: true })
        } catch (error) {
            console.error("Submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        form,
        isSubmitting,
        onSubmit
    }
}
