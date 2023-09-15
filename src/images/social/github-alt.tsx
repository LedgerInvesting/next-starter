export default function GithubAltLogo({
    className = "",
    filled = false,
    color,
    ...props
}: {
    className?: string
    filled?: boolean
    color?: string
    [x: string]: any
}) {
    return (
        <svg width="32" height="32" viewBox="0 0 48 48" fill={!filled ? "none": "currentColor"} xmlns="http://www.w3.org/2000/svg" className={`w-auto text-primary-700 ${className}`} {...props}>
        <path
            d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
            stroke={color || "currentColor"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M18 36c-9.02 4-10-4-14-4"
            stroke={color || "currentColor"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
    )
}
