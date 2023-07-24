'use client'

import { ChangeEvent, DragEvent, useState } from 'react'
import imglyRemoveBackground, { Config } from '@imgly/background-removal'
import { UploadCloud } from 'lucide-react'

import { EraseButton } from './components/erase-button'
import { Title } from './components/title'
import { ErasedImageBoard } from './components/erased-image-board'

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [uploadedImageObjectURL, setUploadedImageObjectURL] = useState<string>()
  const [erasedImageURL, setErasedImageURL] = useState<string>()
  const [status, setStatus] = useState<
    undefined | 'success' | 'fail' | 'loading'
  >()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  function removeBackground() {
    setErasedImageURL(undefined)

    const config: Config = {
      progress: (key, current, total) => {
        console.log(`Downloading ${key}: ${current} of ${total}`)
      },
      debug: false,
      fetchArgs: {},
      model: 'medium',
      proxyToWorker: true,
    }

    if (uploadedFile) {
      setStatus('loading')
      imglyRemoveBackground(uploadedFile, config)
        .then((blob) => {
          setErasedImageURL(URL.createObjectURL(blob))
          setStatus('success')
        })
        .catch((error) => {
          console.error(error)
          setStatus('fail')
        })
    }
  }

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
    <main className='flex flex-col items-center p-10 gap-8'>
      <Title />

      <div className='flex gap-3'>
        <div
          className={`flex overflow-hidden justify-center items-center border-2 w-80 h-80 rounded-2xl text-center cursor-pointer ${
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
              <p>Drag and drop file here...</p>
            ) : (
              <div className='flex flex-col items-center gap-2'>
                <p className='transition-all inline-flex gap-1 items-center font-bold duration-1000 bg-gradient-to-br from-blue-800 hover:from-blue-600 to-blue-600 hover:to-blue-400 p-3 rounded-2xl text-white'>
                  <UploadCloud />
                  <span>Upload file</span>
                </p>
                <p>Or drop</p>
              </div>
            )}
          </label>
        </div>

        <ErasedImageBoard
          erasedImageURL={erasedImageURL as string}
          uploadedFileName={uploadedFile?.name as string}
        />
      </div>

      <EraseButton
        action={removeBackground}
        status={status}
        isFileUploaded={!!uploadedFile}
      />
    </main>
  )
}
