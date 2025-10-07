import { FC } from "react";
import { Card, Button } from "react-bootstrap";

const AddAccountCard: FC = () => {
    return (
        <Card className="h-100">
            <Card.Body className="d-flex align-items-center justify-content-center">
                <Button
                    variant="outline-primary"
                    style={{ width: '80px', height: '80px', fontSize: '40px', borderRadius: '50%' }}
                >
                    +
                </Button>
            </Card.Body>
        </Card>
    )
}

export default AddAccountCard;