import { useState, useCallback, useRef } from 'react'
import { products, faqs } from '../data/knowledgeBase'

function findProduct(query) {
    const q = query.toLowerCase()
    return products.find((p) =>
        p.keywords.some((kw) => q.includes(kw.toLowerCase()))
    )
}

function findFaq(query) {
    const q = query.toLowerCase()
    return faqs.find((faq) =>
        faq.keywords.some((kw) => q.includes(kw.toLowerCase()))
    )
}

function formatProductResponse(product) {
    const specLines = Object.entries(product.specs)
        .map(([k, v]) => `· ${k.toUpperCase()}: ${v}`)
        .join('\n')

    return `📋 **${product.name}**\n${product.description}\n\n${specLines}\n\n📄 데이터시트: ${product.datasheet}`
}

function generateResponse(query) {
    // Check product match first
    const product = findProduct(query)
    if (product) return formatProductResponse(product)

    // Check FAQ match
    const faq = findFaq(query)
    if (faq) return faq.answer

    // Default fallback
    return '해당 기술 문서에 대한 상세 정보를 찾을 수 없습니다.\n\n다음을 시도해 보세요:\n· 솔루션명으로 질문 (예: "AUTO-Edge V2 스펙")\n· 질문 키워드 (PoC, ASIL, 커스텀 하드웨어, 문서화)\n\n또는 양산 엔지니어에게 다이렉트로 문의하세요:\n📧 sales@auto-adas.com'
}

const INITIAL_MESSAGES = [
    {
        id: 'welcome',
        role: 'bot',
        text: '안녕하세요! 👋\nAUTO-ADAS 엔지니어 전용 기술 봇입니다.\n\nEdge AI 보드의 스펙, PoC 과정, 기능안전 인증(ASIL) 문서 등을 즉각적으로 열람해 보세요.\n예: "오린 NX 엣지보드 스펙"',
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    },
]

export default function useChatbot() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [isTyping, setIsTyping] = useState(false)
    const idRef = useRef(1)

    const send = useCallback((text) => {
        const userMsg = {
            id: `user-${idRef.current++}`,
            role: 'user',
            text,
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        }

        setMessages((prev) => [...prev, userMsg])
        setIsTyping(true)

        // Simulate typing delay (300-800ms)
        const delay = 300 + Math.random() * 500
        setTimeout(() => {
            const response = generateResponse(text)
            const botMsg = {
                id: `bot-${idRef.current++}`,
                role: 'bot',
                text: response,
                time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            }
            setMessages((prev) => [...prev, botMsg])
            setIsTyping(false)
        }, delay)
    }, [])

    const clear = useCallback(() => {
        setMessages(INITIAL_MESSAGES)
        setIsTyping(false)
        idRef.current = 1
    }, [])

    return { messages, isTyping, send, clear }
}
