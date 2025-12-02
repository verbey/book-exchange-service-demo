import { BookFilters } from "../BookFilters/BookFilters"
import { BookGrid } from "../BookGrid"
import ResultsPagination from "../ResultsPagination/ResultsPagination";
import useFetchBooks from "./useFetchBooks";

function BookDisplayPage() {
    const { books, loading, error } = useFetchBooks();

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold">Explore books</h1>
                <p className="text-sm text-muted-foreground">Search, sort and browse books available to exchange.</p>
            </header>

            <BookFilters />

            <section className="mt-8">
                <h2 className="text-xl font-medium mb-4">Books</h2>
                <p className="text-sm text-muted-foreground mb-4">Search results and filtered books will appear here.</p>
                {loading && <p>Loading books...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {books && <BookGrid books={books} />}
                <div className="mt-4 flex justify-center">
                    <ResultsPagination />
                </div>
            </section>
        </div>
    )
}

export default BookDisplayPage