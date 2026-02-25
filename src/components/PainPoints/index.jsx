import { motion } from 'framer-motion'
import useInView from '../../hooks/useInView'
import useCountUp from '../../hooks/useCountUp'
import styles from './PainPoints.module.css'

const beforeStats = [
    { label: 'Perception', desc: 'Night / Adverse Weather', value: 'Degraded', status: 'danger' },
    { label: 'Latency', desc: 'Inference Pipeline', value: '>100ms', status: 'danger', numeric: 100, suffix: 'ms+' },
    { label: 'Safety Cert', desc: 'ISO 26262', value: 'Delayed', status: 'danger' },
    { label: 'Time-to-Market', desc: 'In-house Dev', value: '3+ yrs', status: 'danger', numeric: 3, suffix: ' yrs' },
    { label: 'Integration', desc: 'Vehicle Bus', value: 'Fragmented', status: 'danger' },
]

const afterStats = [
    { label: 'Perception', desc: 'Night / Adverse Weather', value: 'Zero Blind-spot', status: 'success' },
    { label: 'Latency', desc: 'Inference Pipeline', value: '< 10ms', status: 'success', numeric: 10, prefix: '< ', suffix: 'ms' },
    { label: 'Safety Cert', desc: 'ISO 26262', value: 'ASIL-D Ready', status: 'success' },
    { label: 'Time-to-Market', desc: 'w/ Our Stack', value: '< 6 mo', status: 'success', numeric: 6, suffix: ' mo' },
    { label: 'Integration', desc: 'Vehicle Bus', value: 'CAN-FD / Eth', status: 'success' },
]

function StatRow({ stat, inView, side }) {
    const isNumeric = stat.numeric !== undefined
    const shouldAnimate = inView && side === 'after' && isNumeric
    const targetValue = isNumeric
        ? (stat.decimals ? Math.round(stat.numeric * 10) : Math.round(stat.numeric))
        : 0
    const count = useCountUp(targetValue, 1200, shouldAnimate)

    const getDisplayValue = () => {
        if (!isNumeric || side !== 'after' || !inView) return stat.value
        const prefix = stat.prefix || ''
        const suffix = stat.suffix || ''
        if (stat.decimals) {
            return `${prefix}${(count / 10).toFixed(1)}${suffix}`
        }
        return `${prefix}${count}${suffix}`
    }

    return (
        <div className={`${styles.statRow} ${styles[stat.status]}`}>
            <div className={styles.statInfo}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statDesc}>{stat.desc}</span>
            </div>
            <span className={`${styles.statValue} mono`}>
                {getDisplayValue()}
                <span className={styles.indicator}>
                    {stat.status === 'danger' ? ' 🔴' : ' 🟢'}
                </span>
            </span>
        </div>
    )
}

export default function PainPoints() {
    const [ref, inView] = useInView({ threshold: 0.15 })

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    }

    const colVariants = {
        hidden: (dir) => ({ opacity: 0, x: dir === 'left' ? -40 : 40 }),
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
    }

    return (
        <section id="pain-points" className={`section ${styles.section}`} ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">The ADAS Development Bottleneck</span>
                    <h2 className="section-headline">
                        {'Building a reliable ADAS stack in-house\ndemands massive resources and expertise.'}
                    </h2>
                    <p className="section-subtext">
                        {'Processing high-bandwidth data from cameras, LiDAR, and 4D radar with zero latency,\nwhile meeting the strictest global safety certifications—\nthis is the challenge every OEM and Tier-1 faces today.'}
                    </p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {/* Before column */}
                    <motion.div
                        className={`${styles.column} ${styles.beforeCol}`}
                        variants={colVariants}
                        custom="left"
                    >
                        <div className={styles.colHeader}>
                            <span className={styles.colIcon}>❌</span>
                            <span className={styles.colTitle}>Legacy Approach Limitations</span>
                        </div>
                        <div className={styles.screenshot + ' ' + styles.screenshotBefore}>
                            <div className={styles.screenshotInner}>
                                <div className={styles.fakeNav}></div>
                                <div className={styles.fakeLine} style={{ width: '70%' }}></div>
                                <div className={styles.fakeLine} style={{ width: '45%' }}></div>
                                <div className={styles.fakeBlock}></div>
                                <div className={styles.fakeLine} style={{ width: '60%' }}></div>
                            </div>
                            <span className={styles.screenshotLabel}>Legacy Vision Pipeline</span>
                        </div>
                        {beforeStats.map((s, i) => (
                            <StatRow key={i} stat={s} inView={inView} side="before" />
                        ))}
                        <p className={styles.caption}>
                            Limitations your team faces when building from scratch.
                        </p>
                    </motion.div>

                    {/* After column */}
                    <motion.div
                        className={`${styles.column} ${styles.afterCol}`}
                        variants={colVariants}
                        custom="right"
                    >
                        <div className={styles.colHeader}>
                            <span className={styles.colIcon}>✅</span>
                            <span className={styles.colTitle}>With AUTO-ADAS Stack</span>
                        </div>
                        <div className={styles.screenshot + ' ' + styles.screenshotAfter}>
                            <div className={styles.screenshotInner}>
                                <div className={styles.fakeNavModern}></div>
                                <div className={styles.fakeHero}></div>
                                <div className={styles.fakeCards}>
                                    <div className={styles.fakeCard}></div>
                                    <div className={styles.fakeCard}></div>
                                    <div className={styles.fakeCard}></div>
                                </div>
                            </div>
                            <span className={styles.screenshotLabel}>Integrated Edge AI Fusion</span>
                        </div>
                        {afterStats.map((s, i) => (
                            <StatRow key={i} stat={s} inView={inView} side="after" />
                        ))}
                        <p className={styles.caption}>
                            Achievable outcomes with our proven solution stack.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
