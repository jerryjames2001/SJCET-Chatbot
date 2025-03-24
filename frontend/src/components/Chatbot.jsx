import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { IoMdSend } from 'react-icons/io'; // Send Icon
import chatbot from '../assets/chatbot.png';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const chatWindowRef = useRef(null);
    

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
        if (isOpen) {
            gsap.to(chatWindowRef.current, {
                width: window.innerWidth < 768 ? '80%' : '30%', // Responsive width
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
    }, [isOpen]);

    return (
        <div 
            ref={chatWindowRef}
            className="fixed bg-blue-500 text-white shadow-lg overflow-hidden 
                       flex items-center justify-center cursor-pointer z-50"
        >
            {isOpen ? (
                <div className="p-4 w-full h-full flex flex-col relative">
                    <h2 className="text-xl font-bold mb-4">AI Chatbot</h2>

                    <div className="flex-1 bg-white text-black p-3 rounded-md overflow-y-auto">
                        <p>Welcome! How can I assist you today?</p>
                    </div>

                    {/* Chat Input with Send Icon */}
                    <div className="mt-2 mb-8 flex items-center border border-gray-300 rounded-md">
                        <input 
                            type="text" 
                            placeholder="Type your message..." 
                            className="p-2 w-full rounded-l-md focus:outline-none"
                        />
                        <button className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700">
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
