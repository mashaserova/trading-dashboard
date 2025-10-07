import { Container, Row, Col, Modal } from "react-bootstrap";
import Head from "next/head";
import { useState } from "react";
import { Account } from "@/types/account";
import { mockAccounts } from "@/data/mockAccounts";

import AccountCard from "@/components/features/AccountCards";
import AddAccountCard from "@/components/features/AccountCards/AddAccountCard";


export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts); //setAccounts для дальнейшего расширения приложения

  const [showModal, setShowModal] = useState(false);
  const handleAddAccountClick = () => {
    const activeAccountsCount = accounts.filter(acc => {
      return acc.type === 'StandardTradingAccount' && acc.active;
    }).length;
    if (activeAccountsCount >= 5) {
      alert('Дoбавлять новый счет можно только при количестве активных счетов меньше 5');
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <Head>
        <title>Trading Dashboard</title>
      </Head>
      <Container className="py-4">
        <h1>DASHBOARD</h1>
        
        <Row className="gy-4 mt-2">
          {accounts.map(account => (
            <Col key={account.id} lg={4} md={6} xs={12}>
              <AccountCard account={account} />
            </Col>
          ))}

          <Col lg={4} md={6} xs={12} onClick={handleAddAccountClick} style={{ cursor: 'pointer' }}>
            <AddAccountCard />
          </Col>
        </Row>

        {/* модалка для добавления счета */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Создание нового счёта</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Здесь могла бы быть форма для создания счета...
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}