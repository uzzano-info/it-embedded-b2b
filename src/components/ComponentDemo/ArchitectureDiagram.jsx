import { useState } from 'react'
import styles from './ComponentDemo.module.css'

const nodes = [
    { id: 'sensor', icon: '📡', label: 'IoT Sensor', x: 60, y: 100, specs: 'Temp/Humidity Sensor\nI2C Interface, -40~85°C\n저전력 3.3V 동작' },
    { id: 'gateway', icon: '🔌', label: 'Edge Gateway', x: 260, y: 100, specs: 'ARM Cortex-A53\nEthernet + WiFi + BLE\n데이터 전처리 & 버퍼링' },
    { id: 'cloud', icon: '☁️', label: 'Cloud Server', x: 460, y: 100, specs: 'AWS / Azure IoT Hub\nMQTT 프로토콜\n실시간 데이터 스트리밍' },
    { id: 'dashboard', icon: '📊', label: 'Dashboard', x: 660, y: 100, specs: 'React 기반 웹 대시보드\n실시간 차트 & 알림\n권한별 접근 제어' },
    { id: 'mobile', icon: '📱', label: 'Mobile App', x: 860, y: 100, specs: 'React Native 앱\n푸시 알림\nOTA 펌웨어 업데이트' },
]

const connections = [
    { from: 'sensor', to: 'gateway' },
    { from: 'gateway', to: 'cloud' },
    { from: 'cloud', to: 'dashboard' },
    { from: 'dashboard', to: 'mobile' },
]

export default function ArchitectureDiagram() {
    const [hover, setHover] = useState(null)

    const getNode = (id) => nodes.find((n) => n.id === id)

    return (
        <div>
            <p className={styles.caption}>
                {'제품의 시스템 아키텍처를 인터랙티브하게 보여줍니다.\n노드를 hover하면 상세 스펙이 표시됩니다.'}
            </p>

            <div className={styles.archContainer}>
                <svg viewBox="0 0 960 200" className={styles.archSvg} aria-label="IoT 시스템 아키텍처 다이어그램">
                    {/* Connection lines */}
                    {connections.map((c, i) => {
                        const from = getNode(c.from)
                        const to = getNode(c.to)
                        return (
                            <g key={i}>
                                <line
                                    x1={from.x + 55}
                                    y1={from.y + 25}
                                    x2={to.x - 5}
                                    y2={to.y + 25}
                                    className={styles.archLine}
                                    strokeDasharray="4 4"
                                />
                                {/* Animated particle */}
                                <circle r="3" className={styles.particle}>
                                    <animateMotion
                                        dur={`${2 + i * 0.3}s`}
                                        repeatCount="indefinite"
                                        path={`M${from.x + 55},${from.y + 25} L${to.x - 5},${to.y + 25}`}
                                    />
                                </circle>
                            </g>
                        )
                    })}

                    {/* Nodes */}
                    {nodes.map((node) => (
                        <g
                            key={node.id}
                            className={styles.archNode}
                            onMouseEnter={() => setHover(node.id)}
                            onMouseLeave={() => setHover(null)}
                        >
                            <rect
                                className={styles.archNodeRect}
                                x={node.x - 5}
                                y={node.y - 10}
                                width={110}
                                height={70}
                                rx="10"
                            />
                            <text
                                className={styles.archNodeIcon}
                                x={node.x + 50}
                                y={node.y + 18}
                            >
                                {node.icon}
                            </text>
                            <text
                                className={styles.archNodeLabel}
                                x={node.x + 50}
                                y={node.y + 48}
                            >
                                {node.label}
                            </text>
                        </g>
                    ))}
                </svg>

                {/* Tooltip */}
                {hover && (() => {
                    const node = getNode(hover)
                    const tooltipX = Math.min(node.x, 700)
                    return (
                        <div
                            className={styles.archTooltip}
                            style={{ left: `${(tooltipX / 960) * 100}%`, top: '20px' }}
                        >
                            <h4>{node.icon} {node.label}</h4>
                            <p style={{ whiteSpace: 'pre-line' }}>{node.specs}</p>
                        </div>
                    )
                })()}
            </div>
        </div>
    )
}
