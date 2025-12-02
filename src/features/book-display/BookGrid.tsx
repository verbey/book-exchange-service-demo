import BookCard from "./BookCard"
import type { BookCardProps } from "./types/BookCardProps";

interface BookGridProps {
    books: BookCardProps[]
}

export function BookGrid(props: BookGridProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr items-start">
            {props.books.map((book, index) => (
                <BookCard key={index} id={book.id} name={book.name} author={book.author} published={book.published} pages={book.pages} imageUrl={book.imageUrl} />
            ))}
        </div>
    )
}
