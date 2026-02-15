import { auth } from "@/auth";
import UserForm from "@/components/usuarios/form-user";
import { modificarPerfil } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) redirect("/auth/signin");

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900">Mi Panel</h1>
                <p className="text-slate-500 mt-2">Gestiona tu información personal y cuenta</p>
            </header>

            <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                {/* Lado izquierdo: Resumen rápido */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg h-fit">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mb-4 backdrop-blur-sm">
                            {session.user.name?.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-xl font-bold">{session.user.name}</h2>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs mt-2 uppercase tracking-widest font-semibold">
                            {session.user.role}
                        </span>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 space-y-4 text-sm">
                        <p className="flex justify-between"><span>Mi ID:</span> <span className="font-mono text-[10px] opacity-70">{session.user.id}</span></p>
                        <p className="flex justify-between"><span>Estado:</span> <span className="text-green-300 font-bold">Activo</span></p>
                    </div>
                </div>

                <div>
                    <UserForm 
                        action={modificarPerfil} 
                        user={session.user} 
                        isAdminSession={session.user.role === 'ADMIN'} 
                    />
                </div>
            </div>
        </div>
    );
}