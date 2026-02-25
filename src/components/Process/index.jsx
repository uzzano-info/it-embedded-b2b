import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useInView from '../../hooks/useInView'
import styles from './Process.module.css'

const steps = [
    {
        icon: '📤',
        title: '자료 전달',
        subtitle: 'Submit Materials',
        desc: '기존 사이트 URL, 제품 PDF,\n로고 파일을 카카오톡 또는\n이메일로 전달해 주세요.\n미팅은 없습니다.',
        badge: 'Day 0',
    },
    {
        icon: '⚙️',
        title: '시스템 구축',
        subtitle: 'System Build',
        desc: 'React + Vercel 기반 웹사이트,\nn8n 자동화 워크플로우,\nAI 챗봇을 구축합니다.\n중간 확인 1회. 비동기 피드백.',
        badge: 'Day 1–4',
    },
    {
        icon: '🚀',
        title: '런칭 & 인수인계',
        subtitle: 'Launch & Handover',
        desc: 'Vercel 배포, 도메인 연결,\nn8n 워크플로우 활성화,\nAI 챗봇 라이브.\n즉시 리드 수집 시작.',
        badge: 'Day 5',
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
                        {'미팅 없이 완성합니다.\n대표님은 자료만 보내주시면 됩니다.'}
                    </h2>
                    <p className="section-subtext">
                        {'기존 웹사이트 URL, 제품 카탈로그 PDF, 로고 파일.\n이 세 가지만 보내주시면 5일 안에 완성된 시스템을 전달합니다.\n과정 중 전화 통화는 0건입니다.'}
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
                        "전체 과정에서 통화 0건. 카카오톡 메시지 3번으로 끝났습니다. 런칭 다음 날 첫 해외 문의가 들어왔습니다."
                    </p>
                    <cite className={styles.quoteAuthor}>
                        — 이OO 대표, OO전자 (임베디드 보드 제조)
                    </cite>
                </motion.blockquote>
            </div>
        </section>
    )
}
