"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Peer, createRoomResponse, Rooms } from "@/types";
import "../globals.css";

const Page: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Rooms>({ rooms: {} });

  const router = useRouter();
  useEffect(() => {
    // Fetch rooms data when component mounts
    fetchRooms();
  }, []);

  const fetchRooms = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8080/rooms");
      const data: Rooms = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

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
      // Redirect to the created room
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error("Error creating room:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (): Promise<void> => {
    const peer: Peer = {
      id: "peer123",
      name: "Peer User",
      email: "peer@emample.coom",
      address: "127.0.0.1:8081",
      online: true,
    };

    try {
      const roomId = "af25aff07714ce93";
      setLoading(true);
      const response = await fetch(`http://localhost:8080/join-room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room_id: roomId,
          peer: peer,
        }),
      });
      const responseData: createRoomResponse = await response.json();
      console.log(responseData);
      // Redirect to the joined room
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error("Error joining room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="h-100 mt-4 bg-dark text-light p-4">
      <div className="d-flex justify-content-between mb-4">
        <Button variant="primary" disabled className="mr-2">
          Search Rooms
        </Button>
        <Button variant="success" onClick={handleJoinRoom} className="mr-2">
          Join Room
        </Button>
        <Button variant="info" onClick={handleCreateRoom}>
          Create Room
        </Button>
      </div>
      <div className="row">
        {Object.values(rooms.rooms).map((room) => (
          <div key={room.id} className="col-md-4 mb-4">
            <Card bg="dark" text="light" className="h-100">
              <Card.Body>
                <Card.Title>Room ID: {room.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Host: {room.host.name}
                </Card.Subtitle>
                <Card.Text>
                  Number of Peers: {Object.keys(room.peers).length}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Page;
