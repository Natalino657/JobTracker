"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { ApplicationFormProps } from "@/types/onApplicationFormProps";

export default function ApplicationForm({
  onApplicationCreated,
}: ApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cleanForm = () => {
    setCompany("");
    setRole("");
    setNotes("");
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      //await sleep(1000);

      //console.log(company, role, notes);

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          company,
          role,
          notes,
          status: "Applied",
        }),
      });
      if (!response.ok) {
        console.log("erro ao criar Candidatura");
        return;
      }

      const data = await response.json();

      console.log(data);
      onApplicationCreated(data);
      cleanForm();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <h1>Nova candidatura</h1>

        <Field>
          <FieldLabel htmlFor="fieldgroup-companyName">Empresa</FieldLabel>
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            id="fieldgroup-companyName"
            placeholder="Nome da empresa"
          ></Input>
        </Field>

        <Field>
          <FieldLabel htmlFor="fieldgroup-cargo">Cargo</FieldLabel>
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            id="fieldgroup-cargo"
            placeholder="Cargo a desempenhar"
          ></Input>
        </Field>

        <Field>
          <FieldLabel htmlFor="fieldgroup-cargo">Observações</FieldLabel>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observações"
          />
        </Field>

        <Field orientation="horizontal">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "A aguardar..." : "Guardar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
