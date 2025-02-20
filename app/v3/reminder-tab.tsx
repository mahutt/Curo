'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Pill, Phone, Check, ChevronDown } from 'lucide-react'
import {
  AppointmentReminder,
  Medication,
  MedicationReminder,
  Practitioner,
  useAppState,
} from '@/context/app-state'
import DateFilter from './date-filter'
import ReminderFilter from './reminder-filter'

const ReminderTab = () => {
  const { groupReminders, setDrawerObject } = useAppState()
  return (
    <>
      <div className="flex justify-between mb-6 px-4">
        <ReminderFilter />
        <DateFilter />
      </div>
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex flex-col gap-4">
          {groupReminders().map((reminder) => (
            <div key={reminder.time} className="flex flex-col gap-1 px-4">
              <h2 className="text-gray-700 ml-2">{reminder.time}</h2>
              {reminder.items.map((item) =>
                ReminderCard({ item, setDrawerObject })
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function ReminderCard({
  item,
  setDrawerObject,
}: {
  item:
    | (MedicationReminder & {
        name: string
      })
    | (AppointmentReminder & {
        name: string
      })
  setDrawerObject: (
    object:
      | (MedicationReminder & {
          name: string
        })
      | (AppointmentReminder & {
          name: string
        })
      | Medication
      | Practitioner
      | null
  ) => void
}) {
  return (
    <button
      key={item.id}
      onClick={() => {
        setDrawerObject(item)
      }}
    >
      <Card
        className={`p-4 rounded-2xl cursor-pointer hover:shadow-md transition-shadow ${
          item.taken ? 'bg-green-50 border-green-500' : ''
        }`}
      >
        <div className="flex items-center gap-4">
          {item.taken ? (
            <Check className="w-8 h-8" />
          ) : item.type === 'medication' ? (
            <Pill className="w-8 h-8" />
          ) : (
            <Phone className="w-8 h-8" />
          )}
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-500 flex items-center">
              {item.type === 'medication' ? item.dosage : item.duration}
            </div>
          </div>
        </div>
      </Card>
    </button>
  )
}

export default ReminderTab
