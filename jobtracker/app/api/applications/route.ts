import { applications } from "@/lib/applications-store";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const applications = await prisma.application.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return Response.json(applications);
}

export async function POST(request: Request) {
  const body = await request.json();

  //console.log("inside POST log", body);

  const newApplication = await prisma.application.create({
    data: body,
  });

  return Response.json(newApplication, {
    status: 201,
  });
}
