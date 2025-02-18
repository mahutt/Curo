'use client'
import { MedicationReminder, useAppState } from '@/context/app-state'
import React from 'react'
import { Button } from '@/components/ui/button'
import { X, Bell, Pencil, Check } from 'lucide-react'

export default function Drawer() {
  const { state, setDrawerOpen } = useAppState()

  return (
    <div
      className={`absolute inset-0 bg-black/50 transition-opacity ${
        state.drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setDrawerOpen(false)}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute bottom-0 inset-x-0 bg-white rounded-t-lg transition-transform ${
            state.drawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4">
            <div className="text-lg font-semibold">
              {state.drawerObject?.name}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setDrawerOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {state.drawerObject &&
            'type' in state.drawerObject &&
            state.drawerObject.type === 'medication' && (
              <MedicationReminderDrawerBody
                medicationReminder={state.drawerObject}
              />
            )}
        </div>
      </div>
    </div>
  )
}

function MedicationReminderDrawerBody({
  medicationReminder,
}: {
  medicationReminder: MedicationReminder & { name: string }
}) {
  const { setDrawerOpen } = useAppState()
  const [isTaken, setIsTaken] = React.useState(false)

  return (
    <div className="px-6 pt-2 pb-6">
      <div className="text-sm text-gray-500 mb-2">
        Reminder:{' '}
        {new Date(medicationReminder.time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
      <div className="text-sm mb-4">Dosage: {medicationReminder.dosage}</div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 justify-center"
            onClick={() => setDrawerOpen(false)}
          >
            <Bell className="mr-1 h-4 w-4" />
            Snooze
          </Button>
          <Button
            variant="outline"
            className="flex-1 justify-center"
            onClick={() => setDrawerOpen(false)}
          >
            <Pencil className="mr-1 h-4 w-4" />
            Edit
          </Button>
        </div>

        <Button
          onClick={() => {
            if (!isTaken) {
              setDrawerOpen(false)
            }
            setIsTaken((prev) => !prev)
          }}
          variant={isTaken ? 'outline' : 'default'}
        >
          {isTaken ? (
            <X className="h-4 w-4 mr-2" />
          ) : (
            <Check className="h-4 w-4 mr-2" />
          )}
          {isTaken ? 'Mark as not taken' : 'Mark as taken'}
        </Button>
      </div>
    </div>
  )
}
