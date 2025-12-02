import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import usePagination from './usePagination'

function ResultsPagination() {
    const { page, pages, hasPrev, hasNext, nextPage, prevPage, goToPage } = usePagination()

    // NOTE: the default totalPages count is  2 to make up for the fact that json-server does not
    // return data about pagination and thus we need to make at least 1 request before we know
    // how many pages are there actually

    const current = page
    const totalPages = pages ?? 2
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        aria-disabled={!hasPrev}
                        onClick={(e) => {
                            e.preventDefault()
                            if (hasPrev) prevPage()
                        }}
                    />
                </PaginationItem>
                {pageNumbers.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            href="#"
                            isActive={p === current}
                            onClick={(e) => {
                                e.preventDefault()
                                goToPage(p)
                            }}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        aria-disabled={!hasNext}
                        onClick={(e) => {
                            e.preventDefault()
                            if (hasNext) nextPage()
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default ResultsPagination