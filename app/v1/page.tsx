'use client'

import { Button } from '@/components/ui/button'
import { UserRound, Plus, Bell, Pill, BookHeart } from 'lucide-react'
import ReminderList from './reminder-list'
import TabBar from './tab-bar'
import { useAppState } from '@/context/app-state'

export default function v1() {
  const { state } = useAppState()
  const iconSize = 32
  return (
    <div className="w-full h-full flex flex-col bg-slate-100">
      <div className="flex justify-between items-center p-4">
        <div className="bg-white flex justify-center items-center rounded-full w-12 h-12">
          <UserRound size={iconSize} strokeWidth={1.5} />
        </div>
        <Button variant="outline">
          <Plus size={iconSize} strokeWidth={1.5} />
        </Button>
      </div>
      {state.tab === 'reminders' && <ReminderList />}
      {state.tab === 'medication' && <div className="flex-1">Medication</div>}
      {state.tab === 'hcp' && <div className="flex-1">HCP</div>}
      <TabBar />
    </div>
  )
}
