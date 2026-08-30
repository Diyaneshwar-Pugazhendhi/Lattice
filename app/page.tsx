import Link from "next/link";
import { Button } from "@/components/Button";
import { ArrowRight, Layers, Shield, Zap, Users, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-lg">TaskFlow</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Get Started <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-3.5 w-3.5" /> Real-time collaboration
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Task management,{" "}
            <span className="text-primary">reimagined</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            A collaborative task board with real-time updates, authentication, and a
            beautiful UI. Built with Next.js 15, TypeScript, and Socket.io.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start for free <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/board">View demo board</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest font-medium">
            Built with
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            {[
              "Next.js 15",
              "TypeScript",
              "Prisma ORM",
              "Socket.io",
              "Auth.js",
              "Tailwind CSS",
              "Docker",
            ].map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-md bg-secondary">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Layers className="h-6 w-6" />,
                title: "Kanban Board",
                description:
                  "Drag-and-drop tasks between columns. Organize your workflow visually with To Do, In Progress, and Done columns.",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Real-time Updates",
                description:
                  "See changes from your team instantly. Socket.io powers live collaboration so everyone's always in sync.",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Secure Authentication",
                description:
                  "Auth.js (NextAuth v5) with Google OAuth and credentials. JWT sessions, protected routes, and secure passwords.",
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Team Collaboration",
                description:
                  "Assign tasks to team members. See who created what and track progress across your entire team.",
              },
              {
                icon: <CheckCircle className="h-6 w-6" />,
                title: "Priority Tracking",
                description:
                  "Set task priority levels (low, medium, high). Filter and focus on what matters most.",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Modern Stack",
                description:
                  "Next.js 15 App Router, Server Actions, TypeScript end-to-end, and a beautiful Tailwind UI.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border bg-card text-card-foreground hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to level up your workflow?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of teams using TaskFlow to organize their work and
            collaborate in real-time.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Create your free account <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            Built with ❤️ by{" "}
            <span className="font-medium text-foreground">
              Diyaneshwar-Pugazhendhi
            </span>
          </p>
          <p>MIT License · 2026</p>
        </div>
      </footer>
    </div>
  );
}