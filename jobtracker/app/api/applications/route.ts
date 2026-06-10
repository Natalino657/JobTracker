let applications: any[] = [];

export async function GET() {
  return Response.json(applications);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newAplication = {
    id: crypto.randomUUID(),
    ...body,
  };

  applications.push(newAplication);

  return Response.json(newAplication, {
    status: 201,
  });
}
