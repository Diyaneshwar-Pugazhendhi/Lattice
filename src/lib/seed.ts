import { getPrisma } from "./prisma";
import { hashPassword } from "./bcrypt";

export async function seedDatabase() {
  const prisma = getPrisma();

  // Create a default admin user for testing
  const admin = await prisma.user.upsert({
    where: { email: "admin@taskboard.dev" },
    update: {},
    create: {
      email: "admin@taskboard.dev",
      name: "Admin User",
      password: await hashPassword("admin123"),
      emailVerified: new Date(),
    },
  });

  // Create sample tasks
  const tasks = [
    {
      title: "Welcome to TaskFlow! 🎉",
      description: "This is your first task. Drag and drop it to see how the board works.",
      status: "todo",
      priority: "high" as const,
      columnId: "todo",
      orderIndex: 0,
      authorId: admin.id,
    },
    {
      title: "Set up your profile",
      description: "Complete your profile to enable team collaboration.",
      status: "todo",
      priority: "medium" as const,
      columnId: "todo",
      orderIndex: 1,
      authorId: admin.id,
    },
    {
      title: "Create a team",
      description: "Invite team members to your workspace for real-time collaboration.",
      status: "in-progress",
      priority: "medium" as const,
      columnId: "in-progress",
      orderIndex: 0,
      authorId: admin.id,
    },
    {
      title: "Deploy to production",
      description: "Push your task board to production and share with your team.",
      status: "done",
      priority: "low" as const,
      columnId: "done",
      orderIndex: 0,
      authorId: admin.id,
    },
  ];

  for (const task of tasks) {
    await prisma.task.upsert({
      where: { id: `seed-${task.title}` },
      update: {},
      create: {
        id: `seed-${task.title}`,
        ...task,
      },
    });
  }

  console.log("Database seeded successfully!");
  console.log("Admin credentials: admin@taskboard.dev / admin123");
}