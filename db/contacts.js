import fs from 'fs/promises';
import path from 'path';

const contactPath = path.resolve("db", "contacts.json");

async function updateContacts(contacts){
    fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return;
}


export async function listContacts() {
    const result = await fs.readFile(contactPath);
    return JSON.parse(result);
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const response = contacts.find((contact) => contact.id === contactId);
    return response || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;

    const response = contacts.splice(index, 1);
    await updateContacts(contacts);
    return response;
}
  
export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const id = Math.random().toString(36).substr(2, 9);

    const newContact = {
        id,
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}