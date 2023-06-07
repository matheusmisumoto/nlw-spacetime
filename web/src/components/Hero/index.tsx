export default function Hero() {
  return (
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
  )
}
