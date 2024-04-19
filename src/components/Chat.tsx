import {useParams} from "next/navigation"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

function Chat() {
  const { roomID } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    const fetchMessages = async () => {
      if (roomID) {
        try {
          const response = await fetch(`/rooms/${roomID}/chat`);
          if (!response.ok) {
            throw new Error('Failed to fetch chat messages');
          }
          const data = await response.json();
          setMessages(data.messages);
        } catch (error) {
          console.error('Error fetching chat messages:', error);
        }
      }
    };
    fetchMessages();
  }, [roomID]);

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      try {
        // Here you can also send the message to the server
        setMessages([...messages, { text: inputMessage, sender: 'user' }]);
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <Form onSubmit={handleMessageSubmit}>
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
}

export default Chat;
