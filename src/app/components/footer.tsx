import { Bug, Copyright, Github } from 'lucide-react'

export function Footer() {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-2 text-neutral-500 sm:flex sm:justify-between">
      <a
        className="footer-link"
        href="https://mateusf.com"
        target="_blank"
        rel="author"
      >
        By <span className="font-bold">Mateus Felipe</span>
      </a>
      <a
        href="https://github.com/mateusfg7/background-eraser/blob/main/LICENSE"
        target="_blank"
        rel="license"
        className="footer-link flex items-center gap-1"
      >
        <Copyright strokeWidth={1.3} size={20} /> GPL-3.0 License
      </a>
      <a
        href="https://github.com/mateusfg7/background-eraser"
        target="_blank"
        rel="external"
        className="footer-link flex items-center gap-1"
      >
        <Github strokeWidth={1.3} size={20} /> Source Code
      </a>
      <a
        href="https://github.com/mateusfg7/background-eraser/issues/new"
        target="_blank"
        rel="external"
        className="footer-link flex items-center gap-1"
      >
        <Bug strokeWidth={1.3} size={20} />
        Report an issue
      </a>
    </div>
  )
}
