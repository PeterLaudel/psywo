export class Folders {
  static invoices = createFolder();
}

function createFolder() {
  const folderName = "Rechnungen";
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) return folders.next();

  return DriveApp.createFolder(folderName);
}
