"use client"

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLoginForm } from "./useLoginForm"
import { Controller } from "react-hook-form"

function LoginForm() {
    const { form, isSubmitting, onSubmit } = useLoginForm()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldLegend>Login</FieldLegend>
                <FieldDescription>Sign in to your account</FieldDescription>

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="email"
                                aria-invalid={fieldState.invalid}
                                required
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="password"
                                aria-invalid={fieldState.invalid}
                                required
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
            </FieldGroup>
        </form>
    )
}

export default LoginForm

