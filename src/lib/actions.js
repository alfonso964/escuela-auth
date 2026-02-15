'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { signIn, signOut } from "@/auth"
import { auth } from "@/auth"
import { requireAdmin } from "@/lib/permissions"


// ------------------------------ GRUPOS ------------------------------

export async function insertarGrupo(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const nombre = formData.get('nombre')
    const tutor = formData.get('tutor')
    const aula = formData.get('aula')


    try {
        await prisma.grupo.create({
            data: {
                nombre,
                tutor,
                aula
            }
        })
        revalidatePath('/grupos')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarGrupo(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const tutor = formData.get('tutor')
    const aula = formData.get('aula')

    try {
        await prisma.grupo.update({
            where: { id },
            data: {
                nombre,
                tutor,
                aula
            }
        })
        revalidatePath('/grupos')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarGrupo(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const id = Number(formData.get('id'))

    try {
        await prisma.grupo.delete({
            where: { id },
        })
        revalidatePath('/grupos')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}




// ------------------------------ ASIGNATURAS ------------------------------

export async function insertarAsignatura(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const nombre = formData.get('nombre')
    const profesor = formData.get('profesor')
    const horas_semana = Number(formData.get('horas_semana'))

    try {
        await prisma.asignatura.create({
            data: {
                nombre,
                profesor,
                horas_semana
            }
        })
        revalidatePath('/asignaturas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarAsignatura(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const profesor = formData.get('profesor')
    const horas_semana = Number(formData.get('horas_semana'))

    try {
        await prisma.asignatura.update({
            where: { id },
            data: {
                nombre,
                profesor,
                horas_semana
            }
        })
        revalidatePath('/asignaturas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarAsignatura(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const id = Number(formData.get('id'))

    try {
        await prisma.asignatura.delete({
            where: { id },
        })
        revalidatePath('/asignaturas')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}





// ------------------------------ ESTUDIANTES ------------------------------

export async function insertarEstudiante(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const nombre = formData.get('nombre')
    const tutor_legal = formData.get('tutor_legal')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const foto = formData.get('foto')

    // GRUPO - ESTUDIANTE (1:N)
    const grupoId = formData.get('grupoId') ? Number(formData.get('grupoId')) : null 


    // ESTUDIANTE - ASIGNATURAS (N:M)
    const asignaturas = formData.getAll('asignaturas').map(id => ({ id: Number(id) }))


    try {
        await prisma.estudiante.create({
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                grupoId,
                asignaturas: { connect: asignaturas }
            }
        })
        revalidatePath('/estudiantes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function modificarEstudiante(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const tutor_legal = formData.get('tutor_legal')
    const fecha_nacimiento = new Date(formData.get('fecha_nacimiento'))
    const foto = formData.get('foto')

    // GRUPO - ESTUDIANTE (1:N)
    const grupoId = formData.get('grupoId') ? Number(formData.get('grupoId')) : null 


    // ESTUDIANTE - ASIGNATURAS  (N:M)
    const asignaturas = formData.getAll('asignaturas').map(id => ({ id: Number(id) }))


    try {

        await prisma.estudiante.update({
            where: { id },
            data: {
                nombre,
                tutor_legal,
                fecha_nacimiento,
                foto,
                grupoId,
                asignaturas: { set: asignaturas }
            }
        })
        revalidatePath('/estudiantes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}



export async function eliminarEstudiante(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const id = Number(formData.get('id'))

    try {
        await prisma.estudiante.delete({
            where: { id },
        })
        revalidatePath('/estudiantes')
        return { success: 'Operación realizada con éxito' }
    } catch (error) {
        console.log(error)
        return { error: error.message.split('\n').pop() }
    }
}


export async function loginGoogle() {
    await signIn('google', { redirectTo: '/' })
}

export async function loginGithub() {
    await signIn('github', { redirectTo: '/' })
}

export async function loginDiscord() {
    await signIn('discord', { redirectTo: '/' })
}

export async function logout() {
    try {
        // Esto borra la cookie de sesión y te manda a la Home directamente
        await signOut({ redirectTo: "/" })
    } catch (error) {
        throw error
    }
}
// ------------------------------ USUARIOS ------------------------------

export async function modificarPerfil(prevState, formData) {
    const session = await auth()
    if (!session) return { error: "No autenticado" }

    const id = session.user.id
    const name = formData.get('name')
    const email = formData.get('email')
    const image = formData.get('image')

    try {
        await prisma.user.update({
            where: { id },
            data: { name, email, image }
        })
        revalidatePath('/dashboard')
        return { success: 'Perfil actualizado con éxito' }
    } catch (error) {
        return { error: error.message.split('\n').pop() }
    }
}

// Esta es la versión para Formularios (como la tenías)
export async function modificarUsuario(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const id = formData.get('id')
    const role = formData.get('role')
    const active = formData.get('active') === 'true'

    try {
        await prisma.user.update({
            where: { id },
            data: { role, active }
        })
        revalidatePath('/admin/users')
        return { success: 'Usuario actualizado con éxito' }
    } catch (error) {
        return { error: error.message.split('\n').pop() }
    }
}

// Esta es la versión para Formularios (como la tenías)
export async function eliminarUsuario(prevState, formData) {
    try {
        await requireAdmin();
    } catch (error) {
        return { error: error.message };
    }

    const id = formData.get('id')

    try {
        await prisma.user.delete({
            where: { id }
        })
        revalidatePath('/admin/users')
        return { success: 'Usuario eliminado con éxito' }
    } catch (error) {
        return { error: error.message.split('\n').pop() }
    }
}

// --- NUEVAS FUNCIONES PARA COMPONENTES CLIENTE (Evitan el error de onChange/onClick) ---

export async function changeRole(userId, newRole) {
    try {
        await requireAdmin();
        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        })
        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        return { error: error.message }
    }
}

export async function deleteUser(userId) {
    try {
        await requireAdmin();
        await prisma.user.delete({
            where: { id: userId }
        })
        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        return { error: error.message }
    }
}