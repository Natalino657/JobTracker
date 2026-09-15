"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { ApplicationFormProps } from "@/types/onApplicationFormProps";
import { toast } from "react-toastify";

export default function ApplicationForm({
  onApplicationCreated,
}: ApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    company: "",
    role: "",
  });

  const cleanForm = () => {
    setCompany("");
    setRole("");
    setNotes("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const companyIsEmpty = !company.trim();
    const roleIsEmpty = !role.trim();
    if (companyIsEmpty || roleIsEmpty) {
      setErrors({
        company: companyIsEmpty ? "O nome da empresa é obrigatório." : "",
        role: roleIsEmpty ? "O cargo da empresa é obrigatório." : "",
      });
      return;
    }

    setErrors({
      company: "",
      role: "",
    });

    try {
      setIsSubmitting(true);

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
        toast.error("Erro ao criar candidatura");
        return;
      }

      const data = await response.json();

      console.log(data);
      onApplicationCreated(data);
      cleanForm();
      toast.success("Candidatura criada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="mt-10 mb-7">
        <h1>Nova candidatura</h1>

        <Field>
          <FieldLabel htmlFor="fieldgroup-companyName">Empresa</FieldLabel>
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            id="fieldgroup-companyName"
            placeholder="Nome da empresa*"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
          ></Input>
          {errors.company && (
            <p
              id="company-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.company}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="fieldgroup-cargo">Cargo</FieldLabel>
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            id="fieldgroup-cargo"
            placeholder="Cargo a desempenhar*"
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
          ></Input>
          {errors.role && (
            <p
              id="role-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.role}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="fieldgroup-notes">Observações</FieldLabel>
          <Textarea
            id="fieldgroup-notes"
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
