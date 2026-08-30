import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getPrisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createTaskSchema } from "@/lib/zod";

export async function GET() {
  try {
    const prisma = getPrisma();
    const tasks = await prisma.task.findMany({
      orderBy: { orderIndex: "asc" },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
        assignee: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = createTaskSchema.parse(body);
    const prisma = getPrisma();

    const task = await prisma.task.create({
      data: {
        ...validated,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Failed to create task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}