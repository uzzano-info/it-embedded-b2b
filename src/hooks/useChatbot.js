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
    return '죄송합니다. 해당 질문에 대한 정보를 찾지 못했습니다.\n\n다음을 시도해 보세요:\n· 제품명을 포함해서 질문 (예: "MCU-X200 스펙")\n· MOQ, 가격, 리드타임 등 키워드 사용\n\n또는 담당자에게 직접 문의:\n📧 sales@itembedded.com\n💬 카카오톡 채널'
}

const INITIAL_MESSAGES = [
    {
        id: 'welcome',
        role: 'bot',
        text: '안녕하세요! 👋\nIT Embedded AI 기술 상담 봇입니다.\n\n제품 스펙, MOQ, 가격 등을 물어보세요.\n예: "MCU-X200 스펙 알려줘"',
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
