import { useParams, Link } from "react-router-dom";

import { BookOpen } from "@/assets/BookOpen.jsx";
import { PRIVATE_ROUTES } from "@/utils/routes.jsx";

export const Summary = () => {
  const { id } = useParams();

  return (
    <div className="relative z-10 min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to={`/${PRIVATE_ROUTES.PRIVATE}`}>Volver a la biblioteca</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Info Sider */}
          <div className="lg:col-span-1">
            <section className="bg-card text-card-foreground flex flex-col  gap-6 px-6 rounded-xl border border-border py-6 shadow-sm sticky top-24">
              <article className="pt-6">
                <span className="h-64 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="h-24 w-24 text-primary/30" />
                </span>

                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-2 text-balance">
                      {book.title}
                    </h1>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Summary;

const book = {
  title: "El principito",
  author: "Antoine de Saint-Exupéry",
  genre: "Fantasía",
  id_book: 1,
  status: "to_read",
  reading_start: "2025-11-04T21:20:05.176Z",
  reading_end: "2025-11-04T21:20:05.176Z",
  rating: 0,
  description: {
    id_book: 0,
    markdown_content: "string",
    id_book_description: 0,
  },
};
