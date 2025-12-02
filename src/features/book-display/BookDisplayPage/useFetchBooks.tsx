import { useCallback, useEffect } from 'react'
import type { BookCardProps } from '../types/BookCardProps'
import useBooksStore from '../../../stores/useBooksStore'

type UseFetchBooksResult = {
    books: BookCardProps[]
    loading: boolean
    error: string | null
}

export default function useFetchBooks(): UseFetchBooksResult {
    const books = useBooksStore((s) => s.books)
    const loading = useBooksStore((s) => s.loading)
    const error = useBooksStore((s) => s.error)
    const setBooks = useBooksStore((s) => s.setBooks)
    const setLoading = useBooksStore((s) => s.setLoading)
    const setError = useBooksStore((s) => s.setError)
    const filters = useBooksStore((s) => s.filters)

    const fetchBooks = useCallback(async (signal?: AbortSignal) => {
        setLoading(true);
        setError(null);

        try {
            // NOTE: For whatever reason, the parameter does not actually filter anything on json-server side
            // although it should as mentioned in the docs 
            // https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#full-text-search
            // you can verify in the dev tools that my code does send the required params and the server
            // responds as expected when it comes to sort params
            const params = new URLSearchParams()
            if (filters?.q) {
                params.set('q', filters.q)
            }
            if (filters?.sortBy) {
                params.set('_sort', filters.sortBy)
                params.set('_order', 'asc')
            }

            const url = `http://localhost:3000/books${params.toString() ? `?${params.toString()}` : ''}`
            const res = await fetch(url, { signal });
            if (!res.ok) {
                throw new Error(`Failed to fetch books: ${res.status} ${res.statusText}`);
            }

            const data = (await res.json()) as BookCardProps[];

            setBooks(data);
        } catch (err: unknown) {
            const maybeErr = err as { name?: string }
            if (maybeErr?.name === 'AbortError') return;
            const message = err instanceof Error ? err.message : String(err);
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [setBooks, setLoading, setError, filters])

    useEffect(() => {
        const controller = new AbortController();
        void fetchBooks(controller.signal);
        return () => controller.abort();
    }, [fetchBooks])

    return { books, loading, error }
}

