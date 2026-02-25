/**
 * /api/webhook-test.js — Vercel Serverless Function
 *
 * Test endpoint that simulates an n8n webhook response.
 * Used for development/demo when n8n is not connected.
 */

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    const body = req.body

    console.log('[webhook-test] Received webhook payload:', JSON.stringify(body, null, 2))

    // Simulate n8n processing delay
    await new Promise((r) => setTimeout(r, 300))

    return res.status(200).json({
        received: true,
        inquiryId: body.id,
        timestamp: new Date().toISOString(),
        actions: [
            'KakaoTalk notification sent to CEO',
            'Google Sheet row appended',
            'Auto-reply email queued',
        ],
    })
}
