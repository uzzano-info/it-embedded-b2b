import { useState, useEffect } from 'react'
import useInView from '../../hooks/useInView'
import styles from './Features.module.css'

const metrics = [
    { label: '객체 인식 지연시간', value: '4.2ms', width: '20%' },
    { label: '경로 계획 연산 시간', value: '3.1ms', width: '15%' },
    { label: '센서 퓨전 처리', value: '1.5ms', width: '10%' },
    { label: '차량 제어 응답 시간', value: '1.2ms', width: '5%' },
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
                {'실시간 위험 회피를 위한 결단력.\n초저지연 10ms 모듈 단일화.'}
            </p>

            <div className={styles.twoCol}>
                {/* Left — Speed bars */}
                <div className={styles.barContainer}>
                    <div className={styles.barItem}>
                        <span className={styles.barLabel}>레거시 클라우드 AI</span>
                        <div className={styles.barTrack}>
                            <div
                                className={`${styles.barFill} ${styles.slow} ${animated ? styles.animated : ''}`}
                                style={{ '--target-width': '84%' }}
                            >
                                100ms · 지연 발생
                            </div>
                        </div>
                    </div>
                    <div className={styles.barItem}>
                        <span className={styles.barLabel}>통합 엣지 AI 보드</span>
                        <div className={styles.barTrack}>
                            <div
                                className={`${styles.barFill} ${styles.fast} ${animated ? styles.animated : ''}`}
                                style={{ '--target-width': '16%' }}
                            >
                                {'< 10ms ✓'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Dashboard */}
                <div className={styles.dashboard}>
                    <div className={styles.dashTitle}>AI Inference Report</div>
                    <div className={styles.scoreCircle}>
                        <span className={styles.scoreNumber}>10</span>
                    </div>
                    <div className={styles.dashTitle} style={{ marginBottom: 12, textAlign: 'center' }}>종합 시스템 지연 10ms 이내</div>
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
                <div className={styles.edgeTitle}>고성능 NPU/GPU 기반 하드웨어 가속 지원.</div>
                <div className={styles.edgeNodes}>
                    <span className={styles.edgeNode}>칩셋 독립성 보장</span>
                    <span className={styles.edgeNode}>Tops당 최적 전력비</span>
                    <span className={styles.edgeNode}>발열 제어 설계</span>
                </div>
            </div>

            <div className={styles.techBadges}>
                ⚛️ Deep Learning AI · ⚡ TensorRT · ▲ PyTorch / ONNX · 🖼️ 엣지 추론 · 📦 하드웨어 디커플링
            </div>
        </div>
    )
}
