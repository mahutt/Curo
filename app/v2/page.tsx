'use client'

import { UserRound, Plus } from 'lucide-react'
import ReminderTab from './reminder-tab'
import TabBar from './tab-bar'
import { useAppState } from '@/context/app-state'
import MedicationTab from './medication-tab'
import PractitionerTab from './practitioner-tab'
import Drawer from './drawer'
import Stack from './stack'

export default function V2() {
  const { state } = useAppState()
  const iconSize = 32
  return (
    <>
      <div className="w-full h-full flex flex-col bg-slate-100">
        <div className="flex justify-between items-center p-4">
          <div className="bg-white flex justify-center items-center rounded-full w-12 h-12">
            <UserRound size={iconSize} strokeWidth={1.5} />
          </div>
          <button className="flex justify-center items-center w-12 h-12">
            <Plus size={iconSize} strokeWidth={1.5} />
          </button>
        </div>
        {state.tab === 'reminders' && <ReminderTab />}
        {state.tab === 'medication' && <MedicationTab />}
        {state.tab === 'hcp' && <PractitionerTab />}
        <TabBar />
      </div>
      <Drawer />
      <Stack />
    </>
  )
}
