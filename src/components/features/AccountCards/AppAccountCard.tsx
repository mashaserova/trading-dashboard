import { FC } from "react";
import { Card, Button } from "react-bootstrap";
import { AppTradingAccount } from "@/types/account";
import { FaMobileAlt } from "react-icons/fa";

interface AppAccountCardProps {
    account: AppTradingAccount;
}

const AppAccountCard: FC<AppAccountCardProps> = ({ account }) => {
    return (
        <Card className="h-100 text-white" style={{ backgroundColor: '#4A5568' }}>
            <Card.Body>
                <Card.Title>App Trading account</Card.Title>
                <div className="d-flex justify-content-between align-items-end mt-4">
                    <div>
                        <Card.Text className="mb-0">Balance</Card.Text>
                        <h4>{account.balance} USD</h4>
                    </div>
                    <Button variant="light" size="lg">
                        <FaMobileAlt />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AppAccountCard;