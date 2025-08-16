import { reviewService } from "@/lib/reviews/reviewService";
import { NextApiRequest, NextApiResponse } from "next";

// /api/reviews/webhook.ts - For Google My Business webhook (future enhancement)
export async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify webhook signature
    const signature = req.headers['x-google-signature'] as string;
    const isValid = await reviewService.verifyWebhookSignature(
      JSON.stringify(req.body),
      signature
    );

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Process the webhook event
    const { eventType, review } = req.body;

    switch (eventType) {
      case 'review.created':
        await reviewService.handleNewReview(review);
        break;
      case 'review.updated':
        await reviewService.handleUpdatedReview(review);
        break;
      default:
        console.log('Unknown webhook event type:', eventType);
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      error: 'Failed to process webhook',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}