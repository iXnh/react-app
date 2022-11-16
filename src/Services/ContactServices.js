import axios from 'axios';

export class ContactService {
    static serverURL = `http://localhost:5000`;
    
    static async getAllContacts() {
        const dataURL = `${this.serverURL}/contacts`;
        return axios.get(dataURL);
    }
    
    static getContact(contactId){
        const dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.get(dataURL);
    }

    static getGroups(){
        const dataURL = `${this.serverURL}/groups`;
        return axios.get(dataURL);
    }

    static getGroup(contact){
        const groupId = contact.groupId;
        const dataURL = `${this.serverURL}/groups/${groupId}`;
        return axios.get(dataURL);
    }

    static createContact(contact){
        const dataURL = `${this.serverURL}/contacts`;
        return axios.post(dataURL, contact);
    }

    static deleteContact(contactId){
        const dataURL = `${this.serverURL}/contacts/${contactId}`;
        return axios.delete(dataURL);
    }

}