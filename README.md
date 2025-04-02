# Real-time Chat Application

A real-time chat application built with Socket.IO, React, and Vite. This application allows users to communicate in real-time with features like user identification, emoji support, and system notifications.

## Features

- **User Identification**: Users must enter a username before joining the chat
- **Real-time Messaging**: Instant message delivery between users
- **Emoji Picker**: Click the emoji button to display a grid of emojis that can be added to messages
- **System Messages**: Notifications when users join or leave the chat
- **Message Timestamps**: Each message displays the time it was sent

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.IO
- **Development Tools**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/lacey1998/Client-Server-Programming.git
   cd chat-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. In a separate terminal, start the Socket.IO server:
   ```
   npm run server
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter your username in the login screen
2. Start chatting with other users in real-time
3. Use the emoji picker to add emojis to your messages
4. See system notifications when users join or leave the chat

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Socket.IO for the real-time communication capabilities
- Vite for the fast development experience
