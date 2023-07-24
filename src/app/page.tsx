'use client'

import { useState } from 'react'

import { Title } from './components/title'
import { ErasedImageBoard } from './components/erased-image-board'
import { UploadImageBoard } from './components/upload-image-board'
import { EraseButton } from './components/erase-button'

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [erasedImageURL, setErasedImageURL] = useState<string>()
  const [status, setStatus] = useState<
    undefined | 'success' | 'fail' | 'loading'
  >()

  async function removeBackground() {
    setErasedImageURL(undefined)

    if (uploadedFile) {
      setStatus('loading')

      const imglyRemoveBackground = (await import('@imgly/background-removal'))
        .default
      imglyRemoveBackground(uploadedFile)
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

  return (
    <main className='flex flex-col items-center p-10 gap-8'>
      <Title />

      <div className='flex gap-3'>
        <UploadImageBoard
          setStatus={setStatus}
          setUploadedFile={setUploadedFile}
          setErasedImageURL={setErasedImageURL}
        />

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
