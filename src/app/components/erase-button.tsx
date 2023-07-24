import { Check, Eraser, Loader2, X } from 'lucide-react'

interface Props {
  isFileUploaded: boolean
  status: undefined | 'success' | 'loading' | 'fail'
  action: () => void
}

export function EraseButton({ isFileUploaded, status, action }: Props) {
  return (
    <button
      disabled={!isFileUploaded}
      onClick={action}
      className={`transition-all flex items-center gap-2 duration-1000 text-white text-xl font-bold p-3 rounded-2xl ${
        isFileUploaded
          ? 'bg-gradient-to-br from-blue-800 hover:from-blue-600 to-blue-600 hover:to-blue-400'
          : 'bg-neutral-500'
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
          <Loader2 className='animate-spin' />
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
