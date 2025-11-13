import { Book } from "@/components/Book.jsx";
import { AddBook } from "@/components/AddBook.jsx";

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
  const idAddBookDialog = "addBookDialog";

  const openAddBook = () => {
    document.getElementById(idAddBookDialog).showModal();
  };

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <section className="bg-card text-card-foreground flex flex-col rounded-xl border border-border py-6 shadow-sm">
        <div className="px-6 pt-6 flex flex-col md:flex-row gap-4">
          <input
            className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pl-10"
            type="text"
            placeholder="Buscar un libro por su nombre"
          />
          <select
            name="order"
            id="order-select"
            placeholder="Ordenar por"
            className="appearance-none px-2 py-1 bg-transparent border  rounded-md h-9 border-input dark:bg-input/30 text-base shadow-xs focus:outline-none focus:border-ring focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-ring/50  transition-[color,box-shadow] focus:ring-[3px]"
          >
            <option value="title-asc">Título (A-Z)</option>
            <option value="title-desc">Título (Z-A)</option>
            <option value="author-asc">Autor (A-Z)</option>
            <option value="author-asc">Autor (Z-A)</option>
          </select>
          <select
            name="limit"
            id="limit-select"
            placeholder="Mostrar"
            className="appearance-none px-2 py-1 bg-transparent border  rounded-md h-9 border-input dark:bg-input/30 text-base shadow-xs focus:outline-none focus:border-ring focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-ring/50  transition-[color,box-shadow] focus:ring-[3px]"
          >
            <option selected value="10">
              Ver 10
            </option>
            <option value="25">Ver 25</option>
          </select>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 gap-2"
            onClick={openAddBook}
          >
            AGREGAR LIBRO
          </button>
        </div>
      </section>

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

      <AddBook idDialog={idAddBookDialog} />
    </div>
  );
};
export default BookList;
