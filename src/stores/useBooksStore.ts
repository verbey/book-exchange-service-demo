import { create } from 'zustand'
import type { BookCardProps } from '../features/book-display/types/BookCardProps'

interface BooksState {
    books: BookCardProps[]
    loading: boolean
    error: string | null
    filters: {
        q?: string
        sortBy?: string | null
    }
    setBooks: (books: BookCardProps[]) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    setFilters: (filters: { q?: string; sortBy?: string | null }) => void
    clear: () => void
}

export const useBooksStore = create<BooksState>()((set) => ({
    books: [],
    loading: false,
    error: null,
    filters: { q: undefined, sortBy: null },
    setBooks: (books) => set({ books }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setFilters: (filters) => set({ filters }),
    clear: () => set({ books: [], loading: false, error: null }),
}))

export default useBooksStore
