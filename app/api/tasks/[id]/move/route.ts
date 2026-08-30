import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getPrisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { moveTaskSchema } from "@/lib/zod";

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
    const validated = moveTaskSchema.parse(body);
    const prisma = getPrisma();

    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        column: validated.column,
        columnId: validated.column,
        orderIndex: validated.orderIndex,
      },
      include: {
        author: { select: { id: true, name: true, email: true, image: true } },
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Failed to move task:", error);
    return NextResponse.json(
      { error: "Failed to move task" },
      { status: 500 }
    );
  }
}