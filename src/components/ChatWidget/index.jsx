import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useChatbot from '../../hooks/useChatbot'
import styles from './ChatWidget.module.css'

const SUGGESTED = [
    'AUTO-Edge V2 스펙',
    'PoC/데모 일정 안내',
    'ASIL 인증 지원 문서',
    '샘플 발주 MOQ',
]

export default function ChatWidget() {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const { messages, isTyping, send, clear } = useChatbot()
    const listRef = useRef(null)
    const inputRef = useRef(null)

    // Auto-scroll to bottom
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight
        }
    }, [messages, isTyping])

    // Focus input when opened
    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 300)
        }
    }, [open])

    const handleSend = () => {
        const text = input.trim()
        if (!text) return
        send(text)
        setInput('')
    }

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleSuggested = (text) => {
        send(text)
    }

    return (
        <>
            {/* FAB */}
            <motion.button
                className={styles.fab}
                onClick={() => setOpen((p) => !p)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={open ? '채팅 닫기' : 'AI 상담 열기'}
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            ✕
                        </motion.span>
                    ) : (
                        <motion.span key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
                            💬
                        </motion.span>
                    )}
                </AnimatePresence>
                {!open && <span className={styles.fabPulse} />}
            </motion.button>

            {/* Chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className={styles.panel}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.headerInfo}>
                                <span className={styles.headerDot} />
                                <div>
                                    <strong>AI 기술 상담</strong>
                                    <span className={styles.headerStatus}>온라인 · 즉시 응답</span>
                                </div>
                            </div>
                            <button className={styles.clearBtn} onClick={clear} title="대화 초기화">🗑️</button>
                        </div>

                        {/* Messages */}
                        <div className={styles.messages} ref={listRef}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`${styles.msg} ${styles[msg.role]}`}>
                                    {msg.role === 'bot' && <span className={styles.avatar}>🤖</span>}
                                    <div className={styles.bubble}>
                                        <p className={styles.msgText}>{msg.text}</p>
                                        <span className={styles.msgTime}>{msg.time}</span>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className={`${styles.msg} ${styles.bot}`}>
                                    <span className={styles.avatar}>🤖</span>
                                    <div className={`${styles.bubble} ${styles.typing}`}>
                                        <span className={styles.dot} />
                                        <span className={styles.dot} />
                                        <span className={styles.dot} />
                                    </div>
                                </div>
                            )}

                            {/* Suggested prompts (only if <= 2 messages) */}
                            {messages.length <= 1 && !isTyping && (
                                <div className={styles.suggested}>
                                    {SUGGESTED.map((s) => (
                                        <button key={s} className={styles.pill} onClick={() => handleSuggested(s)}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className={styles.inputArea}>
                            <input
                                ref={inputRef}
                                className={styles.input}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="메시지를 입력하세요..."
                                aria-label="채팅 메시지 입력"
                            />
                            <button
                                className={styles.sendBtn}
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                aria-label="전송"
                            >
                                ↑
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
