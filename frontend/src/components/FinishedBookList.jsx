import { FinishedBook } from "@/components/FinishedBook.jsx";

const books = [
  {
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    genre: "Fantasía",
    id_book: 1,
    status: "read",
    reading_start: "2025-11-04T21:20:05.176Z",
    reading_end: "2025-11-04T21:20:05.176Z",
    rating: 0,
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    genre: "Realismo mágico",
    id_book: 2,
    status: "read",
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

export const FinishedBookList = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => {
        return (
          <FinishedBook
            key={book.id_book}
            id={book.id_book}
            title={book.title}
            author={book.author}
            finishedDate={book.reading_end}
          />
        );
      })}
    </section>
  );
};
