import { getSession, SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot >
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export async function getServerSideProps(context){
  const session = getSession(context)

  return{
    props: {
      session
    }
  }
}

export default MyApp
