import { applicationStatsprops } from "@/types/applicationStatsprops";

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
  return (
    <div>
      <p> Total:{applications.length}</p>
      <p> entrevistas:{interviewApplications}</p>
      <p> entrevistas tecnicas:{technicalInterviewApplications}</p>
      <p> Propostas:{offerApplications}</p>
      <p> Rejeitadas:{rejectedApplications}</p>
    </div>
  );
}
