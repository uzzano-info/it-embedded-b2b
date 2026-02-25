import { useState, useEffect } from 'react'
import useInView from '../../hooks/useInView'
import styles from './Features.module.css'

const flowSteps = [
    { icon: '📷', label: '데이터 획득' },
    { icon: '⚙️', label: '딥러닝 객체 추적' },
    { icon: '🔄', label: '실시간 센서 퓨전' },
    { icon: '🗺️', label: '4D Spatial 환경 구성' },
]

export default function AutomationTab({ inView: parentInView }) {
    const [tabRef, tabInView] = useInView({ threshold: 0.2 })
    const isVisible = parentInView && tabInView
    const [litIndex, setLitIndex] = useState(-1)
    const [form, setForm] = useState({ name: '', company: '', email: '' })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [used, setUsed] = useState(false)

    useEffect(() => {
        if (!isVisible) return
        setLitIndex(-1)
        const timers = flowSteps.map((_, i) =>
            setTimeout(() => setLitIndex(i), (i + 1) * 400)
        )
        return () => timers.forEach(clearTimeout)
    }, [isVisible])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (used || !form.name || !form.company || !form.email) return
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSubmitted(true)
            setUsed(true)
        }, 1500)
    }

    return (
        <div ref={tabRef}>
            <p className={styles.tabHeadline}>
                {'복잡한 도심 교차로와 폭우 속에서도\n가장 정확한 360° 3D 맵핑 인지 능력.'}
            </p>

            {/* Flow diagram */}
            <div className={styles.flowContainer}>
                <div className={styles.flowNodes}>
                    {flowSteps.map((step, i) => (
                        <div key={i} style={{ display: 'contents' }}>
                            <div className={`${styles.flowNode} ${i <= litIndex ? styles.lit : ''}`}>
                                <span className={styles.flowIcon}>{step.icon}</span>
                                <span className={styles.flowLabel}>{step.label}</span>
                            </div>
                            {i < flowSteps.length - 1 && (
                                <span className={`${styles.flowArrow} ${i < litIndex ? styles.lit : ''}`}>→</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.flowExtra}>
                    <div className={styles.flowExtraNode}>
                        💡 판단 제어 인계
                    </div>
                </div>
            </div>

            {/* Demo panel */}
            <div className={styles.demoPanel}>
                <h3 className={styles.demoTitle}>기술 도입 세미나 및 데모 신청</h3>
                <p className={styles.demoSub}>
                    아래 폼에 입력하시면, 센서 퓨전 모듈 데모 세미나 일정을 안내해 드립니다.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.demoForm}>
                        <input
                            className={styles.demoInput}
                            placeholder="이름"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            disabled={used}
                        />
                        <input
                            className={styles.demoInput}
                            placeholder="소속 기업 (OEM/Tier-1)"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            disabled={used}
                        />
                        <input
                            className={styles.demoInput}
                            placeholder="관심 ADAS 레벨"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            disabled={used}
                        />
                    </div>
                    <button className={styles.demoBtn} type="submit" disabled={loading || used}>
                        {loading ? '⏳ 전송 중...' : used ? '신청이 완료되었습니다.' : '🔔 데모 신청 및 일정 조율'}
                    </button>
                </form>

                {submitted && (
                    <div className={styles.notification}>
                        <div className={styles.notifHeader}>
                            📱 KakaoTalk
                        </div>
                        <div className={styles.notifBody}>
                            <strong>[세미나 & 데모 신청 접수]</strong><br />
                            {form.name} / {form.company}<br />
                            'ADAS 데모 및 센서 퓨전 모듈 도입 논의...'
                        </div>
                        <div className={styles.notifTime}>방금 전</div>
                    </div>
                )}

                <p className={styles.demoNote}>
                    {submitted
                        ? '담당 엔지니어가 신속히 확인 후 피드백을 드립니다.'
                        : '제출된 정보는 시연 용도로만 활용되며 저장되지 않습니다.'}
                </p>
            </div>
        </div>
    )
}
