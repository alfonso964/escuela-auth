import { logout } from "@/lib/actions"

function PaginaLogout() {
  
  return (
    <>
      <h1>Cerrar sesión</h1>
      <form>
        <button formAction={logout}>
          <img src="/logout.svg" alt="Exit" /> Cerrar sesión
        </button>
      </form>
    </>
  )
}

export default PaginaLogout