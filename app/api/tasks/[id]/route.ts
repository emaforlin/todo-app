import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  await prisma.task.delete({
    where: { id: parseInt(id) },
  });

  return new NextResponse(JSON.stringify({ message: "Task deleted" }), {
    status: 200,
  });
}
