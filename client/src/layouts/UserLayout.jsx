import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function UserLayout() {
    return (
        <div className="px-10 py-4 flex flex-col bg-gray-50 min-h-screen">
            <Header />
            <main className='bg-gray-100 grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default UserLayout