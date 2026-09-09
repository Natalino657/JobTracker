import { applicationStatsprops } from "@/types/applicationStatsprops";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ApplicationStats({
  applications,
}: applicationStatsprops) {
  const interviewApplications = applications.filter(
    (application) => application.status === "Interview",
  ).length;

  const technicalInterviewApplications = applications.filter(
    (application) => application.status === "Technical Interview",
  ).length;

  const offerApplications = applications.filter(
    (application) => application.status === "Offer",
  ).length;

  const rejectedApplications = applications.filter(
    (application) => application.status === "Rejected",
  ).length;

  const stats = [
    {
      title: "Total",
      description: "Total de candidaturas",
      value: applications.length,
    },
    {
      title: "Entrevistas",
      description: "Candidaturas em entrevista",
      value: interviewApplications,
    },
    {
      title: "Entrevistas técnicas",
      description: "Candidaturas em entrevista técnica",
      value: technicalInterviewApplications,
    },
    {
      title: "Propostas",
      description: "Propostas recebidas",
      value: offerApplications,
    },
    {
      title: "Rejeitadas",
      description: "Candidaturas rejeitadas",
      value: rejectedApplications,
    },
  ];

  return (
    <div className="flex flex-row gap-1 ">
      {stats.map((stat) => (
        <Card key={stat.title} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{stat.title}</CardTitle>
            <CardDescription>{stat.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{stat.value}</p>
          </CardContent>
        </Card>
      ))}
      {/* <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Total</CardTitle>
          <CardDescription>entrevistas</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{applications.length}</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>entrevistas</CardTitle>
          <CardDescription>entrevistas feitas</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{interviewApplications}</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>entrevistas tecnicas</CardTitle>
          <CardDescription>entrevistas feitas</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{technicalInterviewApplications}</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Propostas</CardTitle>
          <CardDescription>entrevistas feitas</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{offerApplications}</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Rejeitadas</CardTitle>
          <CardDescription>entrevistas feitas</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{rejectedApplications}</p>
        </CardContent>
      </Card> */}
    </div>
  );
}
