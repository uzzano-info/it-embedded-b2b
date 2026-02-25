import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useInView from '../../hooks/useInView'
import styles from './Process.module.css'

const steps = [
    {
        icon: '📝',
        title: '요구사항 분석 및 NDA',
        subtitle: 'Requirements & NDA',
        desc: '타겟 ADAS 레벨 및 센서 구성\n요구사항 정의 (FOV, 해상도 등)\n기술 보호를 위한 상호 NDA 체결.',
        badge: 'Phase 1',
    },
    {
        icon: '⚙️',
        title: 'PoC 기구 설계 및 통합',
        subtitle: 'PoC & Integration',
        desc: '고객사 차량 플랫폼 맞춤형 튜닝,\n딥러닝 아키텍처 최적화 및\n초저지연 퓨전 소프트웨어 포팅.',
        badge: 'Phase 2',
    },
    {
        icon: '🚀',
        title: '실차 검증 및 양산',
        subtitle: 'Validation & Mass Prod',
        desc: '환경 및 실차 테스트 (HIL/SIL),\n기능 안전 (ASIL) 인증 서포트,\n안정적인 양산 라인 연계 지원.',
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
                    <span className="section-label">진행 방식</span>
                    <h2 className="section-headline">
                        {'모빌리티 혁신을 위한 파트너.\n신뢰할 수 있는 개발 및 양산 프로세스.'}
                    </h2>
                    <p className="section-subtext">
                        {'상호 기밀 유지 체결(NDA)부터 초기 PoC, 혹독한 실차 검증, 그리고 최종 양산까지.\n글로벌 최고 수준의 엔지니어들이 함께합니다.'}
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
                        "AUTO-ADAS의 멀티 센서 퓨전 기술 덕분에 엣지 단의 개발 리소스를 40% 이상 절감했고, ASIL 규격 대응을 완벽히 마칠 수 있었습니다."
                    </p>
                    <cite className={styles.quoteAuthor}>
                        — K사 최고기술책임자(CTO) / 글로벌 최고 협력사
                    </cite>
                </motion.blockquote>
            </div>
        </section>
    )
}
