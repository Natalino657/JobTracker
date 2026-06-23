import { ApplicationStatus } from "@/types/application";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await context.params;

  await prisma.application.delete({
    where: {
      id,
    },
  });

  return Response.json({ message: "Application deleted" });
}

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await context.params;
  const body = (await request.json()) as { status: ApplicationStatus };

  const updatedApplication = await prisma.application.update({
    where: { id },
    data: { status: body.status },
  });

  return Response.json(updatedApplication);
}
