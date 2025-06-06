'use client'
import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Pill, Search, Filter } from 'lucide-react'
import { useAppState } from '@/context/app-state'

const MedicationTab = () => {
  const { state } = useAppState()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMedications = state.medications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="flex items-center gap-2 mb-6 px-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-600 px-3 py-2 rounded-full border border-gray-300">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex flex-col gap-4 px-4">
          {filteredMedications.length > 0 ? (
            filteredMedications.map((medication) => (
              <Card key={medication.id} className="p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <Pill className="w-8 h-8" />
                  <div>
                    <div className="font-medium">{medication.name}</div>
                    <div className="text-sm text-gray-500">
                      {medication.description ||
                        `${medication.reminders.length} reminder(s)`}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No medications found
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MedicationTab
