import { Sheets } from "./documents/sheets";
import { Calenders } from "./documents/calenders";

function createEnvironment() {
  Sheets.sheet();
  Calenders.calendar();
}
