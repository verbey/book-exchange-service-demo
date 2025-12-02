"use client"

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRegisterForm } from "./useRegisterForm"
import { Controller } from "react-hook-form"

function RegisterForm() {
    const { form, isSubmitting, onSubmit } = useRegisterForm()

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FieldLegend>Register</FieldLegend>
                <FieldDescription>Create an account to use the service</FieldDescription>

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
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>User name</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                type="text"
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

                <Controller
                    name="confirmPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </FieldGroup>
        </form>
    )
}

export default RegisterForm
