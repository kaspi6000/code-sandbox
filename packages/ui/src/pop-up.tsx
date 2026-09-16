import type { MouseEvent, ReactNode } from 'react'
// import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'

type Content = () => ReactNode

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
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)

  const close = () => {
    root.unmount()
    container.remove()
  }

  // createPortal(
  //   <Overlay onClose={close}>{renderContent()}</Overlay>,
  //   document.body
  // )

  root.render(<Overlay onClose={close}>{renderContent()}</Overlay>)
}

export const PopUp = {
  open,
}
