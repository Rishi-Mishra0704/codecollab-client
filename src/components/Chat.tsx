import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Message, RoomParams, chatResponse } from "@/types";

const Chat: React.FC<RoomParams> = (props: RoomParams) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [sendMessage, setSendMessage] = useState<boolean>(false); // State to track if Send button is clicked

  useEffect(() => {
    const fetchChat = async () => {
      if (props.roomId && sendMessage) {
        // Only fetch chat if Send button is clicked
        try {
          const response = await fetch(
            `http://localhost:8080/rooms/${props.roomId}/chat`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: inputMessage,
                sender_id: "host123",
              }), // Send the message
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch or send chat messages");
          }

          const data = await response.json() as chatResponse;
          console.log(data);
          
          setMessages(data.chat_history.map((msg: string) => ({
            message: msg,
            senderId: msg.split(":")[1].trim(),
          })));
          setInputMessage("");
        } catch (error) {
          console.error("Error fetching or sending chat messages:", error);
        }
      }
    };

    fetchChat();
  }, [props.roomId, sendMessage]); // Trigger effect when roomID or sendMessage changes

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendMessage(true); // Set sendMessage to true when the Send button is clicked
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={{ span: 6, offset: 0 }}>
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index}>{message.message}</div>
              ))}
            </div>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
