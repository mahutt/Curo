'use client'

import { useAppState } from '@/context/app-state'
import { Bell, BookHeart, Pill } from 'lucide-react'

export default function TabBar() {
  const { state, changeTab } = useAppState()
  const iconSize = 32

  return (
    <div className="bg-white text-slate-400 flex justify-center space-x-16 py-4 shadow-md">
      <Tab
        icon={<Bell size={iconSize} strokeWidth={1.5} />}
        active={state.tab === 'reminders'}
        onClick={() => changeTab('reminders')}
      />
      <Tab
        icon={<Pill size={iconSize} strokeWidth={1.5} />}
        active={state.tab === 'medication'}
        onClick={() => changeTab('medication')}
      />
      <Tab
        icon={<BookHeart size={iconSize} strokeWidth={1.5} />}
        active={state.tab === 'hcp'}
        onClick={() => changeTab('hcp')}
      />
    </div>
  )
}

function Tab({
  icon,
  active,
  onClick,
}: {
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button className={active ? 'text-blue-600' : ''} onClick={onClick}>
      {icon}
    </button>
  )
}
