import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { nanoid } from 'nanoid'

type Content = () => ReactNode

type Popup = {
  id: string
  content: ReactNode
}

let Popups: Popup[] = []
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

function Overlay({
  children,
  onClose,
}: {
  children: ReactNode
  onClose: () => void
}) {
  const stop = (event: MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <div
      onClick={onClose}
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div onClick={stop} role="dialog">
        {children}
      </div>
    </div>
  )
}

function open(renderContent: Content) {
  const id = nanoid()
  Popups = [...Popups, { id, content: renderContent() }]
  emit()
}

function close(id: string) {
  Popups = Popups.filter((popup) => popup.id !== id)
  emit()
}

function Render() {
  const [, rerender] = useState(0)

  useEffect(() => {
    const onChange = () => rerender((n) => n + 1)
    listeners.add(onChange)
    return () => {
      listeners.delete(onChange)
    }
  }, [])

  return createPortal(
    Popups.map((popup) => (
      <Overlay key={popup.id} onClose={() => close(popup.id)}>
        {popup.content}
      </Overlay>
    )),
    document.body,
  )
}

export const PopUp = {
  open,
  render: Render,
}
