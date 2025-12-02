import { useCallback, useEffect, useState } from 'react'
import type { BookCardProps } from '../../types/BookCardProps'
import useBooksStore from '../../stores/useBooksStore'

interface UserUseFetchBooksResult {
    userBooks: BookCardProps[] | null
    loading: boolean
    error: string | null
}

function useFetchUserBooks(): UserUseFetchBooksResult {
    const [userBooks, setUserBooks] = useState<BookCardProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchBooks = useCallback(async (signal?: AbortSignal) => {
        try {
            setLoading(true);
            setError(null);
            const url = 'http://localhost:3000/mybooks'
            const res = await fetch(url, { signal })
            if (!res.ok) {
                throw new Error(`Failed to fetch user book ids: ${res.status} ${res.statusText}`)
            }

            const data = await res.json()

            const bookIds: string[] = data[0].bookIds;
            console.log(bookIds);

            const allBooks = useBooksStore.getState().books
            console.log(allBooks);
            const found: BookCardProps[] = allBooks.filter((b) => bookIds.includes(String(b.id)))

            setUserBooks(found)
            if (bookIds.length > 0 && found.length === 0) {
                setError('No matching books found in local store for provided ids')
            }
        } catch (err: unknown) {
            const maybeErr = err as { name?: string }
            if (maybeErr?.name === 'AbortError') return;
            const message = err instanceof Error ? err.message : String(err);
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [setUserBooks, setLoading, setError])

    useEffect(() => {
        const controller = new AbortController();
        void fetchBooks(controller.signal);
        return () => controller.abort();
    }, [fetchBooks])

    return { userBooks, loading, error }
}

export default useFetchUserBooks;