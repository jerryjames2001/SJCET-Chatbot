import React, { useState, useRef, useEffect, useContext } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { IoMdSend } from 'react-icons/io'; // Send Icon
import chatbot from '../assets/chatbot.png';
import { AppContext } from '../context/AppContext';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { backendurl, userData } = useContext(AppContext);
    const chatWindowRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null); // For auto-scrolling
    const [username, setUsername] = useState('Jerry');



    useEffect(() => {
        gsap.set(chatWindowRef.current, {
            width: '4rem',
            height: '4rem',
            bottom: '1rem',
            right: '1rem',
            borderRadius: '9999px',
            opacity: 1
        });
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]); // Scroll when messages update

    useEffect(() => {
        if (isOpen) {
            const username = userData?.fullname || 'there';
    
            // Add welcome message only if it's not already present
            if (!messages.some(msg => msg.text.includes('how can I assist you?'))) {
                setMessages((prev) => [
                    ...prev, 
                    { text: `Hi ${username}, how can I assist you?`, sender: 'bot' }
                ]);
            }
    
            gsap.to(chatWindowRef.current, {
                width: window.innerWidth < 768 ? '80%' : '30%',
                height: window.innerWidth < 768 ? '90%' : '70%',
                bottom: '2rem',
                right: '2rem',
                borderRadius: '1rem',
                opacity: 1,
                duration: 0.5,
                ease: "power3.out"
            });
        } else {
            gsap.to(chatWindowRef.current, {
                width: '4rem',
                height: '4rem',
                bottom: '1rem',
                right: '1rem',
                borderRadius: '9999px',
                opacity: 1,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
    }, [isOpen, userData]); // Ensure username updates dynamically
    

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;
    
        const newMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
        setIsLoading(true);
    
        // Show "Typing..." indicator
        setMessages((prev) => [...prev, { text: 'Typing...', sender: 'bot' }]);
    
        try {
            const response = await fetch(`${backendurl}/api/chatbot/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
    
            const data = await response.json();
            console.log('Response from server:', data)
    
            // Replace "Typing..." with the actual response
            setMessages((prev) =>
                prev.map(msg =>
                    msg.text === 'Typing...' ? { text: data.reply, sender: 'bot' } : msg
                )
            );
            setIsLoading(false);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) =>
                prev.map(msg =>
                    msg.text === 'Typing...' ? { text: "I'm having trouble responding right now.", sender: 'bot' } : msg
                )
            );
        }
            // Automatically enable send button after 10 seconds
            setTimeout(() => setIsLoading(false), 10000);
        
    };


    return (
        <div
            ref={chatWindowRef}
            className="fixed bg-blue-500 text-white shadow-lg overflow-hidden 
                       flex items-center justify-center cursor-pointer z-50"
        >
            {isOpen ? (
                <div className="p-4 w-full h-full flex flex-col relative">
                    <h2 className="text-xl font-bold mb-4">AI Chatbot</h2>

                    <div className="flex-1 bg-white text-black p-3 rounded-md overflow-y-auto space-y-2" >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg text-sm max-w-[75%] 
                        ${msg.sender === 'user'
                                        ? 'bg-blue-500 text-white ml-auto'
                                        : 'bg-gray-200 text-black'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>


                    {/* Chat Input with Send Icon */}
                    <div className="mt-2 mb-8 flex items-center border border-gray-300 rounded-md">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="p-2 w-full rounded-l-md focus:outline-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Send on Enter
                            disabled={isLoading} // Prevent typing while waiting for response
                        />
                        <button
                            className={`bg-blue-600 text-white p-3 rounded-r-md
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                            onClick={handleSendMessage}
                            disabled={isLoading} // Disable button while waiting
                        >
                            <IoMdSend className="w-5 h-5" />
                        </button>
                    </div>


                    {/* Always Visible Close Button */}
                    <div
                        className="absolute bottom-0 right-0 bg-white rounded-full shadow-md 
                                   p-2 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="text-blue-500 w-5 h-5" />
                    </div>
                </div>
            ) : (
                <img
                    src={chatbot}
                    alt="Chatbot Icon"
                    className="w-16 h-16 drop-shadow-lg hover:scale-110 transition-transform duration-300"
                    onClick={() => setIsOpen(true)}
                />
            )}
        </div>
    );
};

export default Chatbot;
