import { motion } from 'framer-motion'
import useInView from '../../hooks/useInView'
import useCountUp from '../../hooks/useCountUp'
import styles from './PainPoints.module.css'

const beforeStats = [
    { label: '로딩 속도', desc: '평균 로딩', value: '4.2초', status: 'danger' },
    { label: '문의 응답', desc: 'RFQ 첫 응답', value: '다음 영업일', status: 'danger' },
    { label: '데이터시트', desc: '스펙 접근성', value: 'PDF 링크 깨짐', status: 'danger' },
    { label: '해외 바이어', desc: '이탈률', value: '78%', status: 'danger', numeric: 78 },
    { label: '리드 관리', desc: '추적 체계', value: '없음', status: 'danger' },
]

const afterStats = [
    { label: '로딩 속도', desc: '평균 로딩', value: '0.8초', status: 'success', numeric: 0.8, suffix: '초', decimals: 1 },
    { label: '문의 응답', desc: 'RFQ 첫 응답', value: '3초 (자동)', status: 'success', numeric: 3, suffix: '초 (자동)' },
    { label: '데이터시트', desc: '스펙 접근성', value: '1-클릭 즉시 열람', status: 'success' },
    { label: '해외 바이어', desc: '전환율', value: '+340%', status: 'success', numeric: 340, prefix: '+', suffix: '%' },
    { label: '리드 관리', desc: '추적 체계', value: 'CRM 자동 기록', status: 'success' },
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
                    <span className="section-label">현실 진단</span>
                    <h2 className="section-headline">
                        {'세계 수준의 임베디드 기술을 만들고 계십니다.\n그런데 웹사이트는 2018년에 멈춰 있습니다.'}
                    </h2>
                    <p className="section-subtext">
                        {'해외 바이어가 귀사 제품을 검색했을 때 보는 것은\n최첨단 기술력이 아니라, 느리고 낡은 웹페이지입니다.\n그 3초 안에 바이어는 경쟁사로 이동합니다.'}
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
                            <span className={styles.colTitle}>YOUR SITE TODAY</span>
                        </div>
                        <div className={styles.screenshot + ' ' + styles.screenshotBefore}>
                            <div className={styles.screenshotInner}>
                                <div className={styles.fakeNav}></div>
                                <div className={styles.fakeLine} style={{ width: '70%' }}></div>
                                <div className={styles.fakeLine} style={{ width: '45%' }}></div>
                                <div className={styles.fakeBlock}></div>
                                <div className={styles.fakeLine} style={{ width: '60%' }}></div>
                            </div>
                            <span className={styles.screenshotLabel}>기존 B2B 사이트</span>
                        </div>
                        {beforeStats.map((s, i) => (
                            <StatRow key={i} stat={s} inView={inView} side="before" />
                        ))}
                        <p className={styles.caption}>
                            지금 귀사 웹사이트에서 일어나고 있는 일입니다.
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
                            <span className={styles.colTitle}>WITH AUTOMATION</span>
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
                            <span className={styles.screenshotLabel}>자동화 인프라</span>
                        </div>
                        {afterStats.map((s, i) => (
                            <StatRow key={i} stat={s} inView={inView} side="after" />
                        ))}
                        <p className={styles.caption}>
                            자동화 인프라 적용 후 기대 수치입니다.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
