/**
 * /api/inquiry.js — Vercel Serverless Function
 *
 * Receives form data from the ConversionForm, validates it,
 * forwards it to the n8n webhook, and returns a confirmation.
 *
 * Environment variables required:
 *   N8N_WEBHOOK_URL — The n8n webhook trigger URL
 */

const REQUIRED = ['company', 'name', 'email', 'inquiryType']

export default async function handler(req, res) {
    // CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    try {
        const body = req.body

        // Validate required fields
        const missing = REQUIRED.filter((f) => !body[f]?.trim?.())
        if (missing.length) {
            return res.status(400).json({
                error: 'Missing required fields',
                fields: missing,
            })
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }

        // Build inquiry record
        const inquiry = {
            id: `INQ-${Date.now()}`,
            timestamp: new Date().toISOString(),
            company: body.company,
            name: body.name,
            email: body.email,
            phone: body.phone || '',
            websiteUrl: body.websiteUrl || '',
            inquiryType: body.inquiryType,
            budget: body.budget || 'undecided',
            message: body.message || '',
            source: 'landing-page',
            userAgent: req.headers['user-agent'] || '',
        }

        // Forward to n8n webhook (if configured)
        const webhookUrl = process.env.N8N_WEBHOOK_URL
        let webhookOk = false

        if (webhookUrl) {
            try {
                const webhookRes = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inquiry),
                    signal: AbortSignal.timeout(5000),
                })
                webhookOk = webhookRes.ok
            } catch (err) {
                console.error('[webhook] n8n forward failed:', err.message)
                // Don't fail the request if webhook is down
            }
        }

        return res.status(200).json({
            success: true,
            inquiryId: inquiry.id,
            webhookForwarded: webhookOk,
            message: '접수 완료. 24시간 내에 진단 리포트를 보내드리겠습니다.',
        })
    } catch (err) {
        console.error('[inquiry] Error:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
}
