import { applications } from "@/lib/applications-store";

export async function GET() {
  return Response.json(applications);
}

export async function POST(request: Request) {
  const body = await request.json();

  console.log("inside POST log", body);

  const newApplication = {
    id: crypto.randomUUID(),
    ...body,
  };

  applications.push(newApplication);

  return Response.json(newApplication, {
    status: 201,
  });
}
