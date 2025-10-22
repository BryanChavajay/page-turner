import { useState } from "react";
import bookLogo from "../../assets/book.svg";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    console.log("Username: ", username, " Password", password);
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-sm bg-amber-50 rounded-lg shadow-md border border-gray-200 p-8">
        <article className="flex justify-center mb-4">
          <img src={bookLogo} alt="Book Logo" className="w-20 h-20" />
        </article>

        <article className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-base text-gray-600">
            Ingresa tus credenciales para continuar
          </p>
        </article>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-base font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-tertiary text-gray-600 hover:text-gray-300 font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
          >
            Ingresar
          </button>
        </form>
      </section>
    </div>
  );
};
