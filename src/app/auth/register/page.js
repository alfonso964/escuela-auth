'use client' // <--- Obligatorio para usar useActionState y hooks

import { useActionState } from "react"
import { register } from "@/lib/actions-auth"

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, {})

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Crea tu cuenta de Estudiante
        </h1>

        {/* --- MENSAJES DE ESTADO --- */}
        {state?.error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {state.error}
          </div>
        )}
        {state?.success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm text-center">
            {state.success}
          </div>
        )}

        <form action={formAction} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Nombre completo"
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isPending}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isPending}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isPending}
          />

          <button
            type="submit"
            disabled={isPending}
            className={`p-3 rounded-lg font-bold text-white transition ${
              isPending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/auth/signin" className="text-blue-600 font-bold hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  )
}