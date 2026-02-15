// src/components/dashboard/profile-form.jsx
'use client'
import { useActionState, useEffect } from "react"
import { modificarPerfil } from "@/lib/actions-auth"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function ProfileForm({ user }) {
    // Conectamos con la acción que acabas de actualizar en actions-auth.js
    const [state, faction, isPending] = useActionState(modificarPerfil, {})

    useEffect(() => {
        if (state?.success) toast.success(state.success)
        if (state?.error) toast.error(state.error)
    }, [state])

    return (
        <form action={faction} className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-5 border border-gray-100">
            {/* ID oculto para saber qué usuario editar */}
            <input type="hidden" name="id" value={user.id} />

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Nombre</label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={user.name}
                        className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Email (Sólo lectura)</label>
                    <input
                        name="email"
                        type="email"
                        defaultValue={user.email}
                        readOnly
                        className="w-full p-2.5 border rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Nueva Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 mt-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                >
                    {isPending ? <Loader2 className="animate-spin" size={20} /> : "Actualizar Perfil"}
                </button>
                <a href="/dashboard" className="text-gray-500 hover:text-gray-800 text-sm font-medium">Volver</a>
            </div>
        </form>
    )
}