import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ContactList from "../components/organisms/ContactList/index";
import { Container, Button, Offcanvas, Alert, Row, Col, Form } from "react-bootstrap";
import Head from "next/head";
import { addContact, deleteContact } from "@/store/contactsSlice";
import ContactForm from "@/components/organisms/ContactForm"
import { Contact, ContactType } from "@/types/contact";
import { updateContact } from "@/store/contactsSlice";

type FilterType = ContactType | 'all';
type SortType = 'newest' | 'oldest';

export default function HomePage() {
  const contactList = useSelector((state: RootState) => state.contacts.contactList);
  const dispatch = useDispatch();

  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
    setContactToEdit(null);
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

  const displayedContacts = useMemo(() => {
    let contacts = [...contactList];

    if (filter !== 'all') {
      contacts = contacts.filter(contact => contact.type === filter);
    }
    if (sort === 'oldest') {
      contacts.reverse();
    }
    return contacts;
  }, [contactList, filter, sort])

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

        {/* разметка для фильтров */}
        <Row className="mb-4 g-3">
          <Col md={6}>
            <Form.Group controlId="filterByType">
              <Form.Label>Фильтер по типу</Form.Label>
              <Form.Select value={filter} onChange={(e) => setFilter(e.target.value as FilterType)}>
                <option value="all">Все типы</option>
                {Object.values(ContactType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="sortByDate">
              <Form.Label>Сортировка</Form.Label>
              <Form.Select value={sort} onChange={(e) => setSort(e.target.value as SortType)}>
                <option value="newest">Сначала новые</option>
                <option value="oldest">Сначала старые</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <main>
          {/* Передаем наш список контактов в компонент для отображения */}
          <ContactList
            contacts={displayedContacts}
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
            onSubmit={handleSaveContact}
            editingContact={contactToEdit}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}