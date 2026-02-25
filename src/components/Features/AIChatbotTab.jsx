import styles from './Features.module.css'

const features = [
    {
        title: '초정밀 센서 기술 사양 즉시 응답',
        desc: 'FOV, Point cloud 해상도, 연산 성능 등 엔지니어의 디테일한 기술 질문에 답변합니다.',
    },
    {
        title: '1-클릭 데이터시트 제공',
        desc: "'초저지연 AI 보드 데이터시트 줘' → 최신 PDF 링크 바로 제공.",
    },
    {
        title: '프로토콜 및 아키텍처 가이드',
        desc: 'CAN-FD 연동 방법, 센서 마운팅 위치 권장 가이드 등 기술 레퍼런스 제시.',
    },
    {
        title: 'PoC 및 커스텀 로직 담당자 연결',
        desc: '특수 로직 통합이나 양산형 모델 가격 문의는 담당 영업/엔지니어에게 라우팅.',
    },
]

const preloadedMessages = [
    { role: 'user', content: 'ISO 26262 ASIL-D 인증을 위한 문서화 지원이 되나요?' },
    {
        role: 'bot',
        content: '네, 제공되는 풀 ADAS 통합 보드는 ISO 26262 ASIL-D 규격을 만족하며, 인증 대응을 위한 필수 산출물을 함께 제공합니다.',
        specs: [
            'ASIL-D 지원 락스텝 코어',
            'ISO/SAE 21434 사이버 보안 대응',
            'AUTOSAR Classic/Adaptive 지원',
        ],
        download: '📎 기능 안전 가이드북 (PDF, 5.1MB)',
    },
]

const suggestedPrompts = [
    '통합 보드 발열량은?',
    '기존 레이더와 호환되나요?',
    '데이터시트 다운로드',
    'PoC 진행 절차 안내',
]

export default function AIChatbotTab() {
    return (
        <div>
            <p className={styles.tabHeadline}>
                {'글로벌 OEM 엔지니어의 스펙 문의부터\nASIL 인증 여부까지, AI가 즉시 답변합니다.'}
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
