import UserBookGrid from "./UserBookGrid";
import useFetchUserBooks from "./useFetchUserBooks";

function UserBooksPage() {
    const { userBooks, loading, error } = useFetchUserBooks();

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold">Manage your books</h1>
            </header>

            <h2 className="text-xl font-medium mb-4">Books</h2>
            {loading && <p>Loading books...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {userBooks && <UserBookGrid books={userBooks} />}
        </div>
    )
}

export default UserBooksPage;