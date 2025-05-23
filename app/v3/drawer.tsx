'use client'
import {
  AppointmentReminder,
  MedicationReminder,
  useAppState,
} from '@/context/app-state'
import React from 'react'
import { Button } from '@/components/ui/button'
import { X, Bell, Pencil, Check, CalendarX, Phone } from 'lucide-react'

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
          <div className="flex justify-between items-center px-4 pt-4 pb-2">
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
          {state.drawerObject &&
            'type' in state.drawerObject &&
            state.drawerObject.type === 'appointment' && (
              <AppointmentReminderDrawerBody />
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
          className={
            medicationReminder.taken ? '' : 'bg-green-600 hover:bg-green-700'
          }
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

function AppointmentReminderDrawerBody() {
  const { state, setDrawerObject } = useAppState()
  const appointmentReminder = state.drawerObject as AppointmentReminder & {
    name: string
  }

  if (
    !appointmentReminder ||
    !('type' in appointmentReminder) ||
    appointmentReminder.type !== 'appointment'
  ) {
    return null
  }

  return (
    <div className="px-6 pt-2 pb-6">
      <div className="text-sm text-gray-500 mb-2">
        Appointment at {appointmentReminder.time}
      </div>
      <div className="text-sm text-gray-500 mb-4">
        Duration: {appointmentReminder.duration}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 justify-center"
            onClick={() => setDrawerObject(null)}
          >
            <CalendarX className="mr-1 h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant="outline"
            className="flex-1 justify-center"
            onClick={() => setDrawerObject(null)}
          >
            <Phone className="mr-1 h-4 w-4" />
            Call
          </Button>
        </div>

        <Button
          onClick={() => {
            if (!appointmentReminder.taken) {
              setDrawerObject(null)
            }
          }}
          variant={appointmentReminder.taken ? 'outline' : 'default'}
          className={
            appointmentReminder.taken ? '' : 'bg-green-600 hover:bg-green-700'
          }
        >
          {appointmentReminder.taken ? (
            <X className="h-4 w-4 mr-2" />
          ) : (
            <Check className="h-4 w-4 mr-2" />
          )}
          {appointmentReminder.taken
            ? 'Mark as complete'
            : 'Mark as not complete'}
        </Button>
      </div>
    </div>
  )
}
