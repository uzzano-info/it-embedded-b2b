import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useInView from '../../hooks/useInView'
import styles from './Process.module.css'

const steps = [
    {
        icon: '📝',
        title: 'Requirements & NDA',
        subtitle: 'Scope Definition',
        desc: 'Target ADAS level and sensor configuration.\nRequirements definition (FOV, resolution, etc.).\nMutual NDA for IP protection.',
        badge: 'Phase 1',
    },
    {
        icon: '⚙️',
        title: 'PoC Design & Integration',
        subtitle: 'Proof of Concept',
        desc: 'Platform-specific tuning for your vehicle,\nDL architecture optimization,\nlow-latency fusion software porting.',
        badge: 'Phase 2',
    },
    {
        icon: '🚀',
        title: 'Validation & Mass Production',
        subtitle: 'HIL/SIL & Ramp-up',
        desc: 'Environmental & real-vehicle testing (HIL/SIL),\nfunctional safety (ASIL) certification support,\nstable mass production line integration.',
        badge: 'Phase 3',
    },
]

export default function Process() {
    const [ref, inView] = useInView({ threshold: 0.2 })
    const [activeStep, setActiveStep] = useState(-1)

    useEffect(() => {
        if (!inView) return
        const timers = steps.map((_, i) =>
            setTimeout(() => setActiveStep(i), (i + 1) * 500)
        )
        return () => timers.forEach(clearTimeout)
    }, [inView])

    return (
        <section id="process" className={`section ${styles.section}`} ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Our Process</span>
                    <h2 className="section-headline">
                        {'Your partner for mobility innovation.\nA trusted development and production process.'}
                    </h2>
                    <p className="section-subtext">
                        {'From mutual NDA to initial PoC, rigorous real-vehicle validation, and final mass production—\nworld-class engineers are with you at every step.'}
                    </p>
                </motion.div>

                {/* Desktop timeline */}
                <div className={styles.timeline}>
                    <div className={styles.lineTrack}>
                        <div
                            className={styles.lineFill}
                            style={{
                                width: activeStep >= 0
                                    ? `${Math.min(((activeStep + 0.5) / (steps.length - 1)) * 100, 100)}%`
                                    : '0%',
                            }}
                        />
                    </div>

                    <div className={styles.steps}>
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                className={`${styles.stepCard} ${i <= activeStep ? styles.active : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }}
                            >
                                <div className={styles.stepDot}>
                                    <div className={`${styles.dot} ${i <= activeStep ? styles.dotActive : ''}`} />
                                </div>
                                <div className={styles.cardContent}>
                                    <span className={styles.stepBadge}>{step.badge}</span>
                                    <span className={styles.stepIcon}>{step.icon}</span>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <span className={styles.stepSubtitle}>{step.subtitle}</span>
                                    <p className={styles.stepDesc}>{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Testimonial */}
                <motion.blockquote
                    className={styles.testimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <p className={styles.quoteText}>
                        "AUTO-ADAS's multi-sensor fusion technology helped us reduce edge development resources by over 40%, and we achieved full ASIL compliance on schedule."
                    </p>
                    <cite className={styles.quoteAuthor}>
                        — CTO, Global Tier-1 Partner / Leading OEM Supplier
                    </cite>
                </motion.blockquote>
            </div>
        </section>
    )
}
