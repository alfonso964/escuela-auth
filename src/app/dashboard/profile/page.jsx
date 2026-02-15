import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { modificarPerfil } from '@/lib/actions'
import Link from 'next/link'

export default async function ProfilePage() {
    const session = await auth()
    if (!session) redirect('/auth/signin')

    return (
        <main className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>

            <form action={modificarPerfil} className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 flex flex-col gap-4 border border-gray-200 dark:border-slate-700">
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={session.user.name}
                        className="w-full p-2 border rounded dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        defaultValue={session.user.email}
                        className="w-full p-2 border rounded dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">URL de Imagen</label>
                    <input
                        name="image"
                        type="text"
                        defaultValue={session.user.image}
                        className="w-full p-2 border rounded dark:bg-slate-900 border-gray-300 dark:border-slate-600"
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Guardar Cambios
                    </button>
                    <Link
                        href="/dashboard"
                        className="p-2 text-gray-600 hover:underline"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </main>
    )
}
