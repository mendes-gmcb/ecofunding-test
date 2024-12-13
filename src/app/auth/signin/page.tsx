"use client"

import { getSession, signIn } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { SyntheticEvent } from "react"

export default function SignInPage() {
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const email = (e.target as any).email.value
    const password = (e.target as any).password.value

    const result = await signIn('credentials', { 
      email, 
      password, 
      redirect: false 
    })

    if (result?.error) {
      console.log(result)
      return
    }

    const session = await getSession();
    if (session?.UserRole[0].role.name == "INVESTOR") {
      router.replace('/admin/investor/dashboard');
    } else if (session?.UserRole[0].role.name == "DESIGNER") {
      router.replace('/admin/designer/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-8 rounded-xl w-full max-w-md flex justify-center items-center flex-col">
        <Image 
          className="my-4"
          src="/logo-white.webp" 
          alt="Ecofunding"  
          width={256}
          height={37.73}
          priority
        />
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Login
        </h2>
        
        <div className="space-y-4 mt-24">
          <form 
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-2 border border-white-50 bg-background
                rounded-lg focus:outline-none focus:ring-2 text-white-300
                focus:border-blue-500"
            />
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                required 
                placeholder="Digite sua senha" 
                className="w-full px-4 py-2 border border-white-50 bg-background
                  rounded-lg focus:outline-none focus:ring-2 text-white-300
                  focus:border-blue-500"
              />
          </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white 
                py-3 rounded-lg hover:bg-green-700 
                transition duration-300"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
