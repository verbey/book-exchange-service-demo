import { useCallback, useMemo } from 'react'
import useBooksStore from '../../../stores/useBooksStore'

export interface UsePaginationResult {
    page: number
    limit: number
    pages: number | null
    hasPrev: boolean
    hasNext: boolean
    nextPage: () => void
    prevPage: () => void
    goToPage: (page: number) => void
}

export default function usePagination(): UsePaginationResult {
    const filters = useBooksStore((s) => s.filters)
    const paginationMeta = useBooksStore((s) => s.paginationMeta)
    const setFilters = useBooksStore((s) => s.setFilters)

    const page = filters.page ?? 1
    const limit = filters.limit ?? 10
    const pages = paginationMeta?.pages ?? null

    const hasPrev = paginationMeta?.prev != null && paginationMeta.prev >= 1
    const hasNext = paginationMeta?.next != null && (pages == null || paginationMeta.next <= pages)

    const updatePage = useCallback(
        (newPage: number) => {
            if (newPage < 1) return
            setFilters({ ...filters, page: newPage })
        },
        [filters, setFilters]
    )

    const nextPage = useCallback(() => {
        updatePage(page + 1)
    }, [page, updatePage])

    const prevPage = useCallback(() => {
        updatePage(page - 1)
    }, [page, updatePage])

    const goToPage = useCallback(
        (newPage: number) => {
            updatePage(newPage)
        },
        [updatePage]
    )

    return useMemo(
        () => ({ page, limit, pages, hasPrev, hasNext, nextPage, prevPage, goToPage }),
        [page, limit, pages, hasPrev, hasNext, nextPage, prevPage, goToPage]
    )
}
