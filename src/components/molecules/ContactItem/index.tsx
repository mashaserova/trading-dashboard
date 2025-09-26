import { Contact } from "@/types/contact";
import { FC } from "react";
import { ListGroup, Button, Stack } from "react-bootstrap";

interface ContactItemProps {
    contact: Contact;
    onDelete: (id: string) => void;
}

const ContactItem: FC<ContactItemProps> = ({ contact, onDelete }) => {
    return (
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{contact.value}</div>
                {contact.description}
            </div>
            <Stack direction="horizontal" gap={2}>
                <Button variant="outline-primary" size="sm">
                    Редактировать
                </Button>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(contact.id)}
                >
                    Удалить
                </Button>
            </Stack>
        </ListGroup.Item>
    );
};

export default ContactItem;