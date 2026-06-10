import { applications } from "@/lib/applications-store";
import { deleteApplication } from "@/lib/applications-store";
import { promises } from "dns";

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
