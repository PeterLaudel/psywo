import { Patient } from "./patient";

export class Position {
  description: string;
  amount: number;
  price: number;
}

export class Invoice {
  creationDate: Date;
  patient: Patient;
  positions: Position[];
  link: string;
}
