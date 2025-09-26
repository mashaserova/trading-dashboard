import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ContactList from "../components/organisms/ContactList/index";
import { Container, Button } from "react-bootstrap";
import Head from "next/head";
import { deleteContact } from "@/store/contactsSlice";

export default function HomePage() {
  const contactList = useSelector((state: RootState) => state.contacts.contactList);
  const dispatch = useDispatch();

  const handleDeleteContact = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот контакт?")) {
      dispatch(deleteContact(id));
    };
  };

  return (
    <>
      <Head>
        <title>Контактная книжка</title>
      </Head>
      <Container className="py-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <h1>Контактная книжка</h1>
          <Button variant="primary">Добавить контакт</Button>
        </header>

        <main>
          {/* Передаем наш список контактов в компонент для отображения */}
          <ContactList
            contacts={contactList}
            onDelete={handleDeleteContact}
          />
        </main>
      </Container>
    </>
  );
}