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

    const fetchBooks = useCallback(async (signal?: AbortSignal) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:3000/books', { signal });
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
    }, [setBooks, setLoading, setError])

    useEffect(() => {
        const controller = new AbortController();
        void fetchBooks(controller.signal);
        return () => controller.abort();
    }, [fetchBooks])

    return { books, loading, error }
}

