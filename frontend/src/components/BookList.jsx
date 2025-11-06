import { Book } from "@/components/Book.jsx";

const books = [
  {
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    genre: "Fantasía",
    id_book: 1,
    status: "to_read",
    reading_start: "2025-11-04T21:20:05.176Z",
    reading_end: "2025-11-04T21:20:05.176Z",
    rating: 0,
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    genre: "Realismo mágico",
    id_book: 2,
    status: "reading",
    reading_start: "2025-11-04T21:20:05.176Z",
    reading_end: "2025-11-04T21:20:05.176Z",
    rating: 0,
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Distopía",
    id_book: 3,
    status: "read",
    reading_start: "2025-11-04T21:20:05.176Z",
    reading_end: "2025-11-04T21:20:05.176Z",
    rating: 5,
  },
];

export const BookList = () => {
  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <h2>Filtros</h2>

      {/* Books Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => {
          return (
            <Book
              id_book={book.id_book}
              status={book.status}
              title={book.title}
              author={book.author}
            />
          );
        })}
      </section>
    </div>
  );
};
export default BookList;
