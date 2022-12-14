const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(it => it.id === contactId);
  return result || null;
};

const removeCont = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(it => it.id === contactId);
  if (index === -1) {
    return null
  };
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts)
  return result
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newBook = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newBook);
  await updateContacts(contacts)
  return newBook;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeCont
};