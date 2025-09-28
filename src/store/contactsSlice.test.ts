import { Contact, ContactType } from "@/types/contact";
import contactsReducer, { addContact, deleteContact, updateContact } from './contactsSlice';
import { describe } from "node:test";
import { __resetCounter } from '../../__mocks__/uuid';

const initialState = {
    contactList: [
        { id: '1', type: ContactType.Phone, value: '111', description: 'desc1' },
        { id: '2', type: ContactType.Phone, value: '222', description: 'desc2' },
    ],
};

describe('contactsSlice reducers', () => {
    beforeEach(() => {
        __resetCounter();
    });

    it('should handle addContact', () => {
        const newContactPayload = { type: ContactType.Telegram, value: '333', description: 'desc3' };
        
        const newState = contactsReducer(initialState, addContact(newContactPayload));

        expect(newState.contactList.length).toBe(3);
        expect(newState.contactList[0]).toEqual({
            id: 'mock-uuid-1',
            ...newContactPayload,
        });
    });

    it('should handle deleteContact', () => {
        const contactIdToDelete = '1';
        
        const newState = contactsReducer(initialState, deleteContact(contactIdToDelete));
        
        expect(newState.contactList.length).toBe(1);
        expect(newState.contactList.find(contact => contact.id === contactIdToDelete)).toBeUndefined();
    });

    it('should handle updateContact', () => {
        const updatedContact: Contact = { 
        id: '2',
        type: ContactType.Email, 
        value: 'new-email@test.com',
        description: 'new description'
        };

        const newState = contactsReducer(initialState, updateContact(updatedContact));
        
        const editedContact = newState.contactList.find(contact => contact.id === '2');

        expect(newState.contactList.length).toBe(2);
        expect(editedContact?.value).toBe('new-email@test.com');
        expect(editedContact?.description).toBe('new description');
    });
})