import { useState, useEffect } from 'react'
import useInView from '../../hooks/useInView'
import styles from './Features.module.css'

const metrics = [
    { label: 'FCP 첫 화면 표시', value: '0.6초', width: '30%' },
    { label: 'LCP 주요 콘텐츠 로딩', value: '0.8초', width: '40%' },
    { label: 'CLS 레이아웃 안정성', value: '0.02', width: '5%' },
    { label: 'TTI 인터랙션 가능', value: '1.1초', width: '55%' },
]

export default function SpeedTab({ inView: parentInView }) {
    const [tabRef, tabInView] = useInView({ threshold: 0.3 })
    const isVisible = parentInView && tabInView
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        if (isVisible && !animated) {
            const t = setTimeout(() => setAnimated(true), 200)
            return () => clearTimeout(t)
        }
    }, [isVisible, animated])

    return (
        <div ref={tabRef}>
            <p className={styles.tabHeadline}>
                {'바이어는 3초 안에 판단합니다.\n0.8초 안에 보여주십시오.'}
            </p>

            <div className={styles.twoCol}>
                {/* Left — Speed bars */}
                <div className={styles.barContainer}>
                    <div className={styles.barItem}>
                        <span className={styles.barLabel}>기존 사이트</span>
                        <div className={styles.barTrack}>
                            <div
                                className={`${styles.barFill} ${styles.slow} ${animated ? styles.animated : ''}`}
                                style={{ '--target-width': '84%' }}
                            >
                                4.2초 · 바이어 이탈
                            </div>
                        </div>
                    </div>
                    <div className={styles.barItem}>
                        <span className={styles.barLabel}>자동화 인프라</span>
                        <div className={styles.barTrack}>
                            <div
                                className={`${styles.barFill} ${styles.fast} ${animated ? styles.animated : ''}`}
                                style={{ '--target-width': '16%' }}
                            >
                                0.8초 ✓
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Dashboard */}
                <div className={styles.dashboard}>
                    <div className={styles.dashTitle}>Performance Report</div>
                    <div className={styles.scoreCircle}>
                        <span className={styles.scoreNumber}>98</span>
                    </div>
                    <div className={styles.dashTitle} style={{ marginBottom: 12, textAlign: 'center' }}>종합 성능 점수 98/100</div>
                    {metrics.map((m, i) => (
                        <div className={styles.metricRow} key={i}>
                            <span className={styles.metricLabel}>{m.label}</span>
                            <div className={styles.metricBar}>
                                <div
                                    className={`${styles.metricBarFill} ${animated ? styles.animated : ''}`}
                                    style={{
                                        '--w': m.width,
                                        transitionDelay: `${i * 150}ms`,
                                    }}
                                />
                            </div>
                            <span className={styles.metricVal}>{m.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edge strip */}
            <div className={styles.edgeStrip}>
                <div className={styles.edgeTitle}>Vercel Edge CDN — 전 세계 어디서든 빠르게.</div>
                <div className={styles.edgeNodes}>
                    <span className={styles.edgeNode}>🇰🇷 서울 12ms</span>
                    <span className={styles.edgeNode}>🇯🇵 도쿄 48ms</span>
                    <span className={styles.edgeNode}>🇺🇸 샌프란시스코 126ms</span>
                </div>
            </div>

            <div className={styles.techBadges}>
                ⚛️ React 19 · ⚡ Vite 7 · ▲ Vercel Edge · 🖼️ 이미지 최적화 · 📦 코드 스플리팅
            </div>
        </div>
    )
}
