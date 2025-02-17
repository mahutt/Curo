import { Button } from '@/components/ui/button'
import { UserRound, Plus, Bell, Pill, BookHeart } from 'lucide-react'
import ReminderList from './reminder-list'

export default function v1() {
  const iconSize = 32
  return (
    <div className="w-full h-full flex flex-col bg-slate-100">
      <div className="flex justify-between items-center p-4">
        <div className="bg-white flex justify-center items-center rounded-full w-12 h-12">
          <UserRound size={iconSize} strokeWidth={1.5} />
        </div>
        <Button variant="outline">
          <Plus size={iconSize} strokeWidth={1.5} />
        </Button>
      </div>
      <div className="flex-1">
        <ReminderList />
      </div>
      <div className="bg-white text-slate-400 flex justify-center space-x-16 py-4 shadow-md">
        <Bell size={iconSize} strokeWidth={1.5} />
        <Pill size={iconSize} strokeWidth={1.5} />
        <BookHeart size={iconSize} strokeWidth={1.5} />
      </div>
    </div>
  )
}
