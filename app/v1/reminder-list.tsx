import React from 'react'
import { Card } from '@/components/ui/card'
import { Pill, Check, Phone } from 'lucide-react'

const reminders = [
  {
    time: '10:00 AM',
    items: [
      {
        type: 'medication',
        name: 'Oxycotin',
        dosage: '1 pill',
      },
      {
        type: 'medication',
        name: 'Ibuprofen',
        dosage: '2 pills',
      },
    ],
  },
  {
    time: '12:00 PM',
    items: [
      {
        type: 'medication',
        name: 'Oxycotin',
        dosage: '1 pill',
      },
      {
        type: 'medication',
        name: 'Ibuprofen',
        dosage: '2 pills',
      },
    ],
  },
  {
    time: '2:00 PM',
    items: [
      {
        type: 'medication',
        name: 'Oxycotin',
        dosage: '1 pill',
      },
      {
        type: 'appointment',
        name: 'Ibuprofen',
        dosage: '2 pills',
      },
    ],
  },
]

const ReminderList = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between mb-6 px-4">
        <button className="text-sm font-medium text-gray-600 px-3 py-1 rounded-full border border-gray-300">
          Show All
        </button>
        <button className="text-sm font-medium text-gray-600 px-3 py-1 rounded-full border border-gray-300">
          Today
        </button>
      </div>
      <div className="overflow-y-auto h-[485px]">
        <div className="flex flex-col gap-4">
          {reminders.map((reminder) => (
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
                        {item.dosage}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReminderList
