/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { loginGoogle, loginGithub, loginDiscord } from "@/lib/actions"
import { signIn } from "@/auth" // Importamos signIn para las credenciales

const errors = new Map();
errors.set('OAuthSignin', "Error al construir una URL de autorización.");
errors.set('OAuthCallback', "Error al manejar la respuesta de un proveedor de OAuth.");
errors.set('OAuthCreateAccount', "No se pudo crear un usuario proveedor de OAuth en la base de datos.");
errors.set('EmailCreateAccount', "No se pudo crear un usuario de proveedor de correo electrónico en la base de datos.");
errors.set('Callback', "Error en la ruta del controlador de devolución de llamada de OAuth.");
errors.set('OAuthAccountNotLinked', "Este email ya está registrado con otro proveedor.");
errors.set('EmailSignin', "Comprueba tu dirección de correo electrónico.");
errors.set('CredentialsSignin', "Fallo al iniciar sesion. Verifique que los datos que proporcionó sean correctos.");
errors.set('SessionRequired', "Error al iniciar sesión. Verifique que los detalles que proporcionó sean correctos.");
errors.set('Default', "No se puede iniciar sesión.");

export default async function SignInPage({ searchParams }) {
  const { error } = await searchParams
  // Buscamos el mensaje amigable si hay un error en la URL
  const errorMessage = error ? (errors.get(error) || errors.get('Default')) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Iniciar Sesión</h1>
        
        {/* Mostramos el error traducido si existe */}
        {errorMessage && <p className="text-red-500 mb-4 text-sm font-semibold">{errorMessage}</p>}

        {/* FORMULARIO DE CREDENCIALES (MODIFICADO PARA REDIRIGIR A /) */}
        <form 
          action={async (formData) => {
            "use server"
            await signIn("credentials", {
              ...Object.fromEntries(formData),
              redirectTo: "/" 
            })
          }}
          className="flex flex-col gap-3 mb-6"
        >
          <input 
            name="email" 
            type="email" 
            placeholder="Correo electrónico" 
            required 
            className="border p-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Contraseña" 
            required 
            className="border p-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white p-2 rounded font-bold hover:bg-indigo-700 transition">
            Entrar con mi cuenta
          </button>
        </form>

        {/* SEPARADOR VISUAL */}
        <div className="flex items-center gap-2 mb-6 text-gray-400 text-xs uppercase font-bold">
          <hr className="flex-1" /> o entrar con <hr className="flex-1" />
        </div>

        {/* TUS BOTONES SOCIALES ORIGINALES (MANTENIDOS) */}
        <form className="flex flex-col gap-3">
          <button formAction={loginGoogle} className="border p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50">
            <img src="/google.svg" className="w-5" /> Entrar con Google
          </button>
          <button formAction={loginGithub} className="border p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50">
            <img src="/github.svg" className="w-5" /> Entrar con GitHub
          </button>
          <button formAction={loginDiscord} className="border p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50">
            <img src="/discord.svg" className="w-5" /> Entrar con Discord
          </button>
        </form>
      </div>
    </div>
  )
}