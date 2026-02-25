import styles from './Features.module.css'

const features = [
    {
        title: '기술 사양 자동 응답',
        desc: '동작 온도, 입력 전압, 통신 프로토콜 — 학습된 스펙 기반으로 즉시 답변합니다.',
    },
    {
        title: '데이터시트 즉시 제공',
        desc: "'MCU-X200 데이터시트 보여줘' → PDF 링크 또는 인라인 스펙 테이블 자동 제공.",
    },
    {
        title: '다국어 지원 (한/영)',
        desc: '바이어의 언어를 자동 감지하여 한국어 또는 영어로 응답합니다.',
    },
    {
        title: '복잡한 문의 → 담당자 즉시 연결',
        desc: '커스텀 펌웨어, 대량 발주 등 AI가 판단할 수 없는 문의는 자동으로 담당자에게 전달.',
    },
]

const preloadedMessages = [
    { role: 'user', content: 'MCU-X200의 동작 온도 범위가 어떻게 되나요?' },
    {
        role: 'bot',
        content: 'MCU-X200의 동작 온도 범위는 -40°C ~ +85°C (산업용 등급)입니다.',
        specs: [
            'CPU: ARM Cortex-M7, 480MHz',
            'RAM: 512KB SRAM',
            '통신: UART, SPI, I2C, Ethernet',
            '인증: CE, FCC, KC',
        ],
        download: '📎 데이터시트 다운로드 (PDF, 2.4MB)',
    },
]

const suggestedPrompts = [
    '입력 전압 범위는?',
    'MOQ가 어떻게 되나요?',
    '데이터시트 보내줘',
    '커스텀 펌웨어 가능한가요?',
]

export default function AIChatbotTab() {
    return (
        <div>
            <p className={styles.tabHeadline}>
                {'새벽 3시, 독일 바이어가 데이터시트를 요청합니다.\nAI가 즉시 응대합니다.'}
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
                    <div className={styles.chatHeader}>🤖 AI 기술 상담</div>
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
                            placeholder="질문을 입력하세요..."
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
