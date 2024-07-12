import { PatientSheet } from "./sheet";
import { TherapyCalender } from "./calender";

function createEnvironment() {
  PatientSheet.sheet();
  TherapyCalender.calendar();
}

// function createInvoice() {
//   const template = SpreadsheetApp.openById(
//     "1pnAu7waOR2fWg8Bph9z-pZETlkyZEHsIYXqDTYZMxXI"
//   );

//   const newSpreadsheet = template.copy("Rechnung 1");
//   const sheet = newSpreadsheet.getActiveSheet();

//   sheet.getRange("B3:D3").setValue("Mein Unternehmen");
//   sheet.getRange("B4:D4").setValue("Straße");
//   sheet.getRange("B5:D5").setValue("PLZ Stadt");
//   sheet.getRange("B6:D6").setValue("Telefonnummer");

//   sheet
//     .getRange("B9:D9")
//     .setValue(`Rechnungsdatum ${new Date().toLocaleDateString()}`);

//   sheet.getRange("B12:C12").setValue("Name");
//   sheet.getRange("B13:C13").setValue("Straße");
//   sheet.getRange("B14:C14").setValue("PLZ Stadt");
//   sheet.getRange("B15:C15").clearContent();
// }
