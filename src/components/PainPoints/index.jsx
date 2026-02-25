import { motion } from 'framer-motion'
import useInView from '../../hooks/useInView'
import useCountUp from '../../hooks/useCountUp'
import styles from './PainPoints.module.css'

const beforeStats = [
    { label: '인지 성능', desc: '야간/악천후', value: '저하', status: 'danger' },
    { label: '데이터 처리', desc: '지연 시간', value: '100ms 이상', status: 'danger', numeric: 100, suffix: 'ms 이상' },
    { label: '안전 규격', desc: 'ISO 26262', value: '개발 지연', status: 'danger' },
    { label: '상용화', desc: '자체 개발 시', value: '평균 3년', status: 'danger', numeric: 3, suffix: '년' },
    { label: '차량 통합', desc: '제어 시스템', value: '호환성 부족', status: 'danger' },
]

const afterStats = [
    { label: '인지 성능', desc: '야간/악천후', value: '정밀 탐지', status: 'success' },
    { label: '데이터 처리', desc: '지연 시간', value: '< 10ms', status: 'success', numeric: 10, prefix: '< ', suffix: 'ms' },
    { label: '안전 규격', desc: 'ISO 26262', value: 'ASIL-D 레디', status: 'success' },
    { label: '상용화', desc: '솔루션 도입 시', value: '6개월 이내', status: 'success', numeric: 6, suffix: '개월 이내' },
    { label: '차량 통합', desc: '제어 시스템', value: 'CAN/Ethernet', status: 'success' },
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
                    <span className="section-label">ADAS 개발의 병목 현상</span>
                    <h2 className="section-headline">
                        {'독자적인 ADAS 구축에는\n막대한 리소스와 시간이 소모됩니다.'}
                    </h2>
                    <p className="section-subtext">
                        {'카메라, 라이다, 레이더 등 방대한 멀티 센서 데이터를 지연 없이 처리하고,\n가장 높은 수준의 글로벌 안전 규격을 충족하는 것은\n많은 글로벌 OEM과 Tier-1들이 겪고 있는 과제입니다.'}
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
                            <span className={styles.colTitle}>기존 개발 환경의 한계</span>
                        </div>
                        <div className={styles.screenshot + ' ' + styles.screenshotBefore}>
                            <div className={styles.screenshotInner}>
                                <div className={styles.fakeNav}></div>
                                <div className={styles.fakeLine} style={{ width: '70%' }}></div>
                                <div className={styles.fakeLine} style={{ width: '45%' }}></div>
                                <div className={styles.fakeBlock}></div>
                                <div className={styles.fakeLine} style={{ width: '60%' }}></div>
                            </div>
                            <span className={styles.screenshotLabel}>레거시 비전 시스템</span>
                        </div>
                        {beforeStats.map((s, i) => (
                            <StatRow key={i} stat={s} inView={inView} side="before" />
                        ))}
                        <p className={styles.caption}>
                            자체 구축 시 마주하는 상용화의 한계점입니다.
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
                            <span className={styles.colTitle}>AUTO-ADAS 솔루션 도입 후</span>
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
                            <span className={styles.screenshotLabel}>통합 엣지 AI 퓨전</span>
                        </div>
                        {afterStats.map((s, i) => (
                            <StatRow key={i} stat={s} inView={inView} side="after" />
                        ))}
                        <p className={styles.caption}>
                            검증된 솔루션 도입으로 확보 가능한 성과입니다.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
