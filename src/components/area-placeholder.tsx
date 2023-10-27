export default function Placeholder({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75 ${className}`}>
      <svg className="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
        <defs>
          <pattern
            id="pattern-e65c4c0f-2107-4ff8-8f1a-e4204a4fd15f"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
          </pattern>
        </defs>
        <rect stroke="none" fill="url(#pattern-e65c4c0f-2107-4ff8-8f1a-e4204a4fd15f)" width="100%" height="100%"></rect>
      </svg>
    </div>
  )
}
