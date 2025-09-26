import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ContactList from "../components/organisms/ContactList/index";
import { Container, Button, Offcanvas, Alert } from "react-bootstrap";
import Head from "next/head";
import { addContact, deleteContact } from "@/store/contactsSlice";
import ContactForm from "@/components/organisms/ContactForm"
import { Contact } from "@/types/contact";
import { updateContact } from "@/store/contactsSlice";

export default function HomePage() {
  const contactList = useSelector((state: RootState) => state.contacts.contactList);
  const dispatch = useDispatch();

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
    setContactToEdit(null);
  };

  const handleAddContact = (data: Omit<Contact, 'id'>) => {
    dispatch(addContact(data));
    setShowAlert(true);
    setTimeout(() => {
      handleCloseOffcanvas();
      setShowAlert(false);
    }, 2000);
  };

  
  const handleDeleteContact = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот контакт?")) {
      dispatch(deleteContact(id));
    };
  };

  const handleEditContact = (contact: Contact) => {
    setContactToEdit(contact);
    handleShowOffcanvas();
  }
  
  const handleSaveContact = (data: Omit<Contact, 'id'>) => {
    if (contactToEdit) {
      dispatch(updateContact({ ...data, id: contactToEdit.id }));
    } else {
      dispatch(addContact(data));
    }
    setShowAlert(true);
    setTimeout(() => {
      handleCloseOffcanvas();
      setShowAlert(false);
    }, 2000)
  }

  return (
    <>
      <Head>
        <title>Контактная книжка</title>
      </Head>
      <Container className="py-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1>Контактная книжка</h1>
          <Button variant="primary" onClick={handleShowOffcanvas}>Добавить контакт</Button>
        </header>

        <main>
          {/* Передаем наш список контактов в компонент для отображения */}
          <ContactList
            contacts={contactList}
            onDelete={handleDeleteContact}
            onEdit={handleEditContact}
          />
        </main>
      </Container>

      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{contactToEdit ? 'Редактировать контакт': 'Новый контакт'}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {showAlert && (
            <Alert variant="success">
              Контакт успешно сохранен!
            </Alert>
          )}

          <ContactForm
            onSubmit={handleAddContact}
            editingContact={contactToEdit}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}