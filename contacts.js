
const path = require("path");
const fs = require("fs/promises");
const contactsPath = path.join("./db/contacts.json");
const { v4 } = require("uuid");

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
 };

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if (!result) {
        return null;
    }
    return result;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;

};


const removeContact = async (contactId) => {
  const contacts = await listContacts()

    const idx = contacts.findIndex(item => item.id === contactId)
    if (idx === -1) {
        return null;
    }
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContact;
};



module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}
