import Migration0001 from "./migration/0001_administration_spreadsheet";
import Migration0002 from "./migration/0002_patients_sheet";
import Migration0003 from "./migration/0003_prices_sheet";

interface Migration {
  up(): void;
}

function fun(some: Migration) {
  const name = some.constructor.name;
  console.log(`Migrating ${name}`);
  some.up();
}

function test() {
  fun(new Migration0001());
}
