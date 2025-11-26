import { Quote } from "@/assets/Quote.jsx";

export const QuoteCard = ({ content, page }) => {
  return (
    <article className="w-full bg-card rounded-xl border border-border shadow p-6 flex flex-row items-center justify-center gap-x-6">
      <div>
        <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Quote className="lucide lucide-quote" />
        </span>
      </div>
      <div>
        <p className="text-lg italic mb-4">"{content}"</p>
        <p className="text-sm">Página {page}</p>
      </div>
    </article>
  );
};
