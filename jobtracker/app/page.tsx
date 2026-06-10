"use client";
import Image from "next/image";
import ApplicationForm from "@/components/ApplicationForm";
import ApplicationList from "@/components/ApplicationList";
import { Application } from "@/types/application";
import { useEffect, useState } from "react";

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);

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

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">job Tracker</h1>
      <ApplicationForm onApplicationCreated={handleApplicationCreated} />
      <ApplicationList applications={applications} />
    </main>
  );
}
