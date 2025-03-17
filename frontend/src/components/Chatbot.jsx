import React from 'react'
import chatbot from '../assets/chatbot.png'

const Chatbot = () => {
  return (
    <div 
    className="fixed bottom-4 right-4 z-50 cursor-pointer"
    onClick={() => console.log("Chatbot clicked!")} // Add your chatbot logic here
  >
    <img 
      src={chatbot} 
      alt="Chatbot Icon" 
      className="w-16 h-16 drop-shadow-lg hover:scale-110 transition-transform duration-300"
    />
  </div>
  )
}

export default Chatbot