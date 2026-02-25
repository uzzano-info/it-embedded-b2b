import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useInView from '../../hooks/useInView'
import SpeedTab from './SpeedTab'
import AutomationTab from './AutomationTab'
import AIChatbotTab from './AIChatbotTab'
import styles from './Features.module.css'

const tabs = [
    { id: 'speed', label: '⚡ Real-time Edge AI Inference' },
    { id: 'automation', label: '🔄 AI-Native Multi-Sensor Fusion' },
    { id: 'chatbot', label: '🧑‍💻 ASIL-D Compliant Safety Layer' },
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
                    <span className="section-label">Core Technology Stack</span>
                    <h2 className="section-headline">
                        {"Not just perception algorithms.\nThe complete brain for autonomous driving."}
                    </h2>
                    <p className="section-subtext">
                        {'Optimizing the entire pipeline—from perception to decision to control—\nto accurately understand every scenario and deliver\nthe safest path in real time.'}
                    </p>
                </motion.div>

                <div className={styles.tabBar} role="tablist" aria-label="Core technology tabs">
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
