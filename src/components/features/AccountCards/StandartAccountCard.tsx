import { FC } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { StandardTradingAccount } from "@/types/account";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { FaLongArrowAltRight } from "react-icons/fa";

interface StandardAccountCardProps {
    account: StandardTradingAccount;
}

const StandardAccountCard: FC<StandardAccountCardProps> = ({ account }) => {
    const chartLineColor = account.demo ? '#3B82F6' : '#10B981';
    return (
        <Card className="h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                    {account.demo && <Badge bg="primary" className="me-2">DEMO</Badge>}
                    <span>{account.id}</span>
                </div>
                <span>USD</span>
            </Card.Header>

            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Text className="text-muted mb-0">Equity</Card.Text>
                        <h6>{account.equity} USD</h6>
                    </div>
                    <div>
                        <Card.Text className="text-muted mb-0">Leverage</Card.Text>
                        <h6>1:{account.leverage}</h6>
                    </div>
                </div>

                {/* контейнер с графиком */}
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={account.data}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={chartLineColor}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card.Body>

            <Card.Footer className="text-center">
                <Button variant="outline-secondary">
                    Deposit <FaLongArrowAltRight />
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default StandardAccountCard;