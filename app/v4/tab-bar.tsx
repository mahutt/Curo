'use client'

import { useAppState } from '@/context/app-state'
import { Bell, Hospital, MessageCircleHeart, Pill } from 'lucide-react'

export default function TabBar() {
  const { state, changeTab, setStackObject } = useAppState()
  const iconSize = 24
  const strokeWidth = 2

  return (
    <div className="bg-white text-slate-400 flex justify-evenly py-[12px] shadow-md border-t z-40">
      <Tab
        icon={<Bell size={iconSize} strokeWidth={strokeWidth} />}
        text="Reminders"
        active={state.tab === 'reminders'}
        onClick={() => {
          setStackObject(null)
          changeTab('reminders')
        }}
      />
      <Tab
        icon={<Pill size={iconSize} strokeWidth={strokeWidth} />}
        text="Medication"
        active={state.tab === 'medication'}
        onClick={() => {
          setStackObject(null)
          changeTab('medication')
        }}
      />
      <Tab
        icon={<Hospital size={iconSize} strokeWidth={strokeWidth} />}
        text="Doctors"
        active={state.tab === 'hcp'}
        onClick={() => {
          setStackObject(null)
          changeTab('hcp')
        }}
      />
      <Tab
        icon={<MessageCircleHeart size={iconSize} strokeWidth={strokeWidth} />}
        text="Chat"
        active={state.tab === 'chat'}
        onClick={() => {
          setStackObject(null)
          changeTab('chat')
        }}
      />
    </div>
  )
}

function Tab({
  icon,
  text,
  active,
  onClick,
}: {
  icon: React.ReactNode
  text: string
  active: boolean

  onClick: () => void
}) {
  return (
    <button
      className={`flex-1 flex flex-col items-center gap-[2px] ${
        active ? 'text-green-500' : ''
      }`}
      onClick={onClick}
    >
      {icon}
      <div className={`text-xs`}>{text}</div>
    </button>
  )
}
