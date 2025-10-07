import { FC } from "react";
import { Card, Form } from "react-bootstrap";
import { StandardTradingAccount } from "../../../types/account";
import { SlGraph } from "react-icons/sl"

interface DeactivatedAccountCardProps {
    account: StandardTradingAccount;
}

const DeactivatedAccountCard: FC<DeactivatedAccountCardProps> = ({ account }) => {
    return (
        <Card className="h-100 text-secondary">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                    <SlGraph size={20} className="me-2" />
                    <span>{account.id}</span>
                </div>
                <span>USD</span>
            </Card.Header>
            <Card.Body className="text-center">
                <Card.Title className="text-muted">Deactivated</Card.Title>
            </Card.Body>
            <Card.Footer>
                <Form.Check
                    type="switch"
                    id={`reactivate-switch-${account.id}`}
                    label="Reactivate"
                />
            </Card.Footer>
        </Card>
    );
};

export default DeactivatedAccountCard;
