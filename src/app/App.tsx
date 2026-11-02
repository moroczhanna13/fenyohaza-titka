import { useState } from 'react'
import PhoneFrame from './PhoneFrame'
import HomeScreen from './HomeScreen'
import AppPlaceholder from './AppPlaceholder'
import { APPS, type AppId } from '../apps/registry'

// Until game state exists (next task), chapter 1 unlocks these two apps.
const UNLOCKED_APPS: AppId[] = ['messages', 'gallery']

export default function App() {
  const [openApp, setOpenApp] = useState<AppId | null>(null)
  const app = APPS.find((a) => a.id === openApp)

  return (
    <PhoneFrame>
      {app ? (
        <AppPlaceholder title={app.label} onBack={() => setOpenApp(null)} />
      ) : (
        <HomeScreen unlockedApps={UNLOCKED_APPS} onOpenApp={setOpenApp} />
      )}
    </PhoneFrame>
  )
}
