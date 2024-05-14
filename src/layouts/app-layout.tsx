import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className='bg-neutral-800 min-h-screen'>
      <div className='px-6 py-4 container mx-auto'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      </div>
    </div>
  )
}

export default AppLayout
