import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
}

const trustBadges = [
    { icon: '🏆', label: 'Lighthouse 98점' },
    { icon: '⚡', label: 'LCP 0.8초' },
    { icon: '🔔', label: '리드 응답 3초' },
    { icon: '⚛️', label: 'React + Vercel Edge' },
]

export default function Hero() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animId
        let paused = false

        const nodes = []
        const NODE_COUNT = 18

        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            canvas.width = canvas.offsetWidth * dpr
            canvas.height = canvas.offsetHeight * dpr
            ctx.scale(dpr, dpr)
            initNodes()
        }

        const initNodes = () => {
            nodes.length = 0
            const w = canvas.offsetWidth
            const h = canvas.offsetHeight
            for (let i = 0; i < NODE_COUNT; i++) {
                nodes.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    radius: 1.5 + Math.random() * 1.5,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.003 + Math.random() * 0.005,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                })
            }
        }

        const draw = (time) => {
            if (paused) { animId = requestAnimationFrame(draw); return }

            const w = canvas.offsetWidth
            const h = canvas.offsetHeight
            ctx.clearRect(0, 0, w, h)

            // Update positions
            for (const n of nodes) {
                n.x += n.vx
                n.y += n.vy
                if (n.x < 0 || n.x > w) n.vx *= -1
                if (n.y < 0 || n.y > h) n.vy *= -1
                n.phase += n.speed
            }

            // Draw grid
            ctx.strokeStyle = 'rgba(79, 124, 255, 0.03)'
            ctx.lineWidth = 0.5
            const gridSize = 60
            for (let x = 0; x < w; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
            }
            for (let y = 0; y < h; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
            }

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x
                    const dy = nodes[i].y - nodes[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 200) {
                        const alpha = (1 - dist / 200) * 0.12
                        ctx.strokeStyle = `rgba(79, 124, 255, ${alpha})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(nodes[j].x, nodes[j].y)
                        ctx.stroke()
                    }
                }
            }

            // Draw nodes
            for (const n of nodes) {
                const glow = 0.3 + 0.3 * Math.sin(n.phase)
                const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 12)
                gradient.addColorStop(0, `rgba(79, 124, 255, ${glow})`)
                gradient.addColorStop(1, 'rgba(79, 124, 255, 0)')
                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(n.x, n.y, 12, 0, Math.PI * 2)
                ctx.fill()

                ctx.fillStyle = `rgba(79, 124, 255, ${0.5 + glow * 0.5})`
                ctx.beginPath()
                ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
                ctx.fill()
            }

            animId = requestAnimationFrame(draw)
        }

        const onVisibility = () => { paused = document.hidden }

        resize()
        animId = requestAnimationFrame(draw)
        window.addEventListener('resize', resize)
        document.addEventListener('visibilitychange', onVisibility)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            document.removeEventListener('visibilitychange', onVisibility)
        }
    }, [])

    const scrollTo = (e, id) => {
        e.preventDefault()
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="hero" className={styles.hero}>
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

            <div className={`container ${styles.content}`}>
                <motion.span
                    className={`badge ${styles.badge}`}
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                >
                    디자인 미팅 0회. 통화 0건. 결과물만 전달합니다.
                </motion.span>

                <motion.h1
                    className={styles.headline}
                    variants={fadeUp} initial="hidden" animate="visible" custom={1}
                >
                    귀사의 B2B 웹사이트를{'\n'}
                    24시간 자동 영업 인프라로 전환합니다.
                </motion.h1>

                <motion.p
                    className={styles.subheadline}
                    variants={fadeUp} initial="hidden" animate="visible" custom={2}
                >
                    MCU 스펙시트부터 RFQ 자동 접수까지.{'\n'}
                    디자인 미팅 없이, 5일 안에 완성합니다.
                </motion.p>

                <motion.div
                    className={styles.buttons}
                    variants={fadeUp} initial="hidden" animate="visible" custom={3}
                >
                    <a href="#contact" className="accent-btn" onClick={(e) => scrollTo(e, '#contact')}>
                        무료 사이트 진단 신청하기
                    </a>
                    <a href="#features" className="ghost-btn" onClick={(e) => scrollTo(e, '#features')}>
                        시스템 데모 보기 →
                    </a>
                </motion.div>

                <motion.div
                    className={styles.trustRow}
                    variants={fadeUp} initial="hidden" animate="visible" custom={4}
                >
                    {trustBadges.map((b) => (
                        <span key={b.label} className={styles.trustBadge}>
                            <span className={styles.trustIcon}>{b.icon}</span>
                            {b.label}
                        </span>
                    ))}
                </motion.div>
            </div>

            <div className={styles.gradientBottom} aria-hidden="true" />
        </section>
    )
}
