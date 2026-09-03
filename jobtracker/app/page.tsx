"use client";

import ApplicationForm from "@/components/ApplicationForm";
import ApplicationList from "@/components/ApplicationList";
import { Application } from "@/types/application";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Searchbar from "@/components/Searchbar";
import { Sort } from "@/types/sortType";
import { SortSelector } from "@/components/SortSelector";

function sortApplications(applications: Application[], SortOption: Sort) {
  const sorted = [...applications];

  switch (SortOption) {
    case "Mais recentes":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "Mais antigas":
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    case "Empresa A-Z":
      return sorted.sort((a, b) =>
        a.company.toLowerCase().localeCompare(b.company.toLowerCase()),
      );
    case "Empresa Z-A":
      return sorted.sort((a, b) =>
        b.company.toLowerCase().localeCompare(a.company.toLowerCase()),
      );
    case "Cargo A-Z":
      return sorted.sort((a, b) =>
        a.role.toLowerCase().localeCompare(b.role.toLowerCase()),
      );
    case "Cargo Z-A":
      return sorted.sort((a, b) =>
        a.role.toLowerCase().localeCompare(b.role.toLowerCase()),
      );
  }
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<
    "All" | Application["status"]
  >("All");
  const [sortOption, setSortOption] = useState<Sort>("Mais recentes");

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

  const orderOptions = [
    "Mais recentes",
    "Mais antigas",
    "Empresa A-Z",
    "Empresa Z-A",
    "Cargo A-Z",
    "Cargo Z-A",
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

  const onSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // const filteredApplications =
  //   selectedStatus === "All"
  //     ? applications
  //     : applications.filter(
  //         (application) => application.status === selectedStatus,
  //       );

  const normalizedSearch = searchTerm.toLocaleLowerCase();

  const filteredApplications = applications.filter((application) => {
    const matchesStatus =
      selectedStatus === "All" || application.status === selectedStatus;

    const matchesSearch =
      application.company.toLowerCase().includes(normalizedSearch) ||
      application.role.toLowerCase().includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });

  const sortedApplications = sortApplications(filteredApplications, sortOption);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Job Tracker</h1>
      <Searchbar onSearchChange={onSearchChange} />
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

      <SortSelector
        sortOption={sortOption}
        onSortChange={setSortOption}
        options={orderOptions}
      />

      <p className="text-sm text-muted-foreground mb-4">
        {filteredApplications.length} candidatura(s) encontrada(s)
      </p>
      <ApplicationList
        applications={sortedApplications}
        applicationToDelete={handleDeleteApplication}
        onAdvanceStatus={handleAdvanceStatus}
        selectedStatus={selectedStatus}
        searchTerm={searchTerm}
      />
    </main>
  );
}
