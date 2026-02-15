import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { UserRow } from "@/components/user-row"
import Link from "next/link"
import { UserPlus } from "lucide-react"

export default async function AdminUsersPage() {
    const session = await auth()
    if (session?.user?.role !== 'ADMIN') redirect('/dashboard')

    const users = await prisma.user.findMany({ orderBy: { name: 'asc' } })

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                
                {/* REQUISITO: INSERTAR USUARIO - Ahora apunta a /new */}
                <Link 
                    href="/dashboard/users/new" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition"
                >
                    <UserPlus size={18} /> Insertar Usuario
                </Link>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden border">
                <table className="w-full text-left">
                    <thead className="bg-slate-100 text-xs font-bold uppercase text-slate-600">
                        <tr>
                            <th className="p-4">Nombre</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Rol</th>
                            <th className="p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => <UserRow key={user.id} user={user} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}