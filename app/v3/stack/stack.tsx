'use client'

import { useAppState } from '@/context/app-state'
import { ChevronLeft } from 'lucide-react'
import { getTabName } from '@/context/utils'
import StackProfileBody from './stack-profile-body'
import StackPractitionerBody from './stack-practitioner-body'
import StackMedicationBody from './stack-medication-body'

export default function Stack() {
  const { state, setStackObject } = useAppState()
  return (
    <div
      className={`absolute inset-0 bg-white z-30 px-6 py-8 transition-opacity duration-100 ${
        state.stackObject ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-start">
          <button
            onClick={() => setStackObject(null)}
            className="flex items-center gap-1 text-lg font-regular text-gray-600"
          >
            <ChevronLeft className="" />
            {getTabName(state.tab)}
          </button>
        </div>
        {state.stackObject && <StackBody />}
      </div>
    </div>
  )
}

function StackBody() {
  const { state, updateMedication } = useAppState()

  if (!state.stackObject) return null
  if ('specialty' in state.stackObject) {
    return <StackPractitionerBody practitioner={state.stackObject} />
  }

  if ('email' in state.stackObject) {
    // Profile
    return StackProfileBody({
      profile: state.stackObject,
    })
  }

  if ('name' in state.stackObject) {
    // Medication
    return StackMedicationBody({
      medication: state.stackObject,
      updateMedication(id, data) {
        updateMedication(id, data)
      },
    })
  }

  return null
}
