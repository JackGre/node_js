const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contatsOperations = require("./contacts");



const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await contatsOperations.listContacts();
            console.table(contacts);
            break;
        case "get":
            const contact = await contatsOperations.getContactById(id);
            if (!contact) {
                throw new Error(`Contact with id=${id} not found`);
            }
            console.log(contact);
            break;
        case "add":
            const newContact = await contatsOperations.addContact(name, email, phone);
            console.log(newContact);
            break;
        case "remove":
            const removeContact = await contatsOperations.removeContact(id);
            console.log(removeContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

const arr = hideBin(process.argv)
const { argv } = yargs(arr);

invokeAction(argv);





