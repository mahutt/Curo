'use client'

import { useAppState } from '@/context/app-state'
import { Check, ChevronLeft, Pencil, X } from 'lucide-react'
import { getTabName } from '@/context/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function Stack() {
  const { state, setStackObject } = useAppState()
  return (
    <div
      className={`absolute inset-0 bg-white z-10 px-6 py-8 transition-opacity duration-100 ${
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
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedDescription, setEditedDescription] = useState('')

  if (!state.stackObject) return null
  if (state.stackObject === 'stats') {
    return null
  }
  if ('specialty' in state.stackObject) {
    // Practitioner
    return null
  }
  if ('email' in state.stackObject) {
    // Profile
    return null
  }

  const medication = state.stackObject

  const handleEditClick = () => {
    setIsEditing(true)
    setEditedName(medication.name)
    setEditedDescription(medication.description || '')
  }

  const handleSaveClick = () => {
    updateMedication(medication.id, {
      name: editedName,
      description: editedDescription,
    })
    setIsEditing(false)
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 pt-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          {isEditing ? (
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="text-2xl tracking-tight"
            />
          ) : (
            <h1 className="text-2xl tracking-tight">{medication.name}</h1>
          )}
          {!isEditing && (
            <Button
              variant="ghost"
              onClick={isEditing ? handleSaveClick : handleEditClick}
            >
              <Pencil className="w-4 h-4 text-gray-500" />
            </Button>
          )}
        </div>
        {isEditing ? (
          <>
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="text-sm text-gray-500"
              placeholder="Add a description..."
            />
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSaveClick}>
                <Check className="h-4 w-4" />
                Save
              </Button>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-500">
            {medication.description || 'No description'}
          </div>
        )}
      </div>
    </div>
  )
}
