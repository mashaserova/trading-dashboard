import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, ContactsState, ContactType } from '@/types/contact';
import { v4 as uuidv4 } from 'uuid';

const initialState: ContactsState = {
    contactList: [
        {
            id: uuidv4(),
            type: ContactType.Phone,
            value: '+7 (999) 123-45-67',
            description: 'Рабочий',
        },
        {
            id: uuidv4(),
            type: ContactType.Email,
            value: 'test@example.com',
            description: 'Личная почта',
        },
    ],
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
            const newContact = {
                id: uuidv4(),
                ...action.payload,
            };
            state.contactList.unshift(newContact);
        },
        updateContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contactList.findIndex(
                (contact) => contact.id === action.payload.id
            );
            if (index !== -1) {
                state.contactList[index] = action.payload;
            };
        },
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contactList = state.contactList.filter(
                (contact) => contact.id !== action.payload
            );
        },
    }
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;