import Image from 'next/image'
import {
    SearchIcon, PlusCircleIcon, UserGroupIcon, 
    HeartIcon, PaperAirplaneIcon, MenuIcon,
} from '@heroicons/react/outline'
import {
    HomeIcon
} from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

function Header() {
    const {data: session} = useSession()
    const [open, setOpen] = useRecoilState(modalState)
    const router = useRouter()
    return (
        <header className='sticky top-0 bg-white px-4 py-4 shadow-md z-50'>
            <div className="flex justify-between bg-white max-w-6xl mx-auto items-center z-50">
                <div onClick={() => router.push('/')}>
                    <div className="relative h-10 w-24 hidden lg:inline-grid cursor-pointer">
                        <Image 
                            src='https://links.papareact.com/ocw'
                            layout='fill'
                            objectFit='contain'
                        />
                    </div>
                    <div className="relative h-10 w-10 lg:hidden flex-shrink-0 cursor-pointer">
                        <Image 
                            src='https://links.papareact.com/jjm'
                            layout='fill'
                            objectFit='contain'
                        />
                    </div>
                </div>
                <div className='max-w-xs mt-1'>
                    <div className='flex relative items-center space-x-2'>
                        <div className='pointer-events-none absolute left-4'>
                            <SearchIcon className='h-6 text-gray-500' />
                        </div>
                        <input 
                            className='bg-gray-50 border-gray-300 pl-12 py-2 rounded-md focus:ring-gray-800 focus:border-gray-800 outline-none sm:text-sm' 
                            type="text" 
                            placeholder="Search" 
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-3 justify-end" >
                    <HomeIcon onClick={() => router.push('/')} className="navBtn" />
                    <MenuIcon className="h-8 md:hidden cursor-pointer" />
                    {!session ? (
                        <button onClick={signIn}>Sign in</button>
                    ):(
                        <>
                            <div className="relative navBtn">
                                <span className="absolute -top-1 left-2 bg-red-500 z-10 text-xs w-4 h-4 rounded-full flex justify-center items-center animate-pulse text-white" >3</span>
                                <PaperAirplaneIcon className="navBtn rotate-45" />
                            </div>
                            <PlusCircleIcon onClick={() =>  setOpen(true)} className="navBtn" />
                            <UserGroupIcon className="navBtn" />
                            <HeartIcon className="navBtn" />
                            <div onClick={signOut} className="relative h-6 w-6 navBtn">
                                <img 
                                    src={session.user.image}
                                    className='rounded-full object-contain '
                                    alt=''
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
