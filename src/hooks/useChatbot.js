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

    return `📋 **${product.name}**\n${product.description}\n\n${specLines}\n\n📄 Datasheet: ${product.datasheet}`
}

function generateResponse(query) {
    // Check product match first
    const product = findProduct(query)
    if (product) return formatProductResponse(product)

    // Check FAQ match
    const faq = findFaq(query)
    if (faq) return faq.answer

    // Default fallback
    return 'I couldn\'t find specific documentation for that query.\n\nTry the following:\n· Ask by solution name (e.g. "AUTO-Edge V2 specs")\n· Use keywords (PoC, ASIL, AUTOSAR, Euro NCAP, ODD)\n\nOr reach out directly to our engineering team:\n📧 sales@auto-adas.com'
}

const INITIAL_MESSAGES = [
    {
        id: 'welcome',
        role: 'bot',
        text: 'Hello! 👋\nI\'m your ADAS Engineering Assistant.\n\nAsk me about edge AI board specs, Euro NCAP 2026 alignment, ASIL-D certification, or Transformer-based perception.\nExample: "NVIDIA Orin NX edge board specs"',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
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
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
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
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
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
