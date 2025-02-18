'use client'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Pill, Phone } from 'lucide-react'
import { useAppState } from '@/context/app-state'

const ReminderList = () => {
  const { groupReminders } = useAppState()
  return (
    <>
      <div className="flex justify-between mb-6 px-4">
        <button className="text-sm font-medium text-gray-600 px-3 py-1 rounded-full border border-gray-300">
          Show All
        </button>
        <button className="text-sm font-medium text-gray-600 px-3 py-1 rounded-full border border-gray-300">
          Today
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex flex-col gap-4">
          {groupReminders().map((reminder) => (
            <div key={reminder.time} className="flex flex-col gap-1 px-4">
              <h2 className="text-gray-700 ml-2">{reminder.time}</h2>
              {reminder.items.map((item) => (
                <Card key={item.name} className="p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    {item.type === 'medication' ? (
                      <Pill className="w-8 h-8" />
                    ) : (
                      <Phone className="w-8 h-8" />
                    )}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        {item.type === 'medication'
                          ? item.dosage
                          : item.duration}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ReminderList
