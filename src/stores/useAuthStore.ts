import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
    name: string | null
    jwt: string | null
    setName: (name: string | null) => void
    setJwt: (jwt: string | null) => void
    clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            name: null,
            jwt: null,
            setName: (name) => set({ name }),
            setJwt: (jwt) => set({ jwt }),
            clearAuth: () => set({ name: null, jwt: null }),
        }),
        {
            name: 'book-exchange-auth',
        }
    )
)

export default useAuthStore
