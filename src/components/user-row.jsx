'use client'
import { eliminarUsuario, cambiarRol } from "@/lib/actions-auth"
import { useTransition } from "react"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

export function UserRow({ user }) {
    const [isPending, startTransition] = useTransition()

    const onEliminar = () => {
        if (!confirm("¿Eliminar usuario?")) return
        startTransition(async () => {
            const res = await eliminarUsuario(user.id)
            res?.error ? toast.error(res.error) : toast.success(res.success)
        })
    }

    const onRolChange = (e) => {
        const role = e.target.value
        startTransition(async () => {
            const res = await cambiarRol(user.id, role)
            res?.error ? toast.error(res.error) : toast.success(res.success)
        })
    }

    return (
        <tr className={`border-b hover:bg-slate-50 ${isPending ? 'opacity-50' : ''}`}>
            <td className="p-4">{user.name}</td>
            <td className="p-4 text-slate-500">{user.email}</td>
            <td className="p-4">
                <select defaultValue={user.role} onChange={onRolChange} className="border rounded p-1 text-xs font-bold">
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </td>
            <td className="p-4">
                <button onClick={onEliminar} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                </button>
            </td>
        </tr>
    )
}