import styles from './Features.module.css'

const features = [
    {
        title: 'ASIL-D Functional Safety Architecture',
        desc: 'Redundant path planning and fail-operational control logic meeting ISO 26262 ASIL-D standards.',
    },
    {
        title: 'ODD Expansion for Urban Environments',
        desc: 'Complex intersection navigation and unprotected left-turn logic based on vision-language models (VLM).',
    },
    {
        title: 'Full AUTOSAR Compatibility',
        desc: 'Fully compliant with both Adaptive and Classic AUTOSAR architectures for seamless OEM integration.',
    },
    {
        title: 'Euro NCAP 2026 Aligned',
        desc: 'Technical specifications designed to meet the latest Euro NCAP 2026 safety assessment requirements.',
    },
]

const preloadedMessages = [
    { role: 'user', content: 'Is the software stack compatible with AUTOSAR?' },
    {
        role: 'bot',
        content: 'Yes, our stack is fully compliant with both Adaptive and Classic AUTOSAR architectures, ensuring seamless integration with existing OEM software platforms.',
        specs: [
            'Adaptive AUTOSAR (ara::com, ara::exec)',
            'Classic AUTOSAR (BSW, RTE, MCAL)',
            'ISO/SAE 21434 Cybersecurity Ready',
        ],
        download: '📎 AUTOSAR Integration Guide (PDF, 4.2MB)',
    },
]

const suggestedPrompts = [
    'ODD expansion for urban?',
    'Euro NCAP 2026 compliance?',
    'ASIL-D documentation',
    'Transformer-based perception',
]

export default function AIChatbotTab() {
    return (
        <div>
            <p className={styles.tabHeadline}>
                {'Safety-critical software architecture meeting ISO 26262 ASIL-D,\nwith redundant path planning and fail-operational control logic.'}
            </p>

            <div className={styles.twoCol}>
                {/* Left — Feature list */}
                <div className={styles.featureList}>
                    {features.map((f, i) => (
                        <div key={i} className={styles.featureItem}>
                            <span className={styles.featureCheck}>✅</span>
                            <div className={styles.featureText}>
                                <h4>{f.title}</h4>
                                <p>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right — Chatbot widget */}
                <div className={styles.chatWidget}>
                    <div className={styles.chatHeader}>🤖 ADAS Engineering Assistant</div>
                    <div className={styles.chatMessages}>
                        {preloadedMessages.map((msg, i) => (
                            <div key={i} className={`${styles.chatMsg} ${styles[msg.role]}`}>
                                <div>{msg.content}</div>
                                {msg.specs && (
                                    <ul className={styles.specList}>
                                        {msg.specs.map((s, j) => (
                                            <li key={j}>• {s}</li>
                                        ))}
                                    </ul>
                                )}
                                {msg.download && (
                                    <span className={styles.download}>{msg.download}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.chatInputArea}>
                        <input
                            className={styles.chatInput}
                            placeholder="Ask a technical question..."
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {/* Suggested prompts */}
            <div className={styles.promptPills}>
                {suggestedPrompts.map((p, i) => (
                    <button key={i} className={styles.pill}>
                        {p}
                    </button>
                ))}
            </div>
        </div>
    )
}
