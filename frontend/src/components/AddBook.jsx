export const AddBook = ({ idDialog }) => {
  const closeModal = () => {
    document.getElementById(idDialog).close();
  };
  return (
    <dialog
      id={idDialog}
      className="bg-background fixed top-[20%] left-[20%] lg:top-[20%] lg:left-[30%] gap-4 rounded-lg border border-border p-6 shadow-lg sm:w-[600px] lg:w-[800px]"
    >
      <article>
        <h2 className="text-lg leading-none font-semibold">Añadir Nuevo Libro</h2>
        <p className="text-muted-foreground text-sm">
          Completa la información del libro que deseas registrar
        </p>
      </article>
      <form action="" method="dialog" className="space-y-4 mt-4">
        <div className="space-y-2">
          <label
            htmlFor="quote"
            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          >
            Titulo *
          </label>
          <input
            type="text"
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30  w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
          ></input>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="quote"
            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          >
            Author *
          </label>
          <input
            type="text"
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30  w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
          ></input>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="quote"
            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          >
            Genero *
          </label>
          <input
            type="text"
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30  w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
          ></input>
        </div>
        <select
          name="order"
          id="order-select"
          placeholder="Ordenar por"
          className="appearance-none px-2 py-1 bg-transparent border  rounded-md h-9 border-input dark:bg-input/30 text-base shadow-xs focus:outline-none focus:border-ring focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-ring/50  transition-[color,box-shadow] focus:ring-[3px]"
        >
          <option value="to_read">Por leer</option>
          <option value="reading">Leyendo</option>
          <option value="read">Leido</option>
        </select>
        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            value="cancel"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 flex-1"
            type="button"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 flex-1"
            type="submit"
          >
            Añadir libro
          </button>
        </div>
      </form>
    </dialog>
  );
};
