import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BookCardProps } from '../types/BookCardProps'

interface BooksState {
    books: BookCardProps[]
    loading: boolean
    error: string | null
    paginationMeta?: {
        first: number | null
        prev: number | null
        next: number | null
        last: number | null
        pages: number | null
        items: number | null
    }
    filters: {
        q?: string
        sortBy?: string | null
        page?: number
        limit?: number
    }
    setBooks: (books: BookCardProps[]) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    setPaginationMeta: (meta: BooksState['paginationMeta']) => void
    setFilters: (filters: { q?: string; sortBy?: string | null; page?: number; limit?: number }) => void
    clear: () => void
}

export const useBooksStore = create<BooksState>()(
    persist(
        (set) => ({
            books: [],
            loading: false,
            error: null,
            paginationMeta: undefined,
            filters: { q: undefined, sortBy: null, page: 1, limit: 10 },
            setBooks: (books) => set({ books }),
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),
            setPaginationMeta: (paginationMeta) => set({ paginationMeta }),
            setFilters: (filters) => set({ filters }),
            clear: () => set({ books: [], loading: false, error: null, paginationMeta: undefined }),
        }),
        {
            name: 'books-storage', // localStorage key
            // persist only the `books` slice of the state
            partialize: (state) => ({ books: state.books }),
        }
    )
)

export default useBooksStore
