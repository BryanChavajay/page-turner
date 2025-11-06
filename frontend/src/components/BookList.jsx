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

const handledStatus = (status) => {
  const statusBagde = {
    to_read: "Por leer",
    reading: "Leyendo",
    read: "Leído",
  };

  return statusBagde[status] || "Desconocido";
};

const handledStatusBadge = (status) => {
  const statusBagde = {
    to_read: "bg-red-100",
    reading: "bg-blue-100",
    read: "bg-green-100",
  };

  return statusBagde[status] || "bg-gray-200";
};

export const BookList = () => {
  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <h2>Filtros</h2>

      {/* Books Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => {
          return (
            <section
              key={book.id_book}
              className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-sm group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <article className="h-48 bg-orange-100 flex items-center justify-center relative">
                <p className="h-16 w-16 text-primary/30">📖</p>
                <span
                  className={`inline-flex items-center justify-center rounded-md border border-border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap absolute top-3 right-3 ${handledStatusBadge(
                    book.status
                  )}`}
                >
                  {handledStatus(book.status)}
                </span>
              </article>

              <article className="pt-4 px-6">
                <h3 className="font-bold text-lg mb-1 line-clamp-2 text-balance">
                  {book.title}
                </h3>

                <p className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="h-3 w-3">👨‍💼</span>
                  <span className="line-clamp-1">{book.author}</span>
                </p>
              </article>
            </section>
          );
        })}
      </section>
    </div>
  );
};
export default BookList;
