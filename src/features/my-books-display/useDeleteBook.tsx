function useDeleteBook() {
    async function deleteBook(bookId: string | undefined) {
        if (!bookId) return;
        try {
            const url = `http://localhost:3000/mybooks/${bookId}`;
            const res = await fetch(url, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error(`Failed to delete book: ${res.status} ${res.statusText}`);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(message);
        }
    }
    return { deleteBook };
}

export default useDeleteBook;