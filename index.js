import yargs from 'yargs';
import { listContacts, getContactById, removeContact, addContact } from './contacts.js';

const { argv } = yargs(process.argv.slice(2)).command(
  'list',
  'List all contacts',
  (yargs) => {},
  async () => {
    await invokeAction({ action: 'list' });
  }
).command(
  'get <id>',
  'Get a contact by ID',
  (yargs) => {
    yargs.positional('id', {
      describe: 'Contact ID',
      type: 'string',
    });
  },
  async (argv) => {
    await invokeAction({ action: 'get', id: argv.id });
  }
).command(
  'add <name> <email> <phone>',
  'Add a new contact',
  (yargs) => {
    yargs.positional('name', {
      describe: 'Contact name',
      type: 'string',
    });
    yargs.positional('email', {
      describe: 'Contact email',
      type: 'string',
    });
    yargs.positional('phone', {
      describe: 'Contact phone',
      type: 'string',
    });
  },
  async (argv) => {
    await invokeAction({
      action: 'add',
      name: argv.name,
      email: argv.email,
      phone: argv.phone,
    });
  }
).command(
  'remove <id>',
  'Remove a contact by ID',
  (yargs) => {
    yargs.positional('id', {
      describe: 'Contact ID',
      type: 'string',
    });
  },
  async (argv) => {
    await invokeAction({ action: 'remove', id: argv.id });
  }
).help().alias('h', 'help').alias('v', 'version').strict();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contactById = await getContactById(id);
      console.log('Contact by ID:', contactById);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log('New contact added:', newContact);
      break;

    case 'remove':
      const removedContact = await removeContact(id);
      console.log('Removed contact:', removedContact);
      break;

    default:
      console.error('\x1B[31m Unknown action type!');
  }
}
