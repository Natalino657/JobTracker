"use client";
import { Application } from "@/types/application";
import { ApplicationListProps } from "@/types/applicationListProps";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function getStatusStyles(status: Application["status"]) {
  switch (status) {
    case "Applied":
      return "border-transparent bg-sky-500/15 text-sky-700 dark:text-sky-300";
    case "Interview":
      return "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300";
    case "Technical Interview":
      return "border-transparent bg-violet-500/15 text-violet-700 dark:text-violet-300";
    case "Offer":
      return "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300";
    case "Rejected":
      return "border-transparent bg-destructive/15 text-destructive";
    default:
      return "";
  }
}

export default function ApplicationList({
  applications,
  applicationToDelete,
  onAdvanceStatus,
  selectedStatus,
  searchTerm,
  deletingApplicationId,
}: ApplicationListProps) {
  if (applications.length === 0) {
    const emptyMessage = !searchTerm
      ? selectedStatus === "All"
        ? "Ainda não tens candidaturas."
        : `Não existem candidaturas no estado "${selectedStatus}".`
      : `Nenhuma candidatura encontrada para "${searchTerm}".`;

    return (
      <div className="rounded-xl border border-dashed border-border/80 bg-card/40 px-6 py-12 text-center">
        <h2 className="mb-2 text-lg font-medium">Candidaturas</h2>
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Candidaturas</h2>
      <div className="space-y-3">
        {applications.map((application) => (
          <article
            className="rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-colors hover:ring-foreground/20"
            key={application.id}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {application.company}
                  </h3>
                  <Badge
                    className={cn(getStatusStyles(application.status))}
                    variant="outline"
                  >
                    {application.status}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {application.role}
                </p>

                {application.notes && (
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {application.notes}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <Button
                  size="sm"
                  disabled={application.status === "Rejected"}
                  onClick={() => onAdvanceStatus(application.id)}
                >
                  {application.status === "Rejected"
                    ? "Estado final"
                    : "Avançar estado"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger
                    render={
                      <Button size="sm" variant="destructive">
                        Apagar
                      </Button>
                    }
                  />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Apagar candidatura?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tens a certeza de que pretendes apagar a candidatura{" "}
                        {application.company}? Esta ação não pode ser anulada.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={deletingApplicationId === application.id}
                        onClick={() => applicationToDelete(application.id)}
                      >
                        {deletingApplicationId === application.id
                          ? "A apagar..."
                          : "Apagar"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
