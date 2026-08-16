"use client";
import { Application } from "@/types/application";
import { ApplicationListProps } from "@/types/applicationListProps";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function ApplicationList({
  applications,
  applicationToDelete,
  onAdvanceStatus,
  selectedStatus,
  searchTerm,
}: ApplicationListProps) {
  function getStatusVariant(status: Application["status"]) {
    switch (status) {
      case "Applied":
        return "secondary";
      case "Interview":
        return "default";
      case "Technical Interview":
        return "outline";
      case "Offer":
        return "default";
      case "Rejected":
        return "destructive";
      default:
        return "secondary";
    }
  }

  if (applications.length === 0) {
    if (searchTerm === "") {
      return (
        <div>
          <h2>Candidaturas</h2>

          <p>
            {selectedStatus === "All"
              ? "Ainda não tens candidaturas."
              : `Não existem candidaturas no estado "${selectedStatus}".`}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Candidaturas</h2>

          <p>Nenhuma candidatura encontrada para "{searchTerm}".</p>
        </div>
      );
    }
  }

  return (
    <div>
      <h2 className="mb-4">Candidaturas</h2>
      <div className="space-y-4">
        {applications.map((application) => (
          <div
            className="space-y-2 rounded-lg border p-4 "
            key={application.id}
          >
            <div className="space-y-3 ">
              <div>
                <h3 className="text-lg font-semibold">{application.company}</h3>

                <p className="text-sm text-muted-foreground">
                  {application.role}
                </p>
              </div>

              {application.notes && (
                <p className="text-sm">{application.notes}</p>
              )}

              <Badge variant={getStatusVariant(application.status)}>
                {application.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                disabled={application.status === "Rejected"}
                onClick={() => onAdvanceStatus(application.id)}
              >
                {application.status === "Rejected"
                  ? "Estado final"
                  : "Avançar estado"}
              </Button>

              <Button
                variant="destructive"
                onClick={() => applicationToDelete(application.id)}
              >
                Apagar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
