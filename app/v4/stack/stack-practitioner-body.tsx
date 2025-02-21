import { Practitioner, useAppState } from '@/context/app-state'
import { useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  CalendarPlus2,
  Camera,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import HCPStackBody from './stack-scheduler-body'

export default function DMPractitionerBody({
  practitioner,
}: {
  practitioner: Practitioner
}) {
  const { state, changeTab } = useAppState()
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, how can I help you today?', sender: 'practitioner' },
    {
      id: 2,
      text: "I'm having some questions about my recent prescription.",
      sender: 'user',
    },
  ])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: 'user',
        },
      ])
      setNewMessage('')
    }
  }

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2 px-2 pt-5 pb-12">
      {/* Practitioner Info */}
      <div className="flex justify-between items-start">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{practitioner.name}</h2>
          <p className="text-sm text-gray-600">{practitioner.specialty}</p>
        </div>
        {/* call button */}
        <div className="flex gap-2">
          <button
            className="flex justify-center items-center rounded-full border-2 border-green-500 text-green-500 px-4 py-2 hover:bg-gray-200"
            onClick={() => {
              if (state.tab !== 'chat') {
                changeTab('chat')
              } else {
                changeTab('hcp')
              }
            }}
          >
            {state.tab === 'chat' ? (
              <CalendarPlus2 size={20} />
            ) : (
              <MessageCircle size={20} />
            )}
          </button>
          <button className="flex justify-center items-center rounded-full bg-green-500 text-white px-4 py-2 hover:bg-green-600">
            <Phone size={20} />
          </button>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="mb-4">
        <button className="flex items-center gap-1 text-sm text-green-500">
          <Bell size={16} />
          {practitioner.reminders.length} Upcoming Appointments
          <ArrowUpRight size={16} />
        </button>
      </div>

      {state.tab === 'chat' && (
        <>
          <div className="flex-1 mb-4 border-t pt-4">
            <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white rounded-tr-none'
                        : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-2 border-t pt-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Message ${practitioner.name}`}
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <button
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
              aria-label="Attach photos"
            >
              <Camera size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleSendMessage}
              className="w-8 h-8 relative bg-green-500 text-white px-2 py-2 rounded-full hover:bg-green-600"
            >
              <Send
                size={20}
                className="absolute left-1/2 top-1/2 transform -translate-x-[11px] -translate-y-1/2"
              />
            </button>
          </div>
        </>
      )}
      {state.tab === 'hcp' && <HCPStackBody />}
    </div>
  )
}
