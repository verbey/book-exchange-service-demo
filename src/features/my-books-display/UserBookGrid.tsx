import BookCard from "../../components/BookCard"
import type { BookCardProps } from "../../types/BookCardProps";
import useDeleteBook from "./useDeleteBook";
import { Button } from "../../components/ui/button";

interface BookGridProps {
    books: BookCardProps[]
}

function UserBookGrid(props: BookGridProps) {
    const { deleteBook } = useDeleteBook();
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr items-start">
            {props.books.map((book, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <BookCard id={book.id} name={book.name} author={book.author} published={book.published} pages={book.pages} imageUrl={book.imageUrl} />
                    <Button type="button" onClick={() => { deleteBook(book.id) }}>Delete Book</Button>
                </div>
            ))}
        </div>
    )
}

export default UserBookGrid;