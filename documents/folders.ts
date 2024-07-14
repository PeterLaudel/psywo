export class Folders {
  static folder_: GoogleAppsScript.Drive.Folder | null = null;

  static folder() {
    if (Folders.folder_ === null) {
      Folders.folder_ = createFolder();
    }

    return Folders.folder_;
  }
}

function createFolder() {
  const folderName = "Rechnungen";
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) return folders.next();

  return DriveApp.createFolder(folderName);
}
