import { User } from "@/assets/User.jsx";
import { BookOpen } from "@/assets/BookOpen.jsx";
import { useNavigate } from 'react-router-dom'

import {PRIVATE_ROUTES} from '@/utils/routes.jsx'

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


export const Book = ({ idBook, status, title, author }) => {
  const navigate = useNavigate();
  
  const handledBookClick = (idBook) => {
    navigate(`/${PRIVATE_ROUTES.PRIVATE}/${PRIVATE_ROUTES.BOOK}/${idBook}`);
  }

  return (
    <section
      className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-sm group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"

      onClick={() => handledBookClick(idBook)}
    >
      <article className="h-48 bg-orange-100 flex items-center justify-center relative">
        <BookOpen className="w-16 h-16 text-primary/30" />
        <span
          className={`inline-flex items-center justify-center rounded-md border border-border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap absolute top-3 right-3 ${handledColorStatus(
            status
          )}`}
        >
          {handledStatus(status)}
        </span>
      </article>

      <article className="pt-4 px-6">
        <h3 className="font-bold text-lg mb-1 line-clamp-2 text-balance">
          {title}
        </h3>

        <p className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <User className="h-3 w-3" />
          <span className="line-clamp-1">{author}</span>
        </p>
      </article>
    </section>
  );
};

export default Book;
