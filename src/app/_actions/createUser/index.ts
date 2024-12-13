"use server";

const bcrypt = require("bcryptjs");
import { db } from '@/lib/prisma'; // Certifique-se de importar seu cliente Prisma
import { createUserSchema } from './schema';

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: number;
}

const createUser = async (params: CreateUserParams) => {
  createUserSchema.parse(params);

  const { name,
    email,
    password,
    image, } = params;

  // Verificar se o usuário já existe
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash da senha
  const pass: string = await bcrypt.hash(password, 10);
  
  const user = await db.user.create({
    data: { name, email, password: pass, image }
  });

  // Criação da UserRole associada
  await db.userRole.create({
    data: {
      user_id: user.id,
      role_id: params.role
    }
  });
}

export { createUser };