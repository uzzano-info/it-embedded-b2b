import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useInView from '../../hooks/useInView'
import SpecTable from './SpecTable'
import ArchitectureDiagram from './ArchitectureDiagram'
import DatasheetHub from './DatasheetHub'
import styles from './ComponentDemo.module.css'

const tabs = [
    { id: 'spec', label: '📊 스펙 비교 테이블' },
    { id: 'arch', label: '🏗️ 아키텍처 다이어그램' },
    { id: 'data', label: '📄 데이터시트 허브' },
]

const tabContent = { spec: SpecTable, arch: ArchitectureDiagram, data: DatasheetHub }

export default function ComponentDemo() {
    const [activeTab, setActiveTab] = useState('spec')
    const [ref, inView] = useInView({ threshold: 0.1 })
    const ActiveComp = tabContent[activeTab]

    return (
        <section id="demo" className={`section ${styles.section}`} ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Technical Data Demo</span>
                    <h2 className="section-headline">
                        {'AD/ADAS solution specs and sensor fusion architecture.\nProving the specifications OEM engineers demand.'}
                    </h2>
                    <p className="section-subtext">
                        {"Transparent TDD specs instead of vague marketing claims.\nGlobal buyers can begin technical review the moment they land on this page."}
                    </p>
                </motion.div>

                <div className={styles.tabBar} role="tablist" aria-label="데모 탭">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        role="tabpanel"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ActiveComp />
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
