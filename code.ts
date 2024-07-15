import { createView as createFormView } from "./views/forms";
import { createView } from "./views/patients";

function createEnvironment() {
  createFormView();
  createView();
}
