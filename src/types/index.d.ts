export interface Language {
  value: string;
  label: string;
}
export interface Theme {
  value: string;
  label: string;
}
export interface EditorProps {
  fileContent: string;
  fileExtension: string;
  className: string;
  handleOutput: (output: string) => void;
}

export interface FileFolderProps {
  updateFileContent: (content: string, extension: string) => void;
}

export type File = {
  name: string;
  type: string;
};

export interface OutputProps {
  output: string | null;
}
export interface TerminalControllerProps {
  className?: string;
}

export type Peer = {
  id: string;
  name: string;
  email: string;
  address: string;
  online: boolean;
};


export type createRoomResponse = {
  room_id: string;
};

export interface Peer {
  id: string;
  name: string;
  email: string;
  address: string;
  online: boolean;
}

export interface Room {
  id: string;
  host: Peer;
  peers: { [key: string]: Peer };
  chat: string[];
}

export interface Rooms {
  rooms: { [key: string]: Room };
}

export type Message = {
  message: string;
  senderId: string;
}


export type chatResponse = {
  chat_history: string[];
  message: string;
};


export interface RoomParams {
  roomId: string;
}