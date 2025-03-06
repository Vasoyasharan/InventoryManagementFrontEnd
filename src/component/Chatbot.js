import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faPaperPlane, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Css/Chatbot.css";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const toggleChatbot = () => setIsOpen(!isOpen);

    const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
        const response = await axios.post("http://localhost:5500/api/chatbot/query", { query: input });
        setMessages([...newMessages, { text: response.data.response, sender: "bot" }]);
    } catch (error) {
        console.error("Error in chatbot request:", error);
        setMessages([...newMessages, { text: "Sorry, I couldn't process that request.", sender: "bot" }]);
    }
};

    const clearChat = () => {
        setMessages([{ text: "Hello! How can I assist you?", sender: "bot" }]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <div className="chatbot-icon" onClick={toggleChatbot}>
                <FontAwesomeIcon icon={faRobot} size="lg" />
            </div>

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>Smart Assistant</h3>
                        <div className="header-buttons">
                            <FontAwesomeIcon 
                                icon={faTrash} 
                                className="clear-icon" 
                                onClick={clearChat} 
                                title="Clear Chat" 
                            />
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className="close-icon" 
                                onClick={toggleChatbot} 
                                title="Close" 
                            />
                        </div>
                    </div>
                    
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={sendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
