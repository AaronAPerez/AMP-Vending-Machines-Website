// app/api/marketing/exit-intent/active/route.ts
// PUBLIC endpoint - no auth required
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export const runtime = 'nodejs';
export const revalidate = 60; // Cache for 60 seconds

/**
 * GET /api/marketing/exit-intent/active
 * Get the currently active exit intent setting (PUBLIC endpoint)
 */
export async function GET() {
  try {
    if (!supabaseServer) {
      // Fallback to default if database not available
      return NextResponse.json({
        success: true,
        data: {
          headline: "Wait! Don't Miss Out...",
          subheadline: "Get a FREE Vending Machine!",
          value_proposition: "Join the many businesses in Modesto & Stanislaus County providing premium vending at zero cost!",
          benefits: [
            "100% FREE Installation & Setup",
            "NO Upfront Costs or Contracts",
            "24/7 Service & Support",
            "Wide Product Selection"
          ],
          stats: [
            { value: "100% Free", label: "Setup" },
            { value: "24/7", label: "Service" },
            { value: "50+", label: "Products" }
          ],
          special_offer_badge: "LIMITED TIME OFFER",
          primary_cta_text: "Get Your Free Machine",
          primary_cta_link: "/contact",
          phone_button_text: "Call (209) 403-5450",
          phone_number: "+12094035450"
        }
      });
    }

    const { data: setting, error } = await supabaseServer
      .from('exit_intent_settings')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error || !setting) {
      // Return default if no active setting found
      return NextResponse.json({
        success: true,
        data: {
          headline: "Wait! Don't Miss Out...",
          subheadline: "Get a FREE Vending Machine!",
          value_proposition: "Join the many businesses in Modesto & Stanislaus County providing premium vending at zero cost!",
          benefits: [
            "100% FREE Installation & Setup",
            "NO Upfront Costs or Contracts",
            "24/7 Service & Support",
            "Wide Product Selection"
          ],
          stats: [
            { value: "100% Free", label: "Setup" },
            { value: "24/7", label: "Service" },
            { value: "50+", label: "Products" }
          ],
          special_offer_badge: "LIMITED TIME OFFER",
          primary_cta_text: "Get Your Free Machine",
          primary_cta_link: "/contact",
          phone_button_text: "Call (209) 403-5450",
          phone_number: "+12094035450"
        }
      });
    }

    // Update last_used_at timestamp
    await supabaseServer
      .from('exit_intent_settings')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', setting.id);

    // Return only the necessary fields for the popup
    return NextResponse.json({
      success: true,
      data: {
        headline: setting.headline,
        subheadline: setting.subheadline,
        value_proposition: setting.value_proposition,
        benefits: setting.benefits,
        stats: setting.stats,
        special_offer_badge: setting.special_offer_badge,
        primary_cta_text: setting.primary_cta_text,
        primary_cta_link: setting.primary_cta_link,
        phone_button_text: setting.phone_button_text,
        phone_number: setting.phone_number
      }
    });
  } catch (error: any) {
    console.error('GET /api/marketing/exit-intent/active error:', error);

    // Return default on error
    return NextResponse.json({
      success: true,
      data: {
        headline: "Wait! Don't Miss Out...",
        subheadline: "Get a FREE Vending Machine!",
        value_proposition: "Join the many businesses in Modesto & Stanislaus County providing premium vending at zero cost!",
        benefits: [
          "100% FREE Installation & Setup",
          "NO Upfront Costs or Contracts",
          "24/7 Service & Support",
          "Wide Product Selection"
        ],
        stats: [
          { value: "100% Free", label: "Setup" },
          { value: "24/7", label: "Service" },
          { value: "50+", label: "Products" }
        ],
        special_offer_badge: "LIMITED TIME OFFER",
        primary_cta_text: "Get Your Free Machine",
        primary_cta_link: "/contact",
        phone_button_text: "Call (209) 403-5450",
        phone_number: "+12094035450"
      }
    });
  }
}
