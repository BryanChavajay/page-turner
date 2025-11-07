import {BookList} from '@/components/BookList.jsx'
import {BookOpen} from '@/assets/BookOpen.jsx'

export const Home = () => {
  return (
    <div className="relative z-10 min-h-screen">
      {/* HEADER */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <section className="flex items-center gap-3">
              <article className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary"/>
              </article>
              <article>
                <h1 className="text-2xl font-bold text-foreground">
                  Mi Biblioteca
                </h1>
                <p className="text-sm text-muted-foreground">
                  Registro de lecturas
                </p>
              </article>
            </section>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3 gap-2">
              Añadir cita
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* All Boojs Section */}
          <section>
            <article className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Todos los Libros
              </h2>
              <p className="text-muted-foreground">
                Explora tu colección completa de libros registrados
              </p>
            </article>
            <BookList />
          </section>

          {/* Finished Books Section */}
          <section>
            <article className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Libros Terminados
              </h2>
              <p className="text-muted-foreground">
                Libros completados recientemente
              </p>
            </article>
            <div>LISTA DE LIBROS TERMINADOS</div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Home;
