import { useState, useEffect, useRef } from 'react'

export default function useCountUp(end, duration = 1500, inView = false) {
    const [value, setValue] = useState(0)
    const startTime = useRef(null)
    const animRef = useRef(null)

    useEffect(() => {
        if (!inView) return

        const animate = (timestamp) => {
            if (!startTime.current) startTime.current = timestamp
            const progress = Math.min((timestamp - startTime.current) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setValue(Math.round(eased * end))
            if (progress < 1) {
                animRef.current = requestAnimationFrame(animate)
            }
        }

        animRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animRef.current)
    }, [inView, end, duration])

    return value
}
