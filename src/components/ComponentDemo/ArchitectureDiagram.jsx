import { useState } from 'react'
import styles from './ComponentDemo.module.css'

const nodes = [
    { id: 'sensor', icon: '📡', label: 'Raw Data Acquisition', x: 60, y: 100, specs: '4D Imaging Radar\nSolid-state LiDAR\n8MP Camera Array' },
    { id: 'gateway', icon: '⚙️', label: 'Sensor Fusion Engine', x: 260, y: 100, specs: 'Feature-level Fusion\nTime-synchronized Pipeline\nRedundant Data Paths' },
    { id: 'cloud', icon: '🧠', label: 'DL Perception', x: 460, y: 100, specs: 'Transformer-based Detection\nScene Understanding (VLM)\nLong-range Object Tracking' },
    { id: 'dashboard', icon: '📍', label: 'Path Planning', x: 660, y: 100, specs: 'Kinematic Control Logic\nRedundant Path Planner\nFail-operational Fallback' },
    { id: 'mobile', icon: '🚗', label: 'Vehicle Actuation', x: 860, y: 100, specs: 'CAN-FD / Automotive Ethernet\nACU Steering & Braking\nAUTOSAR Integration' },
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
                {'End-to-end ADAS pipeline from raw data acquisition to vehicle actuation.\nHover over each node to explore the underlying technology stack.'}
            </p>

            <div className={styles.archContainer}>
                <svg viewBox="0 0 960 200" className={styles.archSvg} aria-label="ADAS System Pipeline Architecture Diagram">
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
