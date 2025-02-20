'use client'
import { MedicationReminder, useAppState } from '@/context/app-state'
import React from 'react'
import { Button } from '@/components/ui/button'
import { X, Bell, Pencil, Check } from 'lucide-react'

export default function Drawer() {
  const { state, setDrawerObject } = useAppState()
  const open = state.drawerObject !== null

  return (
    <div
      className={`absolute inset-0 z-40 bg-black/50 transition-opacity ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setDrawerObject(null)}
    >
      <div className="relative w-full h-full">
        <div
          className={`absolute bottom-0 inset-x-0 bg-white rounded-t-lg transition-transform ${
            open ? 'translate-y-0' : 'translate-y-full'
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
              onClick={() => setDrawerObject(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {state.drawerObject &&
            'type' in state.drawerObject &&
            state.drawerObject.type === 'medication' && (
              <MedicationReminderDrawerBody />
            )}
        </div>
      </div>
    </div>
  )
}

function MedicationReminderDrawerBody() {
  const { state, setDrawerObject, updateMedicationReminder } = useAppState()
  const medicationReminder = state.drawerObject as MedicationReminder & {
    name: string
  }

  if (
    !medicationReminder ||
    !('type' in medicationReminder) ||
    medicationReminder.type !== 'medication'
  ) {
    return null
  }

  return (
    <div className="px-6 pt-2 pb-6">
      <div className="text-sm text-gray-500 mb-2">
        Reminder: {medicationReminder.time}
      </div>
      <div className="text-sm text-gray-500 mb-4">
        Dosage: {medicationReminder.dosage}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 justify-center"
            onClick={() => setDrawerObject(null)}
          >
            <Bell className="mr-1 h-4 w-4" />
            Snooze
          </Button>
          <Button
            variant="outline"
            className="flex-1 justify-center"
            onClick={() => setDrawerObject(null)}
          >
            <Pencil className="mr-1 h-4 w-4" />
            Edit
          </Button>
        </div>

        <Button
          onClick={() => {
            if (!medicationReminder.taken) {
              setDrawerObject(null)
            }
            updateMedicationReminder(medicationReminder.id, {
              taken: !medicationReminder.taken,
            })
          }}
          variant={medicationReminder.taken ? 'outline' : 'default'}
        >
          {medicationReminder.taken ? (
            <X className="h-4 w-4 mr-2" />
          ) : (
            <Check className="h-4 w-4 mr-2" />
          )}
          {medicationReminder.taken ? 'Mark as not taken' : 'Mark as taken'}
        </Button>
      </div>
    </div>
  )
}
