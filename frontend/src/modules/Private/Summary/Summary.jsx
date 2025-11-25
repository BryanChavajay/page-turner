import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { BookOpen } from "@/assets/BookOpen.jsx";
import { User } from "@/assets/User.jsx";
import { PRIVATE_ROUTES } from "@/utils/routes.jsx";

const handledStatus = (status) => {
  const statusBagde = {
    to_read: "Por leer",
    reading: "Leyendo",
    read: "Leído",
  };

  return statusBagde[status] || "Desconocido";
};

const handledColorStatus = (status) => {
  const statusBagde = {
    to_read: "bg-red-100",
    reading: "bg-blue-100",
    read: "bg-green-100",
  };

  return statusBagde[status] || "bg-gray-200";
};

export const Summary = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("summary");
  const [content, setContent] = useState("# Mi primer titulo");
  const [isEdit, setIsEdit] = useState(false);
  const prevContent = content;

  const handleTabClick = () => {
    tab == "summary" ? setTab("quote") : setTab("summary");
  };

  const handleCancelEdit = () => {
    setContent(prevContent);
    setIsEdit(false);
  }

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
                    <h1 className="text-2xl font-bold text-balance">
                      {book.title}
                    </h1>
                    <p className="mb-2 text-xs">{book.genre}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" />
                      <span className="text-muted-foreground">
                        {book.author}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center justify-center rounded-md border border-border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap ${handledColorStatus(
                        book.status
                      )}`}
                    >
                      {handledStatus(book.status)}
                    </span>
                    {book.reading_end && (
                      <p className="mt-2 text-sm text-muted-foreground font-semibold">
                        Leído el: {book.reading_end.slice(0, 10)}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </section>
          </div>

          <div className="lg:col-span-2">
            <section className="w-full grid grid-cols-2 bg-secondary px-1 py-2 rounded-xl border border-border shadow-sm mb-6">
              <button
                className={`rounded-md py-1 font-medium  cursor-pointer ${
                  tab == "summary" ? "bg-background shadow" : ""
                }`}
                onClick={() => handleTabClick()}
              >
                Resumen
              </button>
              <button
                className={`rounded-md py-1 font-medium  cursor-pointer ${
                  tab == "quote" ? "bg-background shadow" : ""
                }`}
                onClick={() => handleTabClick()}
              >
                Citas
              </button>
            </section>

            {tab == "summary" ? (
              <section className="bg-secondary h-[800px] p-4 rounded-xl border border-border shadow-sm overflow-y-auto">
                <div className="flex flex-row-reverse gap-2 mb-6">
                  {isEdit ? (
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-2">
                      Guardar
                    </button>
                  ) : (
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-2"
                      onClick={() => setIsEdit(true)}
                    >
                      Editar
                    </button>
                  )}
                  {isEdit && (
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 gap-2"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
                {isEdit ? (
                  <MDEditor
                    value={content}
                    onChange={setContent}
                    height={700}
                    style={{ backgroundColor: "var(--card)" }}
                    data-color-mode="light"
                    preview="edit"
                  />
                ) : (
                  <MDEditor.Markdown
                    source={content}
                    style={{
                      backgroundColor: "var(--color-background)",
                      color: "var(--color-secondary-foreground)",
                    }}
                    className="rounded-xl p-2 min-h-[700px]"
                  />
                )}
              </section>
            ) : (
              <p>Quote</p>
            )}
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
