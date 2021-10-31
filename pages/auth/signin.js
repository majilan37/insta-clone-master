import {getProviders, signIn} from 'next-auth/react'
import Header from '../../components/Header'

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function signin({providers}) {
    return (
        <>
            <Header />
            <div className='max-w-sm mx-auto flex flex-col items-center h-[70vh] pt-10'>
                <img className='w-80 object-contain' src="https://links.papareact.com/ocw" alt="" />
                <p className='mt-6'>Sign to your in Instagram account</p>
                <small>note : This isn't the real app</small>
                <div className="mt-44">
                    {providers && Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button 
                                className='p-3 bg-blue-400 text-white' 
                                onClick={() => signIn(provider.id, {callbackUrl: '/'} )}>
                                    Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context){
    const providers = await getProviders()

    return{
        props:{
            providers
        }
    }
}

export default signin
