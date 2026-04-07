// app/api/marketing/exit-intent/active/route.ts
// PUBLIC endpoint - no auth required
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export const runtime = 'nodejs';
export const revalidate = 60; // Cache for 60 seconds

// Default exit intent content - used as fallback when database is unavailable
const DEFAULT_EXIT_INTENT_CONTENT = {
  headline: "Wait! Don't Miss Out...",
  subheadline: "We'll Beat Any Vending Service Offer!",
  value_proposition: "Join the many qualifying businesses in Modesto & Stanislaus County receiving premium vending solutions - we guarantee to beat any competitor's offer!",
  benefits: [
    "Professional Installation & Setup",
    "Full-Service Maintenance",
    "24/7 Service & Support",
    "Price Match Guarantee"
  ],
  stats: [
    { value: "Full", label: "Service" },
    { value: "24/7", label: "Support" },
    { value: "50+", label: "Products" }
  ],
  special_offer_badge: "PRICE MATCH GUARANTEE",
  primary_cta_text: "Get Your Quote",
  primary_cta_link: "/contact",
  phone_button_text: "Call (209) 403-5450",
  phone_number: "+12094035450"
};

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
        data: DEFAULT_EXIT_INTENT_CONTENT
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
        data: DEFAULT_EXIT_INTENT_CONTENT
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
  } catch (error: unknown) {
    console.error('GET /api/marketing/exit-intent/active error:', error);

    // Return default on error
    return NextResponse.json({
      success: true,
      data: DEFAULT_EXIT_INTENT_CONTENT
    });
  }
}
