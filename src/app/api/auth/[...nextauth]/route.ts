import { db } from "@/lib/prisma"
import NextAuth, { NextAuthOptions } from "next-auth"
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials) {
				if (!credentials) {
					throw new Error('Invalid credentials');
				}

        const user = await db.user.findUniqueOrThrow({
          select: {
            email: true,
            id: true,
            image: true,
            name: true,
            password: true,
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
            email: credentials.email,
          }
        })

				const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

				return {
					id: user.id,
					email: user.email,
					image: user.image,
					name: user.name,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					UserRole: user.UserRole
				}
			}
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