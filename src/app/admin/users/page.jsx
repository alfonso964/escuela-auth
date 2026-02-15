import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { UserRow } from "@/components/user-row" // <--- Importamos el componente nuevo

export default async function AdminUsersPage() {
    const session = await auth()
    
    // Si no es admin, fuera
    if (session?.user?.role !== 'ADMIN') redirect('/')

    const users = await prisma.user.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Panel de Administración de Usuarios</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 uppercase text-xs text-slate-600">
                        <tr>
                            <th className="p-4">Nombre</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Rol</th>
                            <th className="p-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            // Aquí usamos el componente cliente
                            <UserRow key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}