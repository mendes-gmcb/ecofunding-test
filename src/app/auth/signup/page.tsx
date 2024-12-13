"use client"

import { createUser } from "@/app/_actions/createUser";
import { getSession, signIn } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { SyntheticEvent } from "react"

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const email = (e.target as any).email.value
    const password = (e.target as any).password.value
    const name = (e.target as any).name.value
    const role = Number((e.target as any).role.value)

    try {
      await createUser({ 
        email, 
        password, 
        name,
        role
      });

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
    } catch (error) {
      console.error(error);
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
          Cadastrar
        </h2>
        
        <div className="space-y-4 mt-24">
          <form 
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name">Nome e Sobrenome</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                placeholder="Digite seu nome" 
                className="w-full px-4 py-2 border border-white-50 bg-background
                  rounded-lg focus:outline-none focus:ring-2 text-white-300
                  focus:border-blue-500"
              />
            </div>

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

            <div>
              <label htmlFor="role">Tipo de empresa</label>
              <select name="role" id="role" className="w-full px-4 py-2 border border-white-50 bg-background
                  rounded-lg focus:outline-none focus:ring-2 text-white-300
                  focus:border-blue-500">
                <option value="1">Investidor Ecosustentável</option>
                <option value="2">Parceiro Ecosustentável</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white 
                py-3 rounded-lg hover:bg-green-700 
                transition duration-300"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
