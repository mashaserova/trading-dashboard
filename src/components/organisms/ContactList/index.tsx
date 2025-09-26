import { Contact } from "@/types/contact";
import { FC, useMemo } from "react";
import ContactItem from "@/components/molecules/ContactItem";
import { ListGroup } from "react-bootstrap";

interface ContactListProps {
    contacts: Contact[];
    onDelete: (id: string) => void;
    onEdit: (contact: Contact) => void;
}

const groupContacts = (contacts: Contact[]): Record<string, Contact[]> => {
    return contacts.reduce((acc, contact) => {
    const key = contact.type;
    if (!acc[key]) {
        acc[key] = [];
    }
    acc[key].push(contact);
    return acc;
    }, {} as Record<string, Contact[]>);
};

const ContactList: FC<ContactListProps> = ({ contacts, onDelete, onEdit }) => {
    const groupedContacts = useMemo(() => groupContacts(contacts), [contacts]);

    return (
    <>
        {Object.entries(groupedContacts).map(([type, contactGroup]) => (
        <div key={type} className="mb-4">
            <h3>{type}</h3>
            <ListGroup as="ul">
            {contactGroup.map((contact) => (
                <ContactItem
                    key={contact.id}
                    contact={contact}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
            </ListGroup>
        </div>
        ))}
    </>
    );
};

export default ContactList;