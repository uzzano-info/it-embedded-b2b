import { useState, useEffect } from 'react'
import useInView from '../../hooks/useInView'
import styles from './Features.module.css'

const flowSteps = [
    { icon: '📝', label: '바이어 문의 접수' },
    { icon: '⚙️', label: 'n8n 자동 라우팅' },
    { icon: '📱', label: '즉시 알림 전송' },
    { icon: '📊', label: 'CRM 자동 기록' },
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
                {'RFQ가 들어왔는데 다음 날 확인하셨습니까?\n그 바이어는 이미 경쟁사에 발주했습니다.'}
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
                        📧 자동 회신 발송
                    </div>
                </div>
            </div>

            {/* Demo panel */}
            <div className={styles.demoPanel}>
                <h3 className={styles.demoTitle}>직접 테스트해보세요.</h3>
                <p className={styles.demoSub}>
                    아래 폼에 입력하면, 실제와 동일한 카카오톡 알림이 어떻게 오는지 확인할 수 있습니다.
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
                            placeholder="회사명"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            disabled={used}
                        />
                        <input
                            className={styles.demoInput}
                            placeholder="이메일"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            disabled={used}
                        />
                    </div>
                    <button className={styles.demoBtn} type="submit" disabled={loading || used}>
                        {loading ? '⏳ 전송 중...' : used ? '데모는 세션당 1회만 가능합니다.' : '🔔 알림 테스트 발송'}
                    </button>
                </form>

                {submitted && (
                    <div className={styles.notification}>
                        <div className={styles.notifHeader}>
                            📱 KakaoTalk
                        </div>
                        <div className={styles.notifBody}>
                            <strong>[새 문의 접수]</strong><br />
                            {form.name} / {form.company}<br />
                            '견적 요청 - MCU 보드...'
                        </div>
                        <div className={styles.notifTime}>방금 전</div>
                    </div>
                )}

                <p className={styles.demoNote}>
                    {submitted
                        ? '실제 서비스에서는 이 알림이 대표님과 영업팀 전원에게 동시 전송됩니다.'
                        : '이 데모는 API를 호출하지 않습니다. 순수 프론트엔드 시뮬레이션입니다.'}
                </p>
            </div>
        </div>
    )
}
