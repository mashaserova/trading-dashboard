export enum ContactType {
    Phone = 'Телефон',
    Email = 'Email',
    Telegram = 'Telegram',
    Website = 'Сайт',
}

export interface Contact {
    id: string;
    type: ContactType;
    value: string;
    description: string;
}

export interface ContactsState {
    contactList: Contact[];
}