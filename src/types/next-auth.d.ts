import nextAuth from "next-auth";

declare module 'next-auth' {
  interface Session {
    id: string
    email: string
    name: string
    image: string,
    createdAt: DateTime,
    updatedAt: DateTime,
    UserRole: RoleInterface[]
  }

  interface RoleInterface {
    role: {
      id: number,
      name: string,
    }
  }
}