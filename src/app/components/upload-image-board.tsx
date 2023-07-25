import { UploadCloud } from 'lucide-react'
import { ChangeEvent, DragEvent, useState } from 'react'

interface Props {
  setStatus: (prop: undefined | 'success' | 'fail' | 'loading') => void
  setErasedImageURL: (prop: string | undefined) => void
  setUploadedFile: (prop: File | undefined) => void
}

export function UploadImageBoard({
  setStatus,
  setErasedImageURL,
  setUploadedFile,
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
      setStatus(undefined)
      setErasedImageURL(undefined)
      setUploadedFile(file)
      setUploadedImageObjectURL(URL.createObjectURL(file))
    }
  }
  return (
    <div
      className={`transition-all flex overflow-hidden justify-center items-center border-2 w-80 h-80 rounded-2xl text-center cursor-pointer ${
        isDragOver ? 'border-blue-800 bg-gray-200' : 'border-gray-300'
      }`}
      onDragEnter={(event) => {
        event.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={(event) => {
        event.preventDefault()
        setIsDragOver(false)
      }}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragOver(true)
      }}
      onDrop={handleDrop}
    >
      <input
        type='file'
        className='hidden'
        onChange={handleFileInputChange}
        id='fileInput'
      />
      <label
        htmlFor='fileInput'
        className='cursor-pointer flex items-center justify-center h-full w-full'
      >
        {uploadedImageObjectURL ? (
          <img
            src={uploadedImageObjectURL}
            className='object-cover h-full w-full'
          />
        ) : isDragOver ? (
          <p>Drop image here...</p>
        ) : (
          <div className='flex flex-col items-center gap-2'>
            <p className='transition-all inline-flex gap-1 items-center font-bold duration-1000 bg-gradient-to-br from-blue-800 hover:from-blue-600 to-blue-600 hover:to-blue-400 p-3 rounded-2xl text-white'>
              <UploadCloud />
              <span>Upload</span>
            </p>
            <p>Or drop image</p>
          </div>
        )}
      </label>
    </div>
  )
}
