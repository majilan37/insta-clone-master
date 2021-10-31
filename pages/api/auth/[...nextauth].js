import NextAuth from "next-auth"
import GoogleProviders from "next-auth/providers/google"


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages:{
      signIn:'/auth/signin'
  },
  callbacks:{
    async session({ session, token, user }){
      session.user.username =  session.user.name.split(' ').join(' ').toLocaleLowerCase()
      session.user.uid = token.sub
      return session
    }
  }
})