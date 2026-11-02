import { useState } from 'react'
import PhoneFrame from './PhoneFrame'
import HomeScreen from './HomeScreen'
import AppPlaceholder from './AppPlaceholder'
import { APPS, type AppId } from '../apps/registry'
import { useGameState } from '../state/useGameState'

export default function App() {
  const [game, dispatch] = useGameState()
  const [openApp, setOpenApp] = useState<AppId | null>(null)
  const app = APPS.find((a) => a.id === openApp)

  return (
    <PhoneFrame>
      {app ? (
        <AppPlaceholder title={app.label} onBack={() => setOpenApp(null)} />
      ) : (
        <HomeScreen
          unlockedApps={game.unlockedApps}
          onOpenApp={setOpenApp}
          onNewGame={() => dispatch({ type: 'newGame' })}
        />
      )}
    </PhoneFrame>
  )
}
