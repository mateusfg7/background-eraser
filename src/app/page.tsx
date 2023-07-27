'use client'

import { useState } from 'react'

import { Title } from './components/title'
import { ErasedImageBoard } from './components/erased-image-board'
import { UploadImageBoard } from './components/upload-image-board'
import { EraseButton } from './components/erase-button'
import { Footer } from './components/footer'

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File>()
  const [erasedImageURL, setErasedImageURL] = useState<string>()
  const [status, setStatus] = useState<
    'active' | 'fail' | 'success' | 'loading' | 'disabled'
  >('disabled')

  async function removeBackground() {
    setErasedImageURL(undefined)

    if (uploadedFile) {
      setStatus('loading')

      const imglyRemoveBackground = (await import('@imgly/background-removal'))
        .default
      imglyRemoveBackground(uploadedFile)
        .then(blob => {
          setErasedImageURL(URL.createObjectURL(blob))
          setStatus('success')
          setTimeout(() => setStatus('active'), 5000)
        })
        .catch(error => {
          console.error(error)
          setStatus('fail')
        })
    }
  }

  return (
    <main className="m-auto flex min-h-screen max-w-2xl flex-col justify-between gap-24 px-4 py-10 md:px-0">
      <div className="flex flex-col items-center gap-8">
        <Title />

        <div className="flex w-full flex-col justify-center gap-2 sm:h-80 sm:flex-row">
          <UploadImageBoard
            setStatus={setStatus}
            setUploadedFile={setUploadedFile}
            setErasedImageURL={setErasedImageURL}
          />

          <div className="hidden h-full w-full sm:block">
            <ErasedImageBoard
              erasedImageURL={erasedImageURL as string}
              uploadedFileName={uploadedFile?.name as string}
            />
          </div>

          {erasedImageURL && (
            <div className="block sm:hidden">
              <ErasedImageBoard
                erasedImageURL={erasedImageURL as string}
                uploadedFileName={uploadedFile?.name as string}
              />
            </div>
          )}
        </div>

        <EraseButton action={removeBackground} status={status} />
      </div>
      <Footer />
    </main>
  )
}
