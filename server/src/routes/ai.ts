import { Router, Request, Response } from 'express'
import axios from 'axios'

const router = Router()

router.post('/plan', async (req: Request, res: Response) => {
  const { budget, people, days, destination } = req.body

  if (!budget || !people || !days) {
    return res.status(400).json({ error: 'budget, people, and days are required' })
  }

  const prompt = `You are a travel planning AI for GRD Travels, a Delhi-based travel company.
Generate a detailed travel plan with the following details:
- Budget: ₹${budget} total
- People: ${people}
- Days: ${days}
${destination ? `- Preferred Destination: ${destination}` : '- Suggest the best destination for this budget'}

Respond ONLY with a valid JSON object (no markdown, no explanation) in this exact format:
{
  "destination": "destination name",
  "vehicle": "recommended vehicle from: Swift Dzire, Ertiga, Innova Crysta, Tempo Traveller 12 Seater, Tempo Traveller 17 Seater, Luxury Tempo Traveller",
  "hotels": [
    {"name": "hotel name", "type": "Budget/Standard/Luxury", "pricePerNight": 1500},
    {"name": "hotel name", "type": "Budget/Standard/Luxury", "pricePerNight": 2500}
  ],
  "itinerary": [
    {"day": 1, "title": "Arrival & Exploration", "activities": ["Activity 1", "Activity 2", "Activity 3"]},
    {"day": 2, "title": "Day title", "activities": ["Activity 1", "Activity 2"]}
  ],
  "estimatedCost": 18000
}`

  try {
    const apiKey = process.env.GEMINI_API_KEY
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }
    )

    const text = response.data.candidates[0].content.parts[0].text
    const jsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const plan = JSON.parse(jsonStr)
    return res.json(plan)
  } catch (err) {
    console.error('Gemini error:', err)
    return res.status(500).json({ error: 'AI service unavailable. Please try again.' })
  }
})

export default router
