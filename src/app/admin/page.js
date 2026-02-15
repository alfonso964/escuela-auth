import Link from 'next/link';
import { auth } from '@/auth'
import { redirect } from 'next/navigation';

async function page() {
    const session = await auth()
    console.log(session);

    if (!session) redirect('/')
    if (session.user.role !== 'ADMIN') redirect('/')

    return (
        <>
            <Link href="/">Página principal</Link>
            <div>
                {JSON.stringify(session)}
            </div>
        </>
    )
}

export default page