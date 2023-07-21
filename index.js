import yargs from 'yargs';
import contacts from './contacts.js';

const { argv } = yargs(process.argv.slice(2))
  .command('list', 'List all contacts')
  .command('get', 'Get a contact by ID', {
    id: {
      demandOption: true,
      describe: 'Contact ID',
      type: 'string',
    },
  })
  .command('add', 'Add a new contact', {
    name: {
      demandOption: true,
      describe: 'Contact name',
      type: 'string',
    },
    email: {
      demandOption: true,
      describe: 'Contact email',
      type: 'string',
    },
    phone: {
      demandOption: true,
      describe: 'Contact phone',
      type: 'string',
    },
  })
  .command('remove', 'Remove a contact by ID', {
    id: {
      demandOption: true,
      describe: 'Contact ID',
      type: 'string',
    },
  })
  .demandCommand(1)
  .help(false)
  .version(false)
  .alias('h', 'help')
  .alias('v', 'version')
  .strict();

async function invokeAction({ _: [action], ...args }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contactById = await contacts.getContactById(args.id);
      console.log('Contact by ID:', contactById);
      break;

    case 'add':
      const newContact = await contacts.addContact(args.name, args.email, args.phone);
      console.log('New contact added:', newContact);
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(args.id);
      console.log('Removed contact:', removedContact);
      break;

    default:
      console.error('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
