import { DownloadCloud } from 'lucide-react'

interface Props {
  erasedImageURL: string
  uploadedFileName: string
}

export function ErasedImageBoard({ erasedImageURL, uploadedFileName }: Props) {
  return (
    <div className="chessboard relative h-72 w-full overflow-hidden rounded-2xl sm:h-full">
      {erasedImageURL && (
        <>
          <img src={erasedImageURL} className="h-full w-full object-contain" />
          <a
            className="absolute inset-0 inline-flex cursor-pointer items-center justify-center bg-transparent text-xl text-white opacity-50 transition-all duration-300 hover:bg-black/30 hover:opacity-100 active:bg-black/30 active:text-white active:opacity-100"
            href={erasedImageURL}
            download={`no-background_${uploadedFileName}`}
          >
            <DownloadCloud size="50" />
          </a>
        </>
      )}
    </div>
  )
}
