import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useInView from '../../hooks/useInView'
import SpeedTab from './SpeedTab'
import AutomationTab from './AutomationTab'
import AIChatbotTab from './AIChatbotTab'
import styles from './Features.module.css'

const tabs = [
    { id: 'speed', label: '⚡ 초저지연 엣지 AI 컴퓨팅' },
    { id: 'automation', label: '🔄 AI 기반 멀티 센서 퓨전' },
    { id: 'chatbot', label: '🤖 글로벌 전장 규격 신뢰성' },
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
                    <span className="section-label">핵심 스택 및 아키텍처</span>
                    <h2 className="section-headline">
                        {"단순한 인지 알고리즘이 아닙니다.\n완전한 자율주행을 위한 두뇌입니다."}
                    </h2>
                    <p className="section-subtext">
                        {'인지, 판단, 제어까지 이어지는 파이프라인 전체를 최적화하여\n상황을 정확하게 이해하고 가장 안전한 경로를 실시간으로 제시합니다.'}
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
