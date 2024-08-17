import { Invoice } from "./invoice";

export interface Therapy {
  id: string;
  title: string;
  patientEmail: string;
  invoice?: Invoice;
}
