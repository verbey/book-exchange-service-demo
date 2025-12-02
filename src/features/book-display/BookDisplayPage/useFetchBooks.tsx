import { useCallback, useEffect } from 'react'
import type { BookCardProps } from '../../../types/BookCardProps'
import useBooksStore from '../../../stores/useBooksStore'

interface UseFetchBooksResult {
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
    const setPaginationMeta = useBooksStore((s) => s.setPaginationMeta)
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
            if (typeof filters?.page === 'number') {
                params.set('_page', String(filters.page))
            }
            if (typeof filters?.limit === 'number') {
                params.set('_limit', String(filters.limit))
            }

            const url = `http://localhost:3000/books${params.toString() ? `?${params.toString()}` : ''}`
            const res = await fetch(url, { signal });
            if (!res.ok) {
                throw new Error(`Failed to fetch books: ${res.status} ${res.statusText}`);
            }

            const json: unknown = await res.json()

            // When pagination is used, json-server (or your adapter) returns an object
            // like: { first, prev, next, last, pages, items, data: [...] }.
            // Otherwise it may just return an array of books.
            let data: BookCardProps[] = []
            if (Array.isArray(json)) {
                data = json as BookCardProps[]
                setPaginationMeta(undefined)
            } else if (json && typeof json === 'object') {
                const obj = json as Record<string, unknown>

                // Extract data array
                if (Array.isArray(obj.data)) {
                    data = obj.data as BookCardProps[]
                } else if (Array.isArray(obj.results)) {
                    data = obj.results as BookCardProps[]
                }

                // Extract pagination metadata when present
                const first = typeof obj.first === 'number' ? obj.first : null
                const prev = typeof obj.prev === 'number' ? obj.prev : null
                const next = typeof obj.next === 'number' ? obj.next : null
                const last = typeof obj.last === 'number' ? obj.last : null
                const pages = typeof obj.pages === 'number' ? obj.pages : null
                const items = typeof obj.items === 'number' ? obj.items : null

                if (
                    first !== null ||
                    prev !== null ||
                    next !== null ||
                    last !== null ||
                    pages !== null ||
                    items !== null
                ) {
                    setPaginationMeta({ first, prev, next, last, pages, items })
                } else {
                    setPaginationMeta(undefined)
                }
            } else {
                setPaginationMeta(undefined)
            }

            setBooks(data)
        } catch (err: unknown) {
            const maybeErr = err as { name?: string }
            if (maybeErr?.name === 'AbortError') return;
            const message = err instanceof Error ? err.message : String(err);
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [setBooks, setLoading, setError, setPaginationMeta, filters])

    useEffect(() => {
        const controller = new AbortController();
        void fetchBooks(controller.signal);
        return () => controller.abort();
    }, [fetchBooks])

    return { books, loading, error }
}

