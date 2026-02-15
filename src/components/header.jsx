import Link from 'next/link'
import { auth } from "@/auth"
import { logout } from "@/lib/actions-auth"
import { Home, Users, BookOpen, LogOut, LogIn, LayoutDashboard, UserCog } from "lucide-react"

export default async function Header() {
    const session = await auth();

    return (
        <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                
                <nav className="flex items-center gap-6">
                    <Link href="/" className="font-extrabold text-xl flex items-center gap-2 text-white hover:text-blue-200 transition">
                        <Home size={24} /> Escuela 2026
                    </Link>
                    
                    <div className="hidden md:flex gap-4 text-sm font-medium">
                        <Link href="/estudiantes" className="flex items-center gap-1 hover:bg-blue-800 px-3 py-2 rounded transition">
                            <Users size={16} /> Estudiantes
                        </Link>
                        <Link href="/grupos" className="flex items-center gap-1 hover:bg-blue-800 px-3 py-2 rounded transition">
                            <BookOpen size={16} /> Grupos
                        </Link>
                    </div>
                </nav>

                <div className="flex items-center gap-4">
                    {session ? (
                        <>
                            {/* --- BOTÓN DE USUARIOS (SOLO PARA ADMIN) --- */}
                            {session.user.role === 'ADMIN' && (
                                <Link href="/dashboard/users" className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-lg transition text-sm font-bold shadow-md">
                                    <UserCog size={16} /> Gestión Usuarios
                                </Link>
                            )}

                            <Link href="/dashboard" className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition text-sm font-bold">
                                <LayoutDashboard size={16} /> Dashboard
                            </Link>

                            <div className="flex items-center gap-3 pl-4 border-l border-blue-700">
                                <div className="text-right hidden sm:block leading-tight">
                                    <p className="text-sm font-bold">{session.user.name}</p>
                                    <p className="text-[10px] uppercase text-blue-300 tracking-wider font-black">{session.user.role}</p>
                                </div>
                                
                                <form action={logout}>
                                    <button className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition shadow-md flex items-center gap-2 text-xs font-bold">
                                        <LogOut size={16} />
                                        <span>Salir</span>
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <Link href="/auth/signin" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-bold transition shadow-md">
                            <LogIn size={18} /> Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}