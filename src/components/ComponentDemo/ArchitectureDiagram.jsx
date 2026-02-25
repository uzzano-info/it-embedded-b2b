import { useState } from 'react'
import styles from './ComponentDemo.module.css'

const nodes = [
    { id: 'sensor', icon: '📡', label: 'Sensor Array', x: 60, y: 100, specs: 'LiDAR, 4D Radar, Camera\nGMSL2 / FPD-Link III\nTime-synchronized Data' },
    { id: 'gateway', icon: '⚙️', label: 'Sensor Fusion', x: 260, y: 100, specs: 'NVIDIA Orin / Snapdragon\n실시간 3D Point-cloud\n딥러닝 멀티 객체 추적 (MOT)' },
    { id: 'cloud', icon: '🧠', label: 'Path Planning', x: 460, y: 100, specs: 'AI 기반 의도 예측\n충돌 회피(AEB) 경로 생성\n< 10ms 초저지연 연산' },
    { id: 'dashboard', icon: '🚙', label: 'Vehicle Control', x: 660, y: 100, specs: '조향/가감속 제어 (MCU)\nCAN-FD 안전 통신\nAUTOSAR Classic OS' },
    { id: 'mobile', icon: '📱', label: 'Digital Cockpit', x: 860, y: 100, specs: '운전자 HMI 디스플레이\nAR HUD 연동 데이터\n상황별 시/청각 통합 경고' },
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
                {'실시간 센서 퓨전부터 차량 제어까지의 파이프라인 아키텍처입니다.\n노드에 마우스를 올리면 세부 기술 스택이 표시됩니다.'}
            </p>

            <div className={styles.archContainer}>
                <svg viewBox="0 0 960 200" className={styles.archSvg} aria-label="ADAS 시스템 퓨전 아키텍처 다이어그램">
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
