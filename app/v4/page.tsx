'use client'

import { UserRound, Plus } from 'lucide-react'
import ReminderTab from './reminder-tab'
import TabBar from './tab-bar'
import { useAppState } from '@/context/app-state'
import MedicationTab from './medication-tab'
import PractitionerTab from './practitioner-tab'
import SlideDownPanel from './slide-down-panel'
import Drawer from './drawer'
import Stack from './stack/stack'
import ChatTab from './chat-tab'

export default function V2() {
  const { state, setStackObject, setAddMenuOpen } = useAppState()
  const iconSize = 32
  return (
    <>
      <SlideDownPanel />
      <div className="w-full h-full flex flex-col bg-slate-100">
        <div className="flex justify-between items-center p-4">
          <button
            className="bg-white flex justify-center items-center rounded-full w-12 h-12"
            onClick={() => setStackObject(state.profile)}
          >
            <UserRound size={iconSize} strokeWidth={1.5} />
          </button>
          <button
            className="flex justify-center items-center w-12 h-12"
            onClick={() => setAddMenuOpen(true)}
          >
            <Plus size={iconSize} strokeWidth={1.5} />
          </button>
        </div>
        {state.tab === 'reminders' && <ReminderTab />}
        {state.tab === 'medication' && <MedicationTab />}
        {state.tab === 'hcp' && <PractitionerTab />}
        {state.tab === 'chat' && <ChatTab />}
        <TabBar />
      </div>
      <Drawer />
      <Stack />
    </>
  )
}
