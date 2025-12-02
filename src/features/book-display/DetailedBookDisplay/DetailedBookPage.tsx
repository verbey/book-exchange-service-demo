import BookCard from "../BookCard";
import useDetailedBookFetch from "./useDetailedBookInfoFetch";

function DetailedBookPage() {
    const { bookCardProps, bookDescription, bookRating } = useDetailedBookFetch();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <aside className="md:col-span-1">
                    {bookCardProps && (
                        <div className="sticky top-20">
                            <BookCard {...bookCardProps} />
                        </div>
                    )}
                </aside>

                <main className="md:col-span-2">
                    <h2 className="text-2xl font-semibold mb-3">About this book</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{bookDescription}</p>

                    <h3 className="text-lg font-medium mb-2">Rating</h3>
                    <div className="flex items-baseline space-x-3">
                        <span className="text-3xl font-bold">{bookRating ?? '—'}</span>
                        <span className="text-gray-500">/ 5</span>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DetailedBookPage;