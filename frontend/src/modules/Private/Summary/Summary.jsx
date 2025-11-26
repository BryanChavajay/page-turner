import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import { PRIVATE_ROUTES } from "@/utils/routes.jsx";

import { MarkdownEditor } from "@private/Summary/components/MarkdownEditor.jsx";
import { QuoteList } from "@private/Summary/components/QuoteList.jsx";
import { BookCard } from "@private/Summary/components/BookCard.jsx";

export const Summary = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("summary");

  const handleTabClick = () => {
    tab == "summary" ? setTab("quote") : setTab("summary");
  };

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
          {/* Book Info Card */}
          <div className="lg:col-span-1">
            <BookCard />
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

            {tab == "summary" ? <MarkdownEditor /> : <QuoteList />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Summary;
