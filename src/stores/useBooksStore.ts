import { create } from 'zustand'
import type { BookCardProps } from '../features/book-display/types/BookCardProps'

type BooksState = {
    books: BookCardProps[]
    loading: boolean
    error: string | null
    setBooks: (books: BookCardProps[]) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    clear: () => void
}

export const useBooksStore = create<BooksState>()((set) => ({
    books: [],
    loading: false,
    error: null,
    setBooks: (books) => set({ books }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    clear: () => set({ books: [], loading: false, error: null }),
}))

export default useBooksStore
