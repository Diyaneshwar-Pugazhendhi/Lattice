import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getPrisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { updateTaskSchema } from "@/lib/zod";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = updateTaskSchema.parse(body);
    const prisma = getPrisma();

    const task = await prisma.task.update({
      where: { id: params.id },
      data: validated,
      include: {
        author: { select: { id: true, name: true, email: true, image: true } },
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Failed to update task:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prisma = getPrisma();
    await prisma.task.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ id: params.id });
  } catch (error) {
    console.error("Failed to delete task:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}