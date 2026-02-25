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
                    <span className="section-label">데이터 시연</span>
                    <h2 className="section-headline">
                        {'MCU 스펙 테이블, 시스템 아키텍처, 데이터시트.\nB2B 바이어가 원하는 데이터를 즉시 보여줍니다.'}
                    </h2>
                    <p className="section-subtext">
                        {"'예쁜 사진' 대신 '정확한 데이터'를 보여드립니다.\n귀사의 기술력을 바이어가 이해할 수 있는 포맷으로 구조화합니다."}
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
