import { Container, Row, Col, Modal, Alert } from "react-bootstrap";
import Head from "next/head";
import { useState } from "react";
import { Account } from "@/types/account";
import { mockAccounts } from "@/data/mockAccounts";

import AccountCard from "@/components/features/AccountCards";
import AddAccountCard from "@/components/features/AccountCards/AddAccountCard";


export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleAddAccountClick = () => {
    const activeAccountsCount = accounts.filter(acc => {
      return acc.type === 'StandardTradingAccount' && acc.active;
    }).length;
    if (activeAccountsCount >= 5) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
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
        {/* уведомление при попытке добавить 6-й счет */}
        {showAlert && (
          <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            Добавлять новый счет можно только при количестве активных счетов меньше 5
          </Alert>
        )}

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