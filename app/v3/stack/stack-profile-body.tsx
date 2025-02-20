import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, Pencil, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Profile } from '@/context/app-state'

export default function StackProfileBody({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setIsEditing(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateProfile = (field: keyof Profile, value: any) => {
    setEditedProfile({ ...editedProfile, [field]: value })
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 pt-5">
      <div className="flex flex-col gap-8">
        {/* Profile Header Section */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              {isEditing ? (
                <Input
                  value={editedProfile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  className="text-2xl tracking-tight"
                />
              ) : (
                <h1 className="text-2xl tracking-tight">
                  {profile.name}&apos;s Profile
                </h1>
              )}
              {!isEditing && (
                <Button variant="ghost" onClick={handleEditClick}>
                  <Pencil className="w-4 h-4 text-gray-500" />
                </Button>
              )}
            </div>
            {isEditing ? (
              <Input
                value={editedProfile.email}
                onChange={(e) => updateProfile('email', e.target.value)}
                className="text-gray-500"
                placeholder="Email Address"
              />
            ) : (
              <div className="text-gray-500">{profile.email}</div>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                className="flex-1 bg-green-500 hover:bg-green-600"
                onClick={handleSaveClick}
              >
                <Check className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </div>

        {/* Accessibility Settings Section */}
        <div>
          <SettingsSectionHeader header="Accessibility Settings" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Font Size</label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[editedProfile.fontSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={(value) => updateProfile('fontSize', value[0])}
                  className="flex-1"
                />
                <span className="text-sm">{editedProfile.fontSize}px</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Color Blind Mode</label>
              <Select
                value={editedProfile.colorBlind}
                onValueChange={(value) => updateProfile('colorBlind', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="protanopia">Protanopia</SelectItem>
                  <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                  <SelectItem value="tritanopia">Tritanopia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Reminder Preferences Section */}
        <div>
          <SettingsSectionHeader header="Notification Preferences" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Notification Method</label>
              <Select
                value={editedProfile.notificationPreference}
                onValueChange={(value) =>
                  updateProfile('notificationPreference', value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select notification type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push Notification</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="in-app">In-App</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Hide sensitive notification details
              </label>
              <Switch
                checked={editedProfile.hideNotificationDetails}
                onCheckedChange={(checked) =>
                  updateProfile('hideNotificationDetails', checked)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsSectionHeader({ header }: { header: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="h-1/2 border-t border-green-600/25 flex-1" />
      <h2 className="text-sm text-green-600/70">{header}</h2>
      <div className="h-1/2 border-t border-green-600/25 flex-1" />
    </div>
  )
}
