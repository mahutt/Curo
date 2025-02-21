'use client'
import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Search, UserRound } from 'lucide-react'
import { Practitioner, useAppState } from '@/context/app-state'
import PractitionerFilter from './practitioner-filter'

const PractitionerTab = () => {
  const { state, setStackObject } = useAppState()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPractitioners = state.practitioners.filter((practitioner) =>
    practitioner.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="flex items-center gap-2 mb-6 px-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search practitioners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <PractitionerFilter />
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex flex-col gap-1 px-4">
          {filteredPractitioners.length > 0 ? (
            filteredPractitioners.map((practitioner) => (
              <PractitionerCard
                key={practitioner.id}
                practitioner={practitioner}
                onClick={() => setStackObject(practitioner)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No practitioners
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function PractitionerCard({
  practitioner,
  onClick,
}: {
  practitioner: Practitioner
  onClick: () => void
}) {
  return (
    <button onClick={onClick}>
      <Card className="p-4 rounded-2xl hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <UserRound className="w-8 h-8" />
          <div>
            <div className="font-medium text-start">{practitioner.name}</div>
            <div className="text-sm text-gray-500">
              {practitioner.specialty}
            </div>
          </div>
        </div>
      </Card>
    </button>
  )
}

export default PractitionerTab
