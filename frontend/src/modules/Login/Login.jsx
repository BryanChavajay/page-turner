import { useForm } from "react-hook-form";
import bookLogo from "../../assets/book.svg";

export const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-sm bg-card rounded-lg shadow-md border border-gray-200 p-8">
        <article className="flex justify-center mb-4 text-primary">
          <img src={bookLogo} alt="Book Logo" className="w-20 h-20" />
        </article>

        <article className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 ">
            Iniciar Sesión
          </h1>
          <p className="text-base text-muted-foreground">
            Ingresa tus credenciales para continuar
          </p>
        </article>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              {...register("username", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-gray-200 hover:text-gray-600 text-lg font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          >
            Ingresar
          </button>
        </form>
      </section>
    </div>
  );
};
