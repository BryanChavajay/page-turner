export const AddQuote = ({idDialog}) => {
  const closeModal = () => {
    document.getElementById(idDialog).close();
  };

  return (
    <dialog
      id={idDialog}
      className="bg-background fixed top-[20%] left-[20%] lg:top-[30%] lg:left-[30%] gap-4 rounded-lg border border-border p-6 shadow-lg sm:w-[600px] lg:w-[800px]"
    >
      <article>
        <h2 class="text-lg leading-none font-semibold">Añadir Cita</h2>
        <p class="text-muted-foreground text-sm">
          Guarda una cita memorable de tus lecturas
        </p>
      </article>
      <form action="" method="dialog" className="space-y-4 mt-4">
        <div className="space-y-2">
          <label
            htmlFor="quote"
            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          >
            Cita *
          </label>
          <textarea
            className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
            placeholder="Escriba la cita aqui"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="page-number"
            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          >
            Número de pagina
          </label>
          <input
            type="number"
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30  w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
          ></input>
        </div>
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
            Guardar cita
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default AddQuote;
