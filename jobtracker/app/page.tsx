"use client";

import ApplicationForm from "@/components/ApplicationForm";
import ApplicationList from "@/components/ApplicationList";
import { Application } from "@/types/application";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);

  const [selectedStatus, setSelectedStatus] = useState<
    "All" | Application["status"]
  >("All");

  const statusOrder = [
    "Applied",
    "Interview",
    "Technical Interview",
    "Offer",
    "Rejected",
  ] as const;

  const statusFilters = [
    "All",
    "Applied",
    "Interview",
    "Technical Interview",
    "Offer",
    "Rejected",
  ] as const;

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  const handleApplicationCreated = (newApplication: Application) => {
    setApplications((currentApplications) => [
      ...currentApplications,
      newApplication,
    ]);
  };

  const handleDeleteApplication = async (applicationId: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.log("Erro ao apagar candidatura");
        return;
      }

      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) => application.id !== applicationId,
        ),
      );
    } catch (error) {}
  };

  const handleAdvanceStatus = async (applicationId: string) => {
    const applicationToUpdate = applications.find(
      (application) => application.id === applicationId,
    );

    if (!applicationToUpdate) return;

    const currentIndex = statusOrder.findIndex(
      (status) => status === applicationToUpdate.status,
    );

    if (currentIndex === statusOrder.length - 1) {
      return;
    }

    const nextStatus = statusOrder[currentIndex + 1];

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: nextStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao tentar atualizar o estado${response.status}`);
      }

      console.log("Dados atualizados com sucesso:", await response.json());

      setApplications((currentApplications) =>
        currentApplications.map((application) => {
          if (application.id !== applicationId) {
            return application;
          }

          return {
            ...application,
            status: nextStatus,
          };
        }),
      );
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const filteredApplications =
    selectedStatus === "All"
      ? applications
      : applications.filter(
          (application) => application.status === selectedStatus,
        );

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">job Tracker</h1>
      <ApplicationForm onApplicationCreated={handleApplicationCreated} />

      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? "default" : "outline"}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </Button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {filteredApplications.length} candidatura(s) encontrada(s)
      </p>
      <ApplicationList
        applications={filteredApplications}
        applicationToDelete={handleDeleteApplication}
        onAdvanceStatus={handleAdvanceStatus}
      />
    </main>
  );
}
