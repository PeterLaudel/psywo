import { Invoice } from "./invoice";
import { Patient } from "./patient";

export interface Therapy {
  id: string;
  title: string;
  patient: Patient;
  invoice?: Invoice;
}
