import { useEffect, useId, useRef, useState } from 'react'
import { formatSeconds, voiceMessageSeconds } from '../../app/morse'
import { playVoiceMessage } from '../../app/sound'
import type { VoiceMessage } from '../../story/types'
import styles from './Messages.module.css'

/** Play button for a voice message, with its transcript as the text equivalent. */
export default function VoicePlayer({ voice }: Readonly<{ voice: VoiceMessage }>) {
  const transcriptId = useId()
  const [playing, setPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const stopRef = useRef<(() => void) | null>(null)

  useEffect(() => () => stopRef.current?.(), [])

  const toggle = () => {
    if (playing) {
      stopRef.current?.()
      return
    }
    const stop = playVoiceMessage(voice.knocks, () => {
      stopRef.current = null
      setPlaying(false)
    })
    if (stop) {
      stopRef.current = stop
      setPlaying(true)
    } else {
      // No audio available: the transcript is the way in.
      setShowTranscript(true)
    }
  }

  return (
    <div className={styles.voice}>
      <div className={styles.voiceRow}>
        <button type="button" className={styles.voicePlay} onClick={toggle} aria-label={playing ? 'Leállítás' : 'Hangüzenet lejátszása'}>
          {playing ? '■' : '▶'}
        </button>
        <span className={styles.wave} data-playing={playing} aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span key={i} style={{ animationDelay: `${(i % 6) * 0.1}s` }} />
          ))}
        </span>
        <span className={styles.voiceLength}>{formatSeconds(voiceMessageSeconds(voice.knocks))}</span>
      </div>
      <button
        type="button"
        className={styles.transcriptToggle}
        aria-expanded={showTranscript}
        aria-controls={transcriptId}
        onClick={() => setShowTranscript((s) => !s)}
      >
        {showTranscript ? 'Átirat elrejtése' : 'Szöveges átirat'}
      </button>
      {showTranscript && (
        <div id={transcriptId} className={styles.transcript}>
          {voice.transcript.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}
    </div>
  )
}
