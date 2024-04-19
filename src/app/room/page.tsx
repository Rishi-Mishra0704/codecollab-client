"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Peer, createRoomResponse } from "@/types";

const Page: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {});

  const handleCreateRoom = async (): Promise<void> => {
    const host: Peer = {
      id: "host123",
      name: "Host User",
      email: "host@example.com",
      address: "127.0.0.1:8082",
      online: true,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(host),
      });
      const responseData: createRoomResponse = await response.json();
      const roomId = responseData.room_id;
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error("Error creating room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-100 w-100 bg-dark d-flex flex-column justify-content-center align-items-center">
      <h2 className="mb-4 text-light">Create Room</h2>
      <Button
        variant="primary"
        size="lg"
        onClick={handleCreateRoom}
        disabled={loading}
        className="py-3 px-5"
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="mr-2" />
            Creating Room...
          </>
        ) : (
          "Create Room"
        )}
      </Button>
    </div>
  );
};

export default Page;
