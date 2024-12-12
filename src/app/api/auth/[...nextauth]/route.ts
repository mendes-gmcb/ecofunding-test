import { db } from "@/lib/prisma"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {
        const user = await db.user.findUniqueOrThrow({
          select: {
            email: true,
            id: true,
            image: true,
            name: true,
            password: false,
            createdAt: true,
            updatedAt: true,
						UserRole: {
							select: {
									role: {
											select: {
													id: true,
													name: true,
													description: false,
											},
									},
							},
						},
          },
          where: {
            email: credentials?.email,
            password: credentials?.password
          },
					
        })

				return user
			},
		})
	],
	pages: {
		signIn: '/auth/singin'
	},
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user)
			return token
		},
		async session({ session, token }){
			session = token.user as any
			return session
		}
	}
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }