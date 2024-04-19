import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Message, RoomParams, chatResponse } from "@/types";

const Chat: React.FC<RoomParams> = (props: RoomParams) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  const fetchChat = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/rooms/${props.roomId}/chats`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chat messages");
      }

      const data = (await response.json()) as chatResponse;
      setMessages(
        data.chat_history.map((msg: string) => ({
          message: msg,
          senderId: msg.split(":")[1].trim(),
        }))
      );
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    if (props.roomId) {
      fetchChat();
    }
  }, [props.roomId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/rooms/${props.roomId}/send-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: inputMessage,
            sender_id: "host123",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send chat message");
      }

      setInputMessage(""); // Clear input after sending message
      fetchChat(); // Fetch updated chat messages after sending a message
    } catch (error) {
      console.error("Error sending chat message:", error);
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={{ span: 12 }}>
          <Card className="bg-dark-secondary">
            <Card.Body>
              {messages.map((message, index) => (
                <Card.Text key={index}>{`${message.message}`}</Card.Text>
              ))}
            </Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formMessage">
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
