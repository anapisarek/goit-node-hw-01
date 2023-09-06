const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "UTF8");

    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();

    const filterContact = data.find(({ id }) => id === contactId);
    
    return filterContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const removedCoontact = await getContactById(contactId);

    const filterContact = data.filter(({ id }) => id != contactId);

    await fs.writeFile(contactsPath, JSON.stringify(filterContact), "UTF8");
    return removedCoontact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "UTF8");
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};