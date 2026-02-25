import { useState, useEffect } from 'react'
import useInView from '../../hooks/useInView'
import styles from './Features.module.css'

const metrics = [
    { label: 'Object Detection', value: '4.2ms', width: '20%' },
    { label: 'Classification & Tracking', value: '2.8ms', width: '14%' },
    { label: 'Sensor Fusion Pipeline', value: '1.5ms', width: '8%' },
    { label: 'Control Response', value: '1.2ms', width: '5%' },
]

export default function SpeedTab({ inView: parentInView }) {
    const [tabRef, tabInView] = useInView({ threshold: 0.3 })
    const isVisible = parentInView && tabInView
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        if (isVisible && !animated) {
            const t = setTimeout(() => setAnimated(true), 200)
            return () => clearTimeout(t)
        }
    }, [isVisible, animated])

    return (
        <div ref={tabRef}>
            <p className={styles.tabHeadline}>
                {'Optimized neural network architectures for low-latency\nobject detection, classification, and tracking on automotive SoCs.'}
            </p>

            <div className={styles.twoCol}>
                {/* Left — Speed bars */}
                <div className={styles.barContainer}>
                    <div className={styles.barItem}>
                        <span className={styles.barLabel}>Cloud-based Inference</span>
                        <div className={styles.barTrack}>
                            <div
                                className={`${styles.barFill} ${styles.slow} ${animated ? styles.animated : ''}`}
                                style={{ '--target-width': '84%' }}
                            >
                                100ms+ · High Latency
                            </div>
                        </div>
                    </div>
                    <div className={styles.barItem}>
                        <span className={styles.barLabel}>Edge AI SoC (Ours)</span>
                        <div className={styles.barTrack}>
                            <div
                                className={`${styles.barFill} ${styles.fast} ${animated ? styles.animated : ''}`}
                                style={{ '--target-width': '16%' }}
                            >
                                {'< 10ms ✓'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Dashboard */}
                <div className={styles.dashboard}>
                    <div className={styles.dashTitle}>Edge AI Inference Report</div>
                    <div className={styles.scoreCircle}>
                        <span className={styles.scoreNumber}>10</span>
                    </div>
                    <div className={styles.dashTitle} style={{ marginBottom: 12, textAlign: 'center' }}>{'Total System Latency < 10ms'}</div>
                    {metrics.map((m, i) => (
                        <div className={styles.metricRow} key={i}>
                            <span className={styles.metricLabel}>{m.label}</span>
                            <div className={styles.metricBar}>
                                <div
                                    className={`${styles.metricBarFill} ${animated ? styles.animated : ''}`}
                                    style={{
                                        '--w': m.width,
                                        transitionDelay: `${i * 150}ms`,
                                    }}
                                />
                            </div>
                            <span className={styles.metricVal}>{m.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edge strip */}
            <div className={styles.edgeStrip}>
                <div className={styles.edgeTitle}>High-performance NPU/GPU hardware acceleration for automotive SoCs.</div>
                <div className={styles.edgeNodes}>
                    <span className={styles.edgeNode}>SoC-agnostic Design</span>
                    <span className={styles.edgeNode}>Optimal TOPS/Watt</span>
                    <span className={styles.edgeNode}>Thermal-aware Architecture</span>
                </div>
            </div>

            <div className={styles.techBadges}>
                ⚛️ TensorRT · ⚡ ONNX Runtime · ▲ PyTorch / TFLite · 🖼️ Transformer Vision · 📦 NVIDIA Orin / Snapdragon Ride
            </div>
        </div>
    )
}
