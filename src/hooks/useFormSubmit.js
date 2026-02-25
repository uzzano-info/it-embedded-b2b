import { useState, useCallback } from 'react'

const API_URL = '/api/inquiry'

class DemoFallbackError extends Error {
    constructor() { super('Demo fallback'); this.name = 'DemoFallbackError' }
}

export default function useFormSubmit() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)

    const submit = useCallback(async (formData) => {
        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            // If server returned HTML (404 from Vite dev) or non-JSON, fall back to demo
            const contentType = res.headers.get('content-type') || ''
            if (!contentType.includes('application/json')) {
                throw new DemoFallbackError()
            }

            const data = await res.json()

            if (!res.ok) {
                // 404 = API not deployed yet (dev mode)
                if (res.status === 404) throw new DemoFallbackError()
                throw new Error(data.error || `서버 오류 (${res.status})`)
            }

            setResult(data)
            return data
        } catch (err) {
            // Network error, 404, or non-JSON response — fallback to demo mode
            if (err instanceof DemoFallbackError || err.name === 'TypeError') {
                console.warn('[useFormSubmit] API not available, using demo mode')
                const demoResult = {
                    success: true,
                    inquiryId: `INQ-${Date.now()}`,
                    webhookForwarded: false,
                    message: '접수 완료 (데모 모드). 실제 배포 시 API가 연동됩니다.',
                    demo: true,
                }
                setResult(demoResult)
                return demoResult
            }
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const reset = useCallback(() => {
        setLoading(false)
        setError(null)
        setResult(null)
    }, [])

    return { submit, loading, error, result, reset }
}
