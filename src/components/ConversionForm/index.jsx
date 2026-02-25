import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useInView from '../../hooks/useInView'
import useFormSubmit from '../../hooks/useFormSubmit'
import styles from './ConversionForm.module.css'

const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

export default function ConversionForm() {
    const [ref, inView] = useInView({ threshold: 0.1 })
    const [step, setStep] = useState(1)
    const [dir, setDir] = useState(1)
    const [errors, setErrors] = useState({})
    const { submit, loading, result } = useFormSubmit()
    const [agreed, setAgreed] = useState(false)
    const [form, setForm] = useState({
        company: '', name: '', email: '', phone: '',
        websiteUrl: '', inquiryType: '', budget: '',
        message: '', file: null,
    })

    const set = (key, val) => {
        setForm((p) => ({ ...p, [key]: val }))
        if (errors[key]) setErrors((p) => ({ ...p, [key]: null }))
    }

    const validateStep1 = () => {
        const e = {}
        if (!form.company.trim()) e.company = 'Please enter your company name.'
        if (!form.name.trim()) e.name = 'Please enter your name.'
        if (!form.email.trim()) e.email = 'Please enter your email.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const validateStep2 = () => {
        const e = {}
        if (!form.inquiryType) e.inquiryType = 'Please select a solution of interest.'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const next = () => {
        if (step === 1 && !validateStep1()) return
        if (step === 2 && !validateStep2()) return
        setDir(1)
        setStep((s) => Math.min(s + 1, 3))
    }

    const prev = () => {
        setDir(-1)
        setStep((s) => Math.max(s - 1, 1))
        setErrors({})
    }

    const handleSubmit = async () => {
        if (!agreed) {
            setErrors({ agree: 'Please agree to the Privacy Policy.' })
            return
        }
        try {
            await submit({
                company: form.company,
                name: form.name,
                email: form.email,
                phone: form.phone,
                websiteUrl: form.websiteUrl,
                inquiryType: form.inquiryType,
                budget: form.budget,
                message: form.message,
            })
        } catch (err) {
            setErrors({ submit: err.message })
        }
    }

    if (result?.success) {
        const inquiryId = result.inquiryId
        return (
            <section id="contact" className={`section ${styles.section}`}>
                <div className="container">
                    <motion.div
                        className={styles.successCard}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <motion.span
                            className={styles.successCheck}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            ✅
                        </motion.span>
                        <h3 className={styles.successTitle}>Request Received!</h3>
                        <p className={styles.successText}>
                            A confirmation has been sent to your inbox.{'\n'}
                            A dedicated engineer will review and respond within 24 hours.
                        </p>
                        <span className={`${styles.successId} mono`}>#{inquiryId}</span>
                        {result.demo && <p className={styles.demoNote}>* Demo mode — API will be connected on production deployment.</p>}
                    </motion.div>
                </div>
            </section>
        )
    }

    return (
        <section id="contact" className={`section ${styles.section}`} ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Technical Inquiry & PoC Request</span>
                    <h2 className="section-headline">
                        Submit your ADAS integration and production inquiry.
                    </h2>
                    <p className="section-subtext">
                        {'Fill in the form below and a dedicated engineer will\nprovide technical specifications and demo scheduling within 24 hours.'}
                    </p>
                </motion.div>

                <div className={styles.layout}>
                    {/* Trust panel (mobile: above form) */}
                    <aside className={styles.trustPanel}>
                        <div className={styles.trustBlock}>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}>✅</span>
                                <div>
                                    <strong>Direct Engineer Support</strong>
                                    <p>A technical expert is assigned from the start.</p>
                                </div>
                            </div>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}>✅</span>
                                <div>
                                    <strong>Secure PoC Validation</strong>
                                    <p>Built on mutual trust with NDA-backed engagement.</p>
                                </div>
                            </div>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}>✅</span>
                                <div>
                                    <strong>Modular Solution Stack</strong>
                                    <p>Software-only deployment fully supported.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.trustDivider} />

                        <div className={styles.trustBlock}>
                            <h4 className={styles.trustTitle}>After Submission</h4>
                            <ol className={styles.trustSteps}>
                                <li><span className={styles.stepNum}>1</span> Instant inquiry confirmation notification</li>
                                <li><span className={styles.stepNum}>2</span> Engineer assigned & demo scheduled within 24h</li>
                                <li><span className={styles.stepNum}>3</span> NDA execution & tailored solution review</li>
                            </ol>
                        </div>

                        <div className={styles.trustDivider} />

                        <div className={styles.trustBlock}>
                            <p className={styles.trustCopy}>Prefer a direct channel? Reach out via KakaoTalk.</p>
                            <a href="#" className={styles.kakaoBtn}>
                                💬 KakaoTalk Channel →
                            </a>
                        </div>
                    </aside>

                    {/* Form */}
                    <div className={styles.formContainer}>
                        {/* Progress bar */}
                        <div className={styles.progressBar}>
                            {[1, 2, 3].map((s) => (
                                <div key={s} className={`${styles.progressStep} ${s <= step ? styles.progressActive : ''}`}>
                                    <span className={styles.progressDot}>{s <= step ? '●' : '○'}</span>
                                    <span className={styles.progressLabel}>
                                        {s === 1 ? 'Basic Info' : s === 2 ? 'Project' : 'Submit'}
                                    </span>
                                </div>
                            ))}
                            <div className={styles.progressTrack}>
                                <div className={styles.progressFill} style={{ width: `${((step - 1) / 2) * 100}%` }} />
                            </div>
                        </div>

                        <AnimatePresence mode="wait" custom={dir}>
                            {step === 1 && (
                                <motion.div key="step1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                                    <h3 className={styles.formStepTitle}>Basic Info (1/3)</h3>
                                    <div className={styles.formGrid}>
                                        <div className={styles.field}>
                                            <label className={styles.label}>Company <span className={styles.req}>*</span></label>
                                            <input className={`${styles.input} ${errors.company ? styles.inputError : ''}`} value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="e.g. Samsung SDI" />
                                            {errors.company && <span className={styles.error}>{errors.company}</span>}
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.label}>Contact Name <span className={styles.req}>*</span></label>
                                            <input className={`${styles.input} ${errors.name ? styles.inputError : ''}`} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. John Kim" />
                                            {errors.name && <span className={styles.error}>{errors.name}</span>}
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.label}>Email <span className={styles.req}>*</span></label>
                                            <input className={`${styles.input} ${errors.email ? styles.inputError : ''}`} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="example@company.com" />
                                            {errors.email && <span className={styles.error}>{errors.email}</span>}
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.label}>Phone</label>
                                            <input className={styles.input} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="010-0000-0000" />
                                        </div>
                                    </div>
                                    <div className={styles.formActions}>
                                        <div />
                                        <button className="accent-btn" onClick={next}>Next Step →</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                                    <h3 className={styles.formStepTitle}>Project Details (2/3)</h3>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Vehicle / Board Platform (Optional)</label>
                                        <input className={styles.input} value={form.websiteUrl} onChange={(e) => set('websiteUrl', e.target.value)} placeholder="e.g. Linux, QNX, Orin Nano-based vehicle" />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Solution of Interest <span className={styles.req}>*</span></label>
                                        <div className={styles.radioGroup}>
                                            {[
                                                ['sensorFusion', 'Perception Stack (Multi-Sensor Fusion)'],
                                                ['edgeAi', 'Edge AI Inference Board'],
                                                ['fullAdas', 'Full ADAS System (End-to-End)'],
                                            ].map(([val, label]) => (
                                                <label key={val} className={`${styles.radio} ${form.inquiryType === val ? styles.radioActive : ''}`}>
                                                    <input type="radio" name="inquiryType" value={val} checked={form.inquiryType === val} onChange={(e) => set('inquiryType', e.target.value)} />
                                                    {label}
                                                </label>
                                            ))}
                                        </div>
                                        {errors.inquiryType && <span className={styles.error}>{errors.inquiryType}</span>}
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Target Production Timeline</label>
                                        <div className={styles.radioGroup}>
                                            {[
                                                ['6mo', 'Within 6 months'],
                                                ['1yr', 'Within 1 year'],
                                                ['2yr', '1–2 years'],
                                                ['undecided', 'TBD (Pre-research)'],
                                            ].map(([val, label]) => (
                                                <label key={val} className={`${styles.radio} ${form.budget === val ? styles.radioActive : ''}`}>
                                                    <input type="radio" name="budget" value={val} checked={form.budget === val} onChange={(e) => set('budget', e.target.value)} />
                                                    {label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.formActions}>
                                        <button className="ghost-btn" onClick={prev}>← Back</button>
                                        <button className="accent-btn" onClick={next}>Next Step →</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                                    <h3 className={styles.formStepTitle}>Additional Info & Submit (3/3)</h3>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Additional Notes</label>
                                        <textarea className={styles.textarea} rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Any additional information or requirements you'd like to share." />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>File Attachment</label>
                                        <label className={styles.fileDrop}>
                                            <input type="file" accept=".pdf,.png,.jpg,.jpeg" className={styles.fileInput} onChange={(e) => set('file', e.target.files[0])} />
                                            {form.file ? (
                                                <span className={styles.fileName}>📎 {form.file.name}</span>
                                            ) : (
                                                <span className={styles.filePlaceholder}>📎 Select file or drag & drop (PDF, Image)</span>
                                            )}
                                        </label>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={`${styles.checkbox} ${errors.agree ? styles.checkboxError : ''}`}>
                                            <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); if (errors.agree) setErrors((p) => ({ ...p, agree: null })) }} />
                                            <span className={styles.checkmark} />
                                            I agree to the Privacy Policy.
                                        </label>
                                        {errors.agree && <span className={styles.error}>{errors.agree}</span>}
                                    </div>
                                    <div className={styles.formActions}>
                                        <button className="ghost-btn" onClick={prev}>← Back</button>
                                        <button className="accent-btn" onClick={handleSubmit} disabled={loading}>
                                            {loading ? '⏳ Submitting...' : '🚀 Request Technical Briefing'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div >
        </section >
    )
}
