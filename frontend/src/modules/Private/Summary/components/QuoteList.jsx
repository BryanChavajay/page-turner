import { QuoteCard } from "@private/Summary/components/QuoteCard.jsx";
import {AddQuote} from '@/components/AddQuote.jsx'

export const QuoteList = () => {
  const idQuoteDialog = "addQuoteDialog";

  const openModal = () => {
    document.getElementById(idQuoteDialog).showModal();
  };

  return (
    <section className="bg-card h-[800px] p-4 rounded-xl border border-border shadow-sm overflow-y-auto flex flex-col">
      <div className="w-full flex justify-between mb-6">
        <p className="text-lg font-bold">Citas favoritas</p>
        <button className="p-2 rounded-xl border border-border shadow bg-secondary" onClick={openModal}>
          Añadir cita
        </button>
      </div>

      <div className="flex flex-col gap-y-4">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id_quote} content={quote.quote_text} page={quote.page_number} />
        ))}
      </div>

      <AddQuote idDialog={idQuoteDialog} />
    </section>
  );
};

export default QuoteList;

const quotes = [
  {
    id_book: 1,
    quote_text:
      "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.",
    id_quote: 1,
    page_number: 1,
  },
  {
    id_book: 1,
    quote_text:
      "Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.",
    id_quote: 2,
    page_number: 1,
  },
];
