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
        if (!form.company.trim()) e.company = '회사명을 입력해 주세요.'
        if (!form.name.trim()) e.name = '담당자명을 입력해 주세요.'
        if (!form.email.trim()) e.email = '이메일을 입력해 주세요.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = '올바른 이메일 형식이 아닙니다.'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const validateStep2 = () => {
        const e = {}
        if (!form.inquiryType) e.inquiryType = '문의 유형을 선택해 주세요.'
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
            setErrors({ agree: '개인정보 처리방침에 동의해 주세요.' })
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
                        <h3 className={styles.successTitle}>접수 완료!</h3>
                        <p className={styles.successText}>
                            대표님의 카카오톡으로 접수 확인 알림이 전송되었습니다.{'\n'}
                            24시간 내에 무료 진단 리포트를 보내드리겠습니다.
                        </p>
                        <span className={`${styles.successId} mono`}>#{inquiryId}</span>
                        {result.demo && <p className={styles.demoNote}>* 데모 모드 — Vercel 배포 시 실제 API가 연동됩니다.</p>}
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
                    <span className="section-label">무료 진단 신청</span>
                    <h2 className="section-headline">
                        귀사 웹사이트의 현재 상태를 무료로 진단합니다.
                    </h2>
                    <p className="section-subtext">
                        {'아래 정보를 입력하시면 24시간 내에\n귀사 웹사이트 진단 리포트를 보내드립니다.\n부담 없이 확인만 해보세요.'}
                    </p>
                </motion.div>

                <div className={styles.layout}>
                    {/* Trust panel (mobile: above form) */}
                    <aside className={styles.trustPanel}>
                        <div className={styles.trustBlock}>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}>✅</span>
                                <div>
                                    <strong>디자인 미팅 0회</strong>
                                    <p>비동기로만 진행합니다.</p>
                                </div>
                            </div>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}>✅</span>
                                <div>
                                    <strong>5영업일 완성</strong>
                                    <p>명확한 일정, 지연 없음.</p>
                                </div>
                            </div>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}>✅</span>
                                <div>
                                    <strong>고정 가격제</strong>
                                    <p>추가 비용이 발생하지 않습니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.trustDivider} />

                        <div className={styles.trustBlock}>
                            <h4 className={styles.trustTitle}>접수 후 절차</h4>
                            <ol className={styles.trustSteps}>
                                <li><span className={styles.stepNum}>1</span> 제출 즉시 카카오톡으로 접수 확인 발송</li>
                                <li><span className={styles.stepNum}>2</span> 24시간 내 무료 진단 리포트 전달</li>
                                <li><span className={styles.stepNum}>3</span> 리포트 확인 후 진행 여부 결정 (부담 없음)</li>
                            </ol>
                        </div>

                        <div className={styles.trustDivider} />

                        <div className={styles.trustBlock}>
                            <p className={styles.trustCopy}>폼 대신 카카오톡으로 바로 문의하세요.</p>
                            <a href="#" className={styles.kakaoBtn}>
                                💬 카카오톡 채널 바로가기 →
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
                                        {s === 1 ? '기본 정보' : s === 2 ? '프로젝트' : '제출'}
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
                                    <h3 className={styles.formStepTitle}>기본 정보 (1/3)</h3>
                                    <div className={styles.formGrid}>
                                        <div className={styles.field}>
                                            <label className={styles.label}>회사명 <span className={styles.req}>*</span></label>
                                            <input className={`${styles.input} ${errors.company ? styles.inputError : ''}`} value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="예) OO전자" />
                                            {errors.company && <span className={styles.error}>{errors.company}</span>}
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.label}>담당자명 <span className={styles.req}>*</span></label>
                                            <input className={`${styles.input} ${errors.name ? styles.inputError : ''}`} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="예) 홍길동" />
                                            {errors.name && <span className={styles.error}>{errors.name}</span>}
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.label}>이메일 <span className={styles.req}>*</span></label>
                                            <input className={`${styles.input} ${errors.email ? styles.inputError : ''}`} type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="example@company.com" />
                                            {errors.email && <span className={styles.error}>{errors.email}</span>}
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.label}>연락처</label>
                                            <input className={styles.input} type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="010-0000-0000" />
                                        </div>
                                    </div>
                                    <div className={styles.formActions}>
                                        <div />
                                        <button className="accent-btn" onClick={next}>다음 단계 →</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                                    <h3 className={styles.formStepTitle}>프로젝트 정보 (2/3)</h3>
                                    <div className={styles.field}>
                                        <label className={styles.label}>현재 웹사이트 URL</label>
                                        <input className={styles.input} value={form.websiteUrl} onChange={(e) => set('websiteUrl', e.target.value)} placeholder="https://your-company.com" />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>문의 유형 <span className={styles.req}>*</span></label>
                                        <div className={styles.radioGroup}>
                                            {[
                                                ['new', '신규 제작 (New Build)'],
                                                ['renewal', '리뉴얼 (Renewal)'],
                                                ['automation', '자동화 추가 (Add Automation Only)'],
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
                                        <label className={styles.label}>예상 예산</label>
                                        <div className={styles.radioGroup}>
                                            {[
                                                ['500', '~500만원'],
                                                ['1000', '500~1,000만원'],
                                                ['1000+', '1,000만원 이상'],
                                                ['undecided', '미정 (상담 후 결정)'],
                                            ].map(([val, label]) => (
                                                <label key={val} className={`${styles.radio} ${form.budget === val ? styles.radioActive : ''}`}>
                                                    <input type="radio" name="budget" value={val} checked={form.budget === val} onChange={(e) => set('budget', e.target.value)} />
                                                    {label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.formActions}>
                                        <button className="ghost-btn" onClick={prev}>← 이전</button>
                                        <button className="accent-btn" onClick={next}>다음 단계 →</button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                                    <h3 className={styles.formStepTitle}>추가 정보 & 제출 (3/3)</h3>
                                    <div className={styles.field}>
                                        <label className={styles.label}>추가 요청사항</label>
                                        <textarea className={styles.textarea} rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="추가로 전달하고 싶은 내용이 있으시면 입력해 주세요." />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>파일 첨부</label>
                                        <label className={styles.fileDrop}>
                                            <input type="file" accept=".pdf,.png,.jpg,.jpeg" className={styles.fileInput} onChange={(e) => set('file', e.target.files[0])} />
                                            {form.file ? (
                                                <span className={styles.fileName}>📎 {form.file.name}</span>
                                            ) : (
                                                <span className={styles.filePlaceholder}>📎 파일 선택 또는 드래그 앤 드롭 (PDF, 이미지)</span>
                                            )}
                                        </label>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={`${styles.checkbox} ${errors.agree ? styles.checkboxError : ''}`}>
                                            <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); if (errors.agree) setErrors((p) => ({ ...p, agree: null })) }} />
                                            <span className={styles.checkmark} />
                                            개인정보 처리방침에 동의합니다.
                                        </label>
                                        {errors.agree && <span className={styles.error}>{errors.agree}</span>}
                                    </div>
                                    <div className={styles.formActions}>
                                        <button className="ghost-btn" onClick={prev}>← 이전</button>
                                        <button className="accent-btn" onClick={handleSubmit} disabled={loading}>
                                            {loading ? '⏳ 접수 중...' : '🚀 무료 진단 신청하기'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
