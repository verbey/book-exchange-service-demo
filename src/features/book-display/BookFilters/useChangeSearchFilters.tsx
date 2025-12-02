import { useCallback, useEffect, useState } from 'react'
import useBooksStore from '../../../stores/useBooksStore'

type Filters = { q: string; sortBy?: string | null }

function useChangeSearchFilters() {
    const storeFilters = useBooksStore((s) => s.filters)
    const setFilters = useBooksStore((s) => s.setFilters)

    const [search, setSearch] = useState<string>(storeFilters.q ?? '')
    const [sortBy, setSortBy] = useState<string | null>(storeFilters.sortBy ?? null)

    const applyFilters = useCallback((next: Filters) => {
        setFilters(next)
    }, [setFilters])

    const onSearchChange = useCallback((value: string) => {
        setSearch(value)
    }, [])

    useEffect(() => {
        const id = window.setTimeout(() => {
            applyFilters({ q: search, sortBy })
        }, 300)
        return () => {
            window.clearTimeout(id)
        }
    }, [search, sortBy, applyFilters])

    const onSortChange = useCallback((value: string | null) => {
        setSortBy(value)
        applyFilters({ q: search, sortBy: value })
    }, [applyFilters, search])

    return {
        searchValue: search,
        sortValue: sortBy ?? undefined,
        onSearchChange,
        onSortChange,
    }
}

export default useChangeSearchFilters;