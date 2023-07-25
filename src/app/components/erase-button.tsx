import { Check, Eraser, Loader2, X } from 'lucide-react'

interface Props {
  isFileUploaded: boolean
  status: undefined | 'success' | 'loading' | 'fail'
  action: () => void
}

export function EraseButton({ isFileUploaded, status, action }: Props) {
  return (
    <button
      disabled={!isFileUploaded || status === 'loading'}
      onClick={action}
      className={`flex items-center gap-2 rounded-2xl p-3 text-xl font-bold text-white transition-all duration-1000 ${
        isFileUploaded
          ? 'bg-gradient-to-br from-blue-800 to-blue-600'
          : 'bg-neutral-500'
      } ${
        status !== 'loading'
          ? 'hover:from-blue-600 hover:to-blue-400'
          : 'cursor-wait'
      }`}
    >
      {!status && (
        <>
          <Eraser />
          <span>Erase</span>
        </>
      )}
      {isFileUploaded && status === 'loading' && (
        <>
          <Loader2 className="animate-spin" />
          <span>Erasing</span>
        </>
      )}
      {isFileUploaded && status === 'success' && (
        <>
          <Check />
          <span>Erased</span>
        </>
      )}
      {isFileUploaded && status === 'fail' && (
        <>
          <X />
          <span>Error</span>
        </>
      )}
    </button>
  )
}
