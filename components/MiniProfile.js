import { signOut, useSession } from "next-auth/react"

function MiniProfile() {
    const {data: session} = useSession()
    return (
        <div className='flex items-center mt-14' >
            <img 
                className="w-16 h-16 rounded-full border p-[2px] mx-10 justify-between" 
                src={session?.user.image} 
                alt="" 
            />
            <div className=''>
                <h2 className="font-bold">{session?.user.name}</h2>
                <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
            </div>
            <button onClick={signOut} className="text-blue-400 text-sm font-semibold mx-4 p-2">Sign Out</button>
        </div>
    )
}

export default MiniProfile
