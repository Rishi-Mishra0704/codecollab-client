"use client";
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CodeEditor from "@/components/Editor";
import FileFolder from "@/components/FileFolder";
import "bootstrap/dist/css/bootstrap.min.css";
import Video from "@/components/video";
import TerminalController from "@/components/Terminal";
import OutputComponent from "@/components/Output";

export default function Page() {
  // State to hold the file content
  const [fileContent, setFileContent] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [view, setView] = useState<"terminal" | "output">("terminal");
  // Function to update the file content and extension
  const updateFileContent = (content: string, extension: string) => {
    setFileContent(content);
    setFileExtension(extension);
  };

  const handleOutput = (output: string) => {
    setOutput(output);
  };

  const toggleView = () => {
    setView(view === "terminal" ? "output" : "terminal");
  };

  const getViewName = () => {
    return view === "terminal" ? "Output" : "Terminal";
  };

  return (
    <Container
      fluid
      className="bg-dark text-light"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Row style={{ flex: 1 }}>
        {/* FileFolder component */}
        <Col sm={3} style={{ borderRight: "1px solid #ccc", height: "100%" }}>
          <FileFolder updateFileContent={updateFileContent} />
        </Col>

        {/* CodeEditor and Video components */}
        <Col sm={9} style={{ height: "100%" }}>
          <Row>
            <Col sm={9}>
              <CodeEditor
                fileContent={fileContent}
                fileExtension={fileExtension}
                className="w-100 m-2"
                handleOutput={handleOutput}
              />
              <Button variant="secondary" onClick={toggleView}>{getViewName()}</Button>
              {/* Dynamically display the name of the current view */}
              {view === "terminal" ? (
                <TerminalController className="m-2" />
              ) : (
                <OutputComponent output={output} />
              )}
            </Col>
            <Col sm={3}>
              <Video />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
