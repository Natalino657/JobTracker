"use client";
import Image from "next/image";
import ApplicationForm from "@/components/ApplicationForm";
import ApplicationList from "@/components/ApplicationList";
import { Application } from "@/types/application";
import { useEffect, useState } from "react";

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);

  const statusOrder = [
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

  const handleAdvenceStatus = (applicationId: string) => {
    const updatedApplications = applications.map((application) => {
      if (application.id !== applicationId) {
        return application;
      }
      const currentIndex = statusOrder.findIndex(
        (status) => status === application.status,
      );

      if (currentIndex === statusOrder.length - 1) {
        return application;
      }

      const nextStatus = statusOrder[currentIndex + 1];

      return {
        ...application,
        status: nextStatus,
      };
    });
    setApplications(updatedApplications);
  };
  console.log(applications);
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">job Tracker</h1>
      <ApplicationForm onApplicationCreated={handleApplicationCreated} />
      <ApplicationList
        applications={applications}
        applicationToDelete={handleDeleteApplication}
        onAdvanceStatus={handleAdvenceStatus}
      />
    </main>
  );
}
