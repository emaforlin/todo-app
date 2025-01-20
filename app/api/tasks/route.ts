import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({
    include: {
      user: true,
    },
  });

  return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST(req: Request) {
  const { title, dueDate, userId } = await req.json();

  const newTask = await prisma.task.create({
    data: {
      title,
      dueDate: new Date(dueDate),
      userId: parseInt(userId),
    },
    include: {
      user: true,
    },
  });

  return new Response(JSON.stringify(newTask), { status: 201 });
}
