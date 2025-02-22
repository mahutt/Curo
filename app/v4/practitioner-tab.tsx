'use client'
import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Search, UserRound } from 'lucide-react'
import { Practitioner, useAppState } from '@/context/app-state'
import PractitionerFilter from './practitioner-filter'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const FAKE_PRACTITIONERS: Practitioner[] = [
  {
    id: '1',
    name: 'Dr. Alice Nguyen',
    specialty: 'Cardiology',
    reminders: [],
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D4E03AQFNZ-LNqVjgxA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1685044779925?e=1745452800&v=beta&t=7K3HoAk95UkdYRMY98TfwNt1igQd8b5_UMgM985cV78',
  },
  {
    id: '2',
    name: 'Dr. Benjamin Lee',
    specialty: 'Dermatology',
    reminders: [],
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D4E03AQG2dwAFiTOJKw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1686009241570?e=1745452800&v=beta&t=3NW-jaIA4Slu3R6V9Fxyubgx-x6c6he6LAAQN0yo4hU',
  },
  {
    id: '3',
    name: 'Dr. Clara Patel',
    specialty: 'Pediatrics',
    reminders: [],
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D4E03AQFE8oBdi1DLAg/profile-displayphoto-shrink_100_100/B4EZSM3KWoHAAU-/0/1737530058596?e=1745452800&v=beta&t=dX4sGuO1ESQVwzjkFnEa5sGeI-weF1LCBq66mSyxB_U',
  },
  {
    id: '4',
    name: 'Dr. David Chen',
    specialty: 'Orthopedics',
    reminders: [],
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D4E03AQEOl3WAFH2vzg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1729484341007?e=1745452800&v=beta&t=VfudFNdDMxr5V9mObV1ApIWkGp_ou37Yz4JMV-vGtTs',
  },
  {
    id: '5',
    name: 'Dr. Emma Johnson',
    specialty: 'Neurology',
    reminders: [],
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQFheDOJaPLl2g/profile-displayphoto-shrink_100_100/B56ZSRHrNyHoAY-/0/1737601496922?e=1745452800&v=beta&t=yBd2CO0LAJ8RUorOkaHYuLgbAqiLjHw9jCO_sVuEC6A',
  },
  {
    id: '6',
    name: "Dr. Frank O'Connor",
    specialty: 'Psychiatry',
    reminders: [],
    imageUrl:
      'https://media.licdn.com/dms/image/v2/D5635AQEArj6JcpSBdw/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1684349521573?e=1740787200&v=beta&t=lvVx45MWjUXE3CXuP4hKw2I63bicksrFnzTAEvWXq2M',
  },
]

const PractitionerTab = () => {
  const { setStackObject } = useAppState()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPractitioners = FAKE_PRACTITIONERS.filter((practitioner) =>
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
          <Avatar>
            <AvatarImage src={practitioner.imageUrl} alt={practitioner.name} />
            <AvatarFallback>
              <UserRound className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-start">{practitioner.name}</div>
            <div className="text-sm text-gray-500 text-start">
              {practitioner.specialty}
            </div>
          </div>
        </div>
      </Card>
    </button>
  )
}

export default PractitionerTab
