import { UploadCloud } from 'lucide-react'
import { ChangeEvent, DragEvent, useState } from 'react'

interface Props {
  setStatus: (
    prop: 'active' | 'fail' | 'success' | 'loading' | 'disabled'
  ) => void
  setErasedImageURL: (prop: string | undefined) => void
  setUploadedFile: (prop: File | undefined) => void
}

export function UploadImageBoard({
  setStatus,
  setErasedImageURL,
  setUploadedFile
}: Props) {
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadedImageObjectURL, setUploadedImageObjectURL] = useState<string>()

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileUpload(event.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFileUpload(event.target.files && event.target.files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    if (file) {
      setStatus('active')
      setErasedImageURL(undefined)
      setUploadedFile(file)
      setUploadedImageObjectURL(URL.createObjectURL(file))
    }
  }
  return (
    <div
      title="Upload image"
      className={`group flex h-72 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 text-center transition-all sm:h-full ${
        isDragOver
          ? 'border-blue-800 bg-neutral-200 dark:bg-neutral-900'
          : 'border-neutral-300 dark:border-neutral-800'
      } ${uploadedImageObjectURL && 'chessboard'}`}
      onDragEnter={event => {
        event.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={event => {
        event.preventDefault()
        setIsDragOver(false)
      }}
      onDragOver={event => {
        event.preventDefault()
        setIsDragOver(true)
      }}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="flex h-full w-full cursor-pointer items-center justify-center"
      >
        {uploadedImageObjectURL ? (
          <img
            src={uploadedImageObjectURL}
            className="h-full w-full object-contain"
          />
        ) : isDragOver ? (
          <p>Drop image here...</p>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="inline-flex items-center gap-1 rounded-2xl bg-gradient-to-br from-blue-800 to-blue-600 p-3 font-bold text-white transition-all duration-1000 hover:from-blue-600 hover:to-blue-400 group-active:from-blue-600 group-active:to-blue-400">
              <UploadCloud />
              <span className="hidden sm:inline">Upload</span>
              <span className="inline sm:hidden">Upload image</span>
            </p>
            <p className="hidden sm:inline">Or drop image</p>
          </div>
        )}
      </label>
    </div>
  )
}
