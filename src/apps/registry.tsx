import type { ReactNode } from 'react'

export type AppId = 'messages' | 'email' | 'gallery' | 'browser' | 'notebook' | 'deductions' | 'contacts'

export interface AppInfo {
  id: AppId
  label: string
  /** Tile background color. */
  color: string
  icon: ReactNode
}

const iconProps = {
  width: 30,
  height: 30,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export const APPS: AppInfo[] = [
  {
    id: 'messages',
    label: 'Üzenetek',
    color: '#2f8f5b',
    icon: (
      <svg {...iconProps}>
        <path d="M4 5h16v11H9l-5 4z" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'E-mail',
    color: '#2f6fb3',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    id: 'gallery',
    label: 'Galéria',
    color: '#c0632f',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-9 9" />
      </svg>
    ),
  },
  {
    id: 'browser',
    label: 'Böngésző',
    color: '#3a7f9c',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    id: 'notebook',
    label: 'Jegyzetfüzet',
    color: '#b38a2f',
    icon: (
      <svg {...iconProps}>
        <path d="M6 3h12v18H6z" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    id: 'contacts',
    label: 'Névjegyek',
    color: '#4f7a8f',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </svg>
    ),
  },
  {
    id: 'deductions',
    label: 'Következtetések',
    color: '#7a4fa3',
    icon: (
      <svg {...iconProps}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="9" r="2.5" />
        <circle cx="9" cy="18" r="2.5" />
        <path d="m8.3 7 7.4 1.4M16.5 11l-5.8 5.2" />
      </svg>
    ),
  },
]
