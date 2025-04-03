# Real-time Chat Application

A real-time chat application built with Socket.IO, React, and Vite. This application allows users to communicate in real-time with features like user identification, emoji support, and system notifications.

## Features

- **User Identification**: Users must enter a username before joining the chat
- **Real-time Messaging**: Instant message delivery between users
- **Emoji Picker**: Click the emoji button to display a grid of emojis that can be added to messages
- **System Messages**: Notifications when users join or leave the chat
- **Message Timestamps**: Each message displays the time it was sent

## Creative Additions

### 1. User Authentication System
- Users must enter a username before joining the chat
- Messages are tagged with the sender's username for clear communication

### 2. Interactive Emoji Picker
- Dedicated emoji button in the message input area
- Quick emoji selection with a single click
- Emojis are inserted at the current cursor position in the message
- Available emojis: 😊 😂 👍 🎉 🔥 😎 🤔 

### 3. System Messages
- Automatic notifications when users join the chat
- Automatic notifications when users leave the chat
- Helps users track chat room activity in real-time

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

## Youtube Video
https://youtu.be/zct43JtbtcE

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Use of Generative AI in Development

This project was developed with the assistance of generative AI (ChatGPT, Model: GPT-4). Below are the details of how AI contributed to the project:

1. **User Authentication Implementation**
   - Prompt: "How can I add username authentication before allowing users to join the chat?"
   - Response: ChatGPT suggested implementing a login form component and managing user states using React hooks.
   - How It Was Used: The user authentication system was implemented using the suggested approach, requiring users to enter a username before joining the chat.

3. **Emoji Picker Feature**
   - Prompt: "How can I add an emoji picker to the chat application?"
   - Response: ChatGPT provided code examples for implementing a custom emoji picker component with a grid of emojis and click handlers.
   - How It Was Used: The emoji picker feature was implemented based on the provided examples, allowing users to easily add emojis to their messages.

4. **System Messages Implementation**
   - Prompt: "How can I add system messages for user join/leave events?"
   - Response: ChatGPT explained how to handle connection/disconnection events in Socket.IO and broadcast system messages.
   - How It Was Used: The system messages feature was implemented following the suggested approach, providing notifications when users join or leave the chat.

The AI assistance was particularly helpful in:
- Setting up the initial project structure
- Adding user authentication
- Creating interactive UI components
- Debugging and refining the application

While AI provided guidance and code examples, all implementations were reviewed, modified, and integrated into the project with proper understanding and consideration of the application's requirements.

