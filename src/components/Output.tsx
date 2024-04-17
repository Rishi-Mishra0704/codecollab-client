import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface OutputProps {
  output: string | null;
}

const OutputComponent: React.FC<OutputProps> = ({ output }) => {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Output</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {output ? <pre>{output}</pre> : <div className="text-muted text-center">Please Run Your Code</div>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OutputComponent;
