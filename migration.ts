import Migration0001 from "./migration/0001_administration_spreadsheet";
import Migration0002 from "./migration/0002_patients_sheet";
import Migration0003 from "./migration/0003_prices_sheet";

interface Migration {
  up(): void;
}

function run() {
  migrate(new Migration0001());
  migrate(new Migration0002());
  migrate(new Migration0003());
}

function migrate(migration: Migration) {
  const version = currentVersion();
  const newVersion = determineVersion(migration);

  if (version >= newVersion) {
    return;
  }

  migration.up();
  ScriptProperties.setProperty("MIGRATION_VERSION", newVersion.toString());
}

function determineVersion(migration: Migration) {
  const name = migration.constructor.name;
  let numberString = name.replace("Migration", ""); // Ergebnis: "0001"
  let number = parseInt(numberString, 10);
  return number;
}

function currentVersion() {
  const currentVersion = PropertiesService.getUserProperties().getProperty(
    "MIGRATION_VERSION"
  );
  return currentVersion === null ? 0 : parseInt(currentVersion, 10);
}
