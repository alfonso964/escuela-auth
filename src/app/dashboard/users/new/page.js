'use client'
import { useActionState, useEffect } from "react"
import { register } from "@/lib/actions-auth"
import { useRouter } from "next/navigation"
import { UserPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewUserPage() {
    const router = useRouter()
    
    // 1. La acción de registro
    const [state, formAction, isPending] = useActionState(register, {})

    // 2. Efecto para redirigir cuando success sea true
    useEffect(() => {
        if (state?.success) {
            router.push('/dashboard/users')
            router.refresh()
        }
    }, [state?.success, router])

    return (
        <div className="p-8 max-w-md mx-auto">
            <Link href="/dashboard/users" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 text-sm transition">
                <ArrowLeft size={16} /> Volver a la lista
            </Link>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-6 text-indigo-900">
                    <UserPlus size={28} />
                    <h1 className="text-2xl font-bold">Nuevo Usuario</h1>
                </div>

                {state?.error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center italic">
                        {state.error}
                    </div>
                )}

                {state?.success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm text-center font-bold">
                        ¡Usuario creado! Redirigiendo...
                    </div>
                )}

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                        <input 
                            name="name" 
                            type="text" 
                            required 
                            disabled={isPending || state?.success}
                            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:bg-slate-50"
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            disabled={isPending || state?.success}
                            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:bg-slate-50"
                            placeholder="juan@escuela.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña Temporal</label>
                        <input 
                            name="password" 
                            type="password" 
                            required 
                            disabled={isPending || state?.success}
                            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:bg-slate-50"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        disabled={isPending || state?.success}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-indigo-100 transition disabled:opacity-50 mt-4"
                    >
                        {isPending ? "Creando..." : "Crear Usuario"}
                    </button>
                </form>
                
                <p className="mt-4 text-xs text-slate-400 text-center">
                    El usuario se creará con el rol <b>USER</b> por defecto.
                </p>
            </div>
        </div>
    )
}