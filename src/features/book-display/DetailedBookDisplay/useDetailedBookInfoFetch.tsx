import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { BookCardProps } from '../../../types/BookCardProps'
import useBooksStore from '../../../stores/useBooksStore'

interface UseDetailedBookResult {
    bookCardProps: BookCardProps | undefined
    bookDescription: string | null
    bookRating: number | null
    loading: boolean
    error: string | null
}

export default function useDetailedBookFetch(): UseDetailedBookResult {
    const { id } = useParams() as { id?: string }

    const setLoading = useBooksStore((s) => s.setLoading)
    const setError = useBooksStore((s) => s.setError)
    const loading = useBooksStore((s) => s.loading)
    const error = useBooksStore((s) => s.error)

    const [bookCardProps, setBookCardProps] = useState<BookCardProps | undefined>()
    const [bookDescription, setBookDescription] = useState<string | null>(null)
    const [bookRating, setBookRating] = useState<number | null>(null)

    const fetchBook = useCallback(async (signal?: AbortSignal) => {
        setLoading(true)
        setError(null)

        try {
            const url = `http://localhost:3000/books/${id}`
            const res = await fetch(url, { signal })
            if (!res.ok) {
                throw new Error(`Failed to fetch book: ${res.status} ${res.statusText}`)
            }

            const json: unknown = await res.json()

            if (json && typeof json === 'object') {
                const obj = json as Record<string, unknown>
                const name = typeof obj.name === 'string' ? obj.name : ''
                const pages = typeof obj.pages === 'number' ? obj.pages : (typeof obj.pages === 'string' ? Number(obj.pages) || 0 : 0)
                const author = typeof obj.author === 'string' ? obj.author : ''
                const published = typeof obj.published === 'string' ? obj.published : ''
                const imageUrl = typeof obj.imageUrl === 'string' ? obj.imageUrl : ''

                setBookCardProps({ name, pages, author, published, imageUrl })

                setBookDescription(typeof obj.description === 'string' ? obj.description : null)
                setBookRating(typeof obj.rating === 'number' ? obj.rating : null)
            } else {
                setBookCardProps(undefined)
                setBookDescription(null)
                setBookRating(null)
            }
        } catch (err: unknown) {
            const maybeErr = err as { name?: string }
            if (maybeErr?.name === 'AbortError') return
            const message = err instanceof Error ? err.message : String(err)
            setError(message)
        } finally {
            setLoading(false)
        }
    }, [id, setLoading, setError])

    useEffect(() => {
        const controller = new AbortController()
        void fetchBook(controller.signal)
        return () => controller.abort()
    }, [fetchBook])

    return { bookCardProps, bookDescription, bookRating, loading, error }
}
