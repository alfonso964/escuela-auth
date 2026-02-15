import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN';

  // Función para cerrar sesión
  async function logout() {
    "use server";
    await signOut();
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center py-12 px-4 gap-12">
      
      {/* 1. TÍTULO PRINCIPAL */}
      <h1 className="p-6 w-full max-w-4xl text-center text-4xl font-extrabold text-indigo-900 bg-white/50 rounded-full border border-slate-200 shadow-sm">
        Escuela 2026
      </h1>

      {/* 2. MENÚ DE NAVEGACIÓN */}
      <div className="flex flex-wrap justify-center gap-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md border border-slate-200">
          <Link href="/" className="px-5 py-2 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-2">
              🏠 Inicio
          </Link>
          
          {!session ? (
              <>
                  <Link href="/auth/signin" className="px-5 py-2 rounded-full text-sm font-bold text-blue-600 hover:bg-blue-50 transition">
                      Entrar
                  </Link>
                  <Link href="/auth/register" className="px-5 py-2 rounded-full text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-md">
                      Crear cuenta
                  </Link>
              </>
          ) : (
              <>
                  <Link href="/dashboard" className="px-5 py-2 rounded-full text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition flex items-center gap-2">
                      👤 Mi Panel
                  </Link>
                  
                  <form action={logout}>
                      <button type="submit" className="px-5 py-2 rounded-full text-sm font-bold text-red-600 hover:bg-red-50 transition">
                          ❌ Salir
                      </button>
                  </form>
              </>
          )}
      </div>

      {/* 3. BLOQUE DE BOTONES GRANDES */}
      <div className="flex flex-col gap-6 w-full max-w-md font-bold text-white">
        
        {isAdmin && (
          <Link
            href="/dashboard/users"
            className="rounded-2xl text-center text-2xl py-12 px-4 bg-radial-[at_20%_20%] from-rose-400 to-rose-900 hover:scale-[1.05] transition-transform shadow-xl shadow-rose-200 border-2 border-rose-500"
          >
            USUARIOS (ADMIN)
          </Link>
        )}

        <Link
          href="/grupos"
          className="rounded-2xl text-center text-2xl py-12 px-4 bg-radial-[at_20%_20%] from-indigo-400 to-indigo-900 hover:scale-[1.02] transition-transform shadow-xl shadow-indigo-200"
        >
          GRUPOS
        </Link>
        
        <Link
          href="/asignaturas"
          className="rounded-2xl text-center text-2xl py-12 px-4 bg-radial-[at_20%_20%] from-emerald-400 to-emerald-900 hover:scale-[1.02] transition-transform shadow-xl shadow-emerald-200"
        >
          ASIGNATURAS
        </Link>
        
        <Link
          href="/estudiantes"
          className="rounded-2xl text-center text-2xl py-12 px-4 bg-radial-[at_20%_20%] from-amber-400 to-amber-900 hover:scale-[1.02] transition-transform shadow-xl shadow-amber-200"
        >
          ESTUDIANTES
        </Link>

        {session && (
          <Link 
            href="/dashboard" 
            className="mt-4 rounded-xl text-center text-lg py-5 px-4 bg-slate-800 border-2 border-slate-600 hover:bg-black transition-colors shadow-lg"
          >
            Ir a mi Perfil (Dashboard) →
          </Link>
        )}
      </div>
    </div>
  );
}