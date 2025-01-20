import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();

  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req: Request) {
  const { name, email } = await req.json();

  const newTask = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return new Response(JSON.stringify(newTask), { status: 201 });
}
