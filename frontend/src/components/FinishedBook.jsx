import { BookOpen } from "@/assets/BookOpen.jsx";

export const FinishedBook = ({ title, finishedDate, author }) => {
  return (
    <article className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-sm group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex gap-4 p-4">
        <span className="w-24 h-32 bg-orange-100 rounded-md flex items-center justify-center">
          <BookOpen className="h-8 w-8 text-primary/30" />
        </span>

        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap gap-1 overflow-hidden border-green-200 bg-green-100 mb-2">Terminado</span>
          <h3>{title}</h3>
          <p>{author}</p>
          <p>{finishedDate}</p>
        </div>
      </div>
    </article>
  );
};
