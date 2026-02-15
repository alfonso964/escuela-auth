'use client'
import { useActionState, useEffect, useId } from "react";
import { RefreshCwIcon, User, Mail, Lock, Shield } from "lucide-react";
import { toast } from "sonner";

export default function UserForm({ action, user, isAdminSession, labelSubmit = "Actualizar Perfil" }) {
    const formId = useId();
    const [state, faction, isPending] = useActionState(action, {});

    useEffect(() => {
        if (state?.success) toast.success(state.success);
        if (state?.error) toast.error(state.error);
    }, [state]);

    return (
        <form action={faction} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <input type="hidden" name="id" defaultValue={user?.id} />

            <div className="space-y-4">
                {/* Nombre */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                        <User size={16} /> Nombre Completo
                    </label>
                    <input 
                        name="name" 
                        defaultValue={user?.name} 
                        className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Tu nombre"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                        <Mail size={16} /> Correo Electrónico
                    </label>
                    <input 
                        name="email" 
                        defaultValue={user?.email} 
                        className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="tu@email.com"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                        <Lock size={16} /> Contraseña
                    </label>
                    <input 
                        name="password" 
                        type="password" 
                        className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Dejar en blanco para no cambiar"
                    />
                </div>

                {/* Rol (Solo visible/editable para ADMIN) */}
                {isAdminSession && (
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                            <Shield size={16} /> Rol del Sistema
                        </label>
                        <select 
                            name="role" 
                            defaultValue={user?.role} 
                            className="w-full p-3 rounded-lg border border-slate-300 bg-slate-50 outline-none"
                        >
                            <option value="USER">Estudiante (USER)</option>
                            <option value="ADMIN">Administrador (ADMIN)</option>
                        </select>
                    </div>
                )}
            </div>

            <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex justify-center items-center gap-2 disabled:bg-slate-400"
            >
                {isPending ? <RefreshCwIcon className="animate-spin" size={20} /> : labelSubmit}
            </button>
        </form>
    );
}