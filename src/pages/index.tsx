import { Container, Row, Col, Modal, Alert } from "react-bootstrap";
import Head from "next/head";
import { useState } from "react";
import { Account } from "@/types/account";
import { mockAccounts } from "@/data/mockAccounts";

import AccountCard from "@/components/features/AccountCards";


export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);

  return (
    <>
      <Head>
        <title>Trading Dashboard</title>
      </Head>
      <Container className="py-4">
        <h1>DASHBOARD</h1>
        <div>
          {accounts.map(account => (
            <div key={account.id}>
              ID: {account.id}, Type: {account.type}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}