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
      className={`flex items-center gap-2 rounded-2xl px-8 py-3 text-xl font-bold text-white transition-all duration-1000 sm:p-3 ${
        isFileUploaded
          ? status !== 'fail'
            ? 'bg-gradient-to-br from-blue-800 to-blue-600 dark:from-blue-700 dark:to-blue-500'
            : 'bg-gradient-to-br from-red-800 to-red-600 dark:from-red-700 dark:to-red-500'
          : 'bg-neutral-500'
      } ${
        status !== 'loading' &&
        status !== 'fail' &&
        'hover:from-blue-600 hover:to-blue-400 active:from-blue-600 active:to-blue-400'
      } ${status === 'loading' && 'cursor-wait'}`}
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
