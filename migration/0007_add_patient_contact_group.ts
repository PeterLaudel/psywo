export default class Migration0007 {
  up() {
    const contactGroup = People.ContactGroups.create({
      contactGroup: {
        name: "Patienten",
      },
    });

    PropertiesService.getUserProperties().setProperty(
      "PATIENT_CONTACT_GROUP_ID",
      contactGroup.resourceName
    );
  }
}
