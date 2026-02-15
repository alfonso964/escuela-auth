import { auth } from "@/auth";

/**
 * Verifica si el usuario tiene rol ADMIN
 */
export function isAdmin(session) {
    return session?.user?.role === 'ADMIN';
}

/**
 * Verifica si el usuario puede modificar datos (solo ADMIN)
 */
export function canModify(session) {
    return isAdmin(session);
}

/**
 * Lanza error si el usuario no es ADMIN
 * Usar en server actions
 */
export async function requireAdmin() {
    const session = await auth();
    
    if (!session) {
        throw new Error('No autenticado');
    }
    
    if (!isAdmin(session)) {
        throw new Error('No tienes permisos para realizar esta acción');
    }
    
    return session;
}
