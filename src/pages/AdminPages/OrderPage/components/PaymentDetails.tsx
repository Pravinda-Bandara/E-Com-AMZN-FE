import { Card } from "react-bootstrap";
import MessageBox from "../../../../components/MessageBox.tsx";

interface PaymentDetailsProps {
    paymentMethod: any;
    isPaid: any;
    paidAt?: any;
}

export function PaymentDetails({ paymentMethod, isPaid, paidAt }: PaymentDetailsProps) {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                    <strong>Method:</strong> {paymentMethod}
                </Card.Text>
                {isPaid ? (
                    <MessageBox variant="success">
                        Paid at {new Date(paidAt!).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} on {new Date(paidAt!).toLocaleDateString()}
                    </MessageBox>
                ) : (
                    <MessageBox variant="warning">Not Paid</MessageBox>
                )}
            </Card.Body>
        </Card>
    );
}
