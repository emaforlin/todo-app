import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
    });
  }
  console.log(req);

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new NextResponse(
      JSON.stringify({ message: "Please fill all fields" }),
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          message: "This emails has already an account associated",
        }),
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "USER" },
    });

    return new NextResponse(JSON.stringify({ message: "User created" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Something went wrong", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server Error" }),
      { status: 500 }
    );
  }
}
