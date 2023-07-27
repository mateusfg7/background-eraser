import { ComponentProps } from 'react'
import { Check, Eraser, Loader2, X } from 'lucide-react'

import { styles, StylesProps } from './styles'

type Props = ComponentProps<'button'> &
  StylesProps & {
    action: () => void
  }

export function EraseButton({ status, action, className, ...props }: Props) {
  return (
    <button
      onClick={action}
      className={styles({ status, className })}
      disabled={status !== 'active'}
      {...props}
    >
      {(status === 'active' || status === 'disabled') && (
        <>
          <Eraser />
          <span>Erase</span>
        </>
      )}
      {status === 'loading' && (
        <>
          <Loader2 className="animate-spin" />
          <span>Erasing</span>
        </>
      )}
      {status === 'success' && (
        <>
          <Check />
          <span>Erased</span>
        </>
      )}
      {status === 'fail' && (
        <>
          <X />
          <span>Error</span>
        </>
      )}
    </button>
  )
}
