import { useState, useEffect } from 'react'
import useInView from '../../hooks/useInView'
import styles from './Features.module.css'

const flowSteps = [
    { icon: '📷', label: '4D Radar + LiDAR + Camera' },
    { icon: '⚙️', label: 'Feature-level Fusion' },
    { icon: '🔄', label: 'Scene Understanding (DL)' },
    { icon: '🗺️', label: '3D Occupancy Grid' },
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
                {'Integrating 4D Imaging Radar, Solid-state LiDAR, and Vision sensors\nat the feature level for zero-blind-spot perception in extreme weather.'}
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
                        💡 Handoff to Path Planning
                    </div>
                </div>
            </div>

            {/* Demo panel */}
            <div className={styles.demoPanel}>
                <h3 className={styles.demoTitle}>Request a Sensor Fusion Demo & Seminar</h3>
                <p className={styles.demoSub}>
                    Submit the form below and we'll arrange a live sensor fusion module demo and technical seminar.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.demoForm}>
                        <input
                            className={styles.demoInput}
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            disabled={used}
                        />
                        <input
                            className={styles.demoInput}
                            placeholder="Company (OEM / Tier-1)"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            disabled={used}
                        />
                        <input
                            className={styles.demoInput}
                            placeholder="Target ADAS Level"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            disabled={used}
                        />
                    </div>
                    <button className={styles.demoBtn} type="submit" disabled={loading || used}>
                        {loading ? '⏳ Submitting...' : used ? 'Request submitted successfully.' : '🔔 Request Demo & Schedule'}
                    </button>
                </form>

                {submitted && (
                    <div className={styles.notification}>
                        <div className={styles.notifHeader}>
                            📩 Notification
                        </div>
                        <div className={styles.notifBody}>
                            <strong>[Demo & Seminar Request Received]</strong><br />
                            {form.name} / {form.company}<br />
                            'ADAS demo and sensor fusion module integration discussion...'
                        </div>
                        <div className={styles.notifTime}>Just now</div>
                    </div>
                )}

                <p className={styles.demoNote}>
                    {submitted
                        ? 'An assigned engineer will review and respond promptly.'
                        : 'Submitted data is used for demo purposes only and is not stored.'}
                </p>
            </div>
        </div>
    )
}
