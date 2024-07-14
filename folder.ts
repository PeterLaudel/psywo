export class InvoiceFolder {
  static folder_: GoogleAppsScript.Drive.Folder | null = null;

  static folder() {
    if (InvoiceFolder.folder_ === null) {
      InvoiceFolder.folder_ = createFolder();
    }

    return InvoiceFolder.folder_;
  }
}

function createFolder() {
  const folderName = "Rechnungen";
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) return folders.next();

  return DriveApp.createFolder(folderName);
}
