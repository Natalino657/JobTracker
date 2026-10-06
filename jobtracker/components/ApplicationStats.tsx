import { applicationStatsprops } from "@/types/applicationStatsprops";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ApplicationStats({
  applications,
}: applicationStatsprops) {
  const statusCounts = applications.reduce(
    (acc, application) => {
      if (application.status === "Interview") {
        acc.Interview += 1;
      } else if (application.status === "Offer") {
        acc.Offer += 1;
      } else if (application.status === "Technical Interview") {
        acc.TechnicalInterview += 1;
      } else if (application.status === "Rejected") {
        acc.Rejected += 1;
      }
      return acc;
    },
    {
      Interview: 0,
      TechnicalInterview: 0,
      Offer: 0,
      Rejected: 0,
    },
  );

  const stats = [
    {
      title: "Total",
      description: "Total de candidaturas",
      value: applications.length,
    },
    {
      title: "Entrevistas",
      description: "Candidaturas em entrevista",
      value: statusCounts.Interview,
    },
    {
      title: "Entrevistas técnicas",
      description: "Candidaturas em entrevista técnica",
      value: statusCounts.TechnicalInterview,
    },
    {
      title: "Propostas",
      description: "Propostas recebidas",
      value: statusCounts.Offer,
    },
    {
      title: "Rejeitadas",
      description: "Candidaturas rejeitadas",
      value: statusCounts.Rejected,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.title} size="sm" className="w-full">
          <CardHeader>
            <CardDescription>{stat.description}</CardDescription>
            <CardTitle className="text-sm text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight tabular-nums">
              {stat.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
