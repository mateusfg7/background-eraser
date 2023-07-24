import { DownloadCloud } from 'lucide-react'

interface Props {
  erasedImageURL: string
  uploadedFileName: string
}

export function ErasedImageBoard({ erasedImageURL, uploadedFileName }: Props) {
  return (
    <div className='chessboard relative overflow-hidden w-80 h-80 rounded-2xl'>
      {erasedImageURL && (
        <>
          <img src={erasedImageURL} className='w-full h-full object-cover' />
          <a
            className='absolute cursor-pointer transition-all duration-300 inset-0 opacity-50 hover:opacity-100 bg-transparent hover:bg-black/30 inline-flex items-center justify-center text-white text-xl'
            href={erasedImageURL}
            download={`no-background_${uploadedFileName}`}
          >
            <DownloadCloud size='50' />
          </a>
        </>
      )}
    </div>
  )
}
