import { deleteApplication, updateApplication } from "@/lib/applications-store";
import { ApplicationStatus } from "@/types/application";

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  const { id } = await context.params;

  deleteApplication(id);

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

  updateApplication(id, body.status);

  return Response.json({ message: `Application updated : ${body.status}` });
}
