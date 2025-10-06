import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  const { name, email, password } = await request.json();
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword }
  });
  
  return Response.json({ user: { id: user.id, name: user.name, email: user.email } });
}

