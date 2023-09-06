const fs = require("fs").promises;
const path = require("path");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const list = await listContacts();
        console.table(list);
        break;

      case "get":
        const contact = await getContactById(id);
        console.table(contact);
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.table(newContact);
        break;

      case "remove":
        const removedContact = await removeContact(id);
        console.table(removedContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
}

invokeAction(argv);