import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [typingStatus, setTypingStatus] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      // If msg is a string, convert it to our message format
      if (typeof msg === 'string') {
        setMessages(prev => [...prev, {
          text: msg,
          username: 'Anonymous',
          timestamp: new Date().toLocaleTimeString(),
          id: 'unknown'
        }]);
      } else {
        setMessages(prev => [...prev, msg]);
      }
    });

    socket.on('typing:status', (status) => {
      setTypingStatus(status);
    });

    socket.on('user:list', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('chat message');
      socket.off('typing:status');
      socket.off('user:list');
    };
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      socket.emit('user:join', username);
      setIsJoined(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing:start');
  };

  const handleStopTyping = () => {
    socket.emit('typing:stop');
  };

  // Creative addition: Emoji picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '😎', '🤔', '👋', '🙌'];

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  if (!isJoined) {
    return (
      <div className="join-container">
        <h1>Join Chat</h1>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <button type="submit">Join</button>
        </form>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>Online Users</h2>
        <ul>
          {onlineUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div className="main-chat">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.isSystem ? 'system' : msg.username === username ? 'own' : ''}`}
            >
              <div className="message-header">
                <span className="username">{msg.username}</span>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {typingStatus && <div className="typing-status">{typingStatus}</div>}
        <form onSubmit={handleSubmit} className="message-form">
          <div className="emoji-picker-container">
            <button 
              type="button" 
              className="emoji-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="emoji-picker">
                {emojis.map((emoji, index) => (
                  <button 
                    key={index} 
                    type="button" 
                    className="emoji-item"
                    onClick={() => addEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onBlur={handleStopTyping}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat; 