import { User } from 'lucide-react'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Left */}
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
        {/* Stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />
        {/* Sign-in */}
        <a
          href=""
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="h-5 w-5 text-gray-500"></User>
          </div>
          <p className="max-w-[140px] text-sm leading-snug">
            <span>Crie sua conta!</span>
          </p>
        </a>
        {/* Hero */}
        <div className="max-w-[420px] space-y-5">
          <h1 className="font-alt text-4xl font-bold leading-tight text-gray-50">
            My Live Notes
          </h1>
          <p className="text-lg leading-relaxed">
            Crie anotações em tempo real de palestras, cursos e eventos!
          </p>
          <a
            href=""
            className="inline-block rounded-full bg-green-500 px-5 py-3 text-sm font-bold uppercase leading-none text-black hover:bg-green-600"
          >
            Nova anotação
          </a>
        </div>
        {/* Hero */}
        <div className="text-sm leading-relaxed text-gray-200">
          <p>
            <a
              href="https://matheusmisumoto.dev"
              target="blank"
              rel="noreferrer"
              className="underline hover:text-gray-100"
            >
              Matheus Misumoto
            </a>
          </p>
          <p>Baseado no projeto da NLW da Rocketseat</p>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-col p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, comece a{' '}
            <a href="#" className="underline hover:text-gray-50">
              criar agora
            </a>
            !
          </p>
        </div>
      </div>
    </main>
  )
}
