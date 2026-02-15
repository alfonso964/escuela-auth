'use server'

import { signIn, signOut } from "@/auth"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

// --- LOGIN ---
export async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const callbackUrl = formData.get('callbackUrl') || '/dashboard'

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: callbackUrl,
        })
    } catch (error) {
        if (error.type === 'CredentialsSignin') return { error: 'Credenciales incorrectas' }
        if (error.message === 'NEXT_REDIRECT') throw error
        throw error
    }
}

// --- REGISTER (Solo para USER) ---
export async function register(prevState, formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    if (!name || !email || !password) return { error: "Faltan campos obligatorios" }

    try {
        const userExists = await prisma.user.findUnique({ where: { email } })
        if (userExists) return { error: "El email ya está en uso" }

        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.create({
            data: { name, email, password: hashedPassword, role: 'USER' }
        })
        return { success: "Cuenta creada. Ya puedes iniciar sesión." }
    } catch (error) {
        return { error: "Error al crear la cuenta" }
    }
}

// --- LOGOUT ---
export async function logout() {
    await signOut({ redirectTo: "/auth/signin", redirect: true })
}

// --- MODIFICAR PERFIL (Dashboard) ---
export async function modificarPerfil(prevState, formData) {
    const id = formData.get('id')
    const name = formData.get('name')
    const image = formData.get('image')
    const password = formData.get('password')

    try {
        const updateData = { name, image }
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10)
        }
        await prisma.user.update({ where: { id }, data: updateData })
        revalidatePath('/dashboard/profile')
        return { success: "Perfil actualizado con éxito" }
    } catch (error) {
        return { error: "No se pudieron guardar los cambios" }
    }
}

// --- ACCIONES DE ADMIN ---
export async function eliminarUsuario(id) {
    try {
        await prisma.user.delete({ where: { id } })
        revalidatePath('/dashboard/users')
        return { success: "Usuario eliminado" }
    } catch (error) {
        return { error: "Error al borrar usuario" }
    }
}

export async function cambiarRol(id, newRole) {
    try {
        await prisma.user.update({ where: { id }, data: { role: newRole } })
        revalidatePath('/dashboard/users')
        return { success: "Rol actualizado" }
    } catch (error) {
        return { error: "Error al cambiar rol" }
    }
}