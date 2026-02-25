import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useInView from '../../hooks/useInView'
import SpeedTab from './SpeedTab'
import AutomationTab from './AutomationTab'
import AIChatbotTab from './AIChatbotTab'
import styles from './Features.module.css'

const tabs = [
    { id: 'speed', label: '⚡ 속도 & 성능' },
    { id: 'automation', label: '🔄 자동화 워크플로우' },
    { id: 'chatbot', label: '🤖 AI 고객 응대' },
]

const tabContent = {
    speed: SpeedTab,
    automation: AutomationTab,
    chatbot: AIChatbotTab,
}

export default function Features() {
    const [activeTab, setActiveTab] = useState('speed')
    const [ref, inView] = useInView({ threshold: 0.1 })
    const ActiveComponent = tabContent[activeTab]

    return (
        <section id="features" className={`section ${styles.section}`} ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">핵심 시스템 스택</span>
                    <h2 className="section-headline">
                        {"이것은 '웹 디자인'이 아닙니다.\n귀사의 영업 운영체제입니다."}
                    </h2>
                    <p className="section-subtext">
                        {'보기 좋은 웹사이트는 만들지 않습니다.\n바이어가 들어오고, 문의가 자동으로 접수되고,\n대표님 폰에 3초 안에 알림이 오는 시스템을 구축합니다.'}
                    </p>
                </motion.div>

                <div className={styles.tabBar} role="tablist" aria-label="핵심 기능 탭">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            aria-controls={`panel-${tab.id}`}
                            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className={styles.tabPanel}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            role="tabpanel"
                            id={`panel-${activeTab}`}
                            aria-labelledby={activeTab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ActiveComponent inView={inView} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
