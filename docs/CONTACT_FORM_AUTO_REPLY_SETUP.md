# Contact Form Auto-Reply - Dynamic Template Setup

## Overview

The contact form auto-reply email is now **fully editable** from the admin dashboard! No more hardcoded templates - you can customize the email content, subject line, and messaging anytime without touching code.

## ✨ What Changed

### Before
- ❌ Email template hardcoded in `lib/email/emailBranding.ts`
- ❌ Required code changes to update content
- ❌ No A/B testing capability
- ❌ Difficult to make quick changes

### After
- ✅ Email template stored in database
- ✅ Fully editable from `/admin/marketing/email-templates`
- ✅ Live preview before saving
- ✅ A/B testing ready
- ✅ Instant updates without deployment

## 📁 Files Created/Modified

### New Files

1. **`lib/services/templateService.ts`**
   - Template fetching and rendering service
   - Handles variable replacement ([FirstName], [Company], etc.)
   - Usage tracking and caching
   - Graceful fallback to hardcoded templates

2. **`scripts/add-contact-confirmation-template.sql`**
   - Migration script to add contact-confirmation template
   - Safe to run multiple times (uses ON CONFLICT)
   - Includes default template content

### Modified Files

1. **`scripts/marketing-content-schema.sql`**
   - Added contact-confirmation template to default inserts
   - Template ID: `contact-confirmation`
   - Variables: [FirstName], [LastName], [Company], [Email], [Phone], [Message]

2. **`lib/services/emailService.ts`**
   - Updated `sendContactFormEmails()` to use dynamic templates
   - Falls back to hardcoded template if database unavailable
   - Logs which template source is used

3. **`app/admin/settings/page.tsx`**
   - Fixed page structure and imports
   - Now properly renders SettingsContent component

4. **`components/admin/settings/SettingsContent.tsx`**
   - Fixed layout styling
   - Added proper page container
   - Improved responsive design

5. **`app/admin/preview-contact-email/page.tsx`**
   - Updated instructions to reflect dynamic template
   - Added link to Email Templates manager
   - Included how-to guide

## 🚀 Setup Instructions

### Step 1: Apply Database Migration

**Option A - If you haven't run the marketing schema yet:**
```sql
-- Run in Supabase SQL Editor
-- File: scripts/marketing-content-schema.sql
-- This includes the contact-confirmation template
```

**Option B - If you already have the email_templates table:**
```sql
-- Run in Supabase SQL Editor
-- File: scripts/add-contact-confirmation-template.sql
-- This adds only the contact-confirmation template
```

### Step 2: Verify Template Exists

Check that the template was created:
```sql
SELECT template_id, name, is_active, is_default
FROM email_templates
WHERE template_id = 'contact-confirmation';
```

Expected result:
```
template_id            | name                          | is_active | is_default
-----------------------|-------------------------------|-----------|------------
contact-confirmation   | Contact Form Auto-Reply       | true      | true
```

### Step 3: Test the Integration

1. **Fill out contact form** on your website
2. **Check email logs** - should say "Using dynamic contact confirmation template from database"
3. **Verify customer receives email** with personalized content

## 📝 How to Edit the Template

### Via Admin Dashboard

1. Navigate to **`/admin/marketing/email-templates`**
2. Find template: **"Contact Form Auto-Reply"** (ID: `contact-confirmation`)
3. Click **Edit**
4. Modify:
   - **Subject:** Email subject line
   - **Body:** HTML email content
   - **Variables:** Automatically detected
5. Click **Preview** to see how it looks
6. **Save** changes
7. Changes take effect immediately for new submissions

### Available Variables

Use these placeholders in your template - they'll be replaced with actual values:

| Variable | Replaced With | Example |
|----------|--------------|---------|
| `[FirstName]` | Customer's first name | John |
| `[LastName]` | Customer's last name | Smith |
| `[Company]` | Company name | Acme Corp |
| `[Email]` | Customer's email | john@acme.com |
| `[Phone]` | Phone number | (555) 123-4567 |
| `[Message]` | Their message | "I'm interested in..." |

### Example Template Edit

**Original Subject:**
```
Thank you for contacting AMP Vending, [FirstName]!
```

**Custom Subject:**
```
🎉 Thanks for reaching out, [FirstName]! Let's get you set up.
```

**Original Body:**
```html
<p>Dear [FirstName] [LastName],</p>
<p>Thank you for your interest...</p>
```

**Custom Body:**
```html
<p>Hi [FirstName]! 👋</p>
<p>We're excited to help [Company] get the perfect vending solution!</p>
<p>A team member will call you at [Phone] within 24 hours.</p>
```

## 🎯 Use Cases

### 1. Seasonal Promotions
Create different templates for:
- Holiday specials
- Summer promotions
- Back-to-school offers
- New Year deals

### 2. A/B Testing
Test different approaches:
- Formal vs casual tone
- Short vs detailed
- Different CTAs
- Various value propositions

### 3. Targeted Messaging
Different templates based on:
- Company size
- Industry
- Geographic location
- Product interest

### 4. Quick Updates
Instantly update:
- Contact phone numbers
- Business hours
- Special instructions
- Promotional offers

## 🔍 Preview & Testing

### Preview Page

**URL:** `/admin/preview-contact-email`

Features:
- ✅ Live preview of email
- ✅ Customize test data (name, company, etc.)
- ✅ Open in new tab for full view
- ✅ See exact customer experience

### Testing Flow

1. **Preview** - View in preview page
2. **Test Submit** - Submit test contact form
3. **Check Inbox** - Verify email received
4. **Iterate** - Make adjustments as needed
5. **Deploy** - Activate when satisfied

## 🔧 Troubleshooting

### Template Not Loading

**Symptoms:** Email uses hardcoded fallback template

**Check:**
```bash
# Console logs should show:
✅ Using dynamic contact confirmation template from database

# If you see:
⚠️ Dynamic template not found, using hardcoded fallback
⚠️ Failed to fetch dynamic template, using hardcoded fallback
```

**Solutions:**
1. Verify template exists in database
2. Check template is active: `is_active = true`
3. Check Supabase connection
4. Verify environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Variables Not Replacing

**Symptoms:** Email shows `[FirstName]` instead of actual name

**Check:**
1. Variable names match exactly (case-sensitive)
2. Variables use square brackets: `[FirstName]` not `{FirstName}`
3. Data is being passed to template service

**Solution:**
```typescript
// Correct variable mapping
{
  FirstName: data.firstName,  // Not firstname or first_name
  LastName: data.lastName,
  Company: data.companyName,
  Email: data.email,
  Phone: data.phone || 'Not provided',
  Message: data.message || 'No message provided'
}
```

### Email Not Sending

**Symptoms:** Customer doesn't receive confirmation email

**Check:**
1. RESEND_API_KEY configured
2. FROM_EMAIL verified in Resend
3. Check spam folder
4. Review server logs for errors

**Development Mode:**
- Emails are logged to console, not sent
- Look for email preview in terminal

## 🎨 Styling Guidelines

### HTML Email Best Practices

1. **Use inline styles** - Email clients don't support external CSS
   ```html
   <p style="color: #FD5A1E; font-weight: bold;">
   ```

2. **Tables for layout** - Divs don't work well in email
   ```html
   <table width="100%"><tr><td>...</td></tr></table>
   ```

3. **Test across clients** - Gmail, Outlook, Apple Mail, etc.

4. **Include plain text** version for accessibility

5. **Keep it under 102KB** to avoid Gmail clipping

### AMP Vending Brand Colors

Use these in your templates:
```css
Primary Orange: #FD5A1E
Dark Background: #000000
Light Gray: #F5F5F5
Text Gray: #555555
Success Green: #22c55e
```

## 📊 Analytics & Tracking

### Usage Tracking

The system automatically tracks:
- **usage_count** - Number of times template sent
- **last_used_at** - Most recent send timestamp

### View Template Stats

```sql
SELECT
  template_id,
  name,
  usage_count,
  last_used_at,
  created_at
FROM email_templates
WHERE template_id = 'contact-confirmation';
```

### Future Enhancements

Potential additions:
- Open rate tracking
- Click tracking on CTAs
- A/B test performance comparison
- Template version history
- Scheduled template activation

## 🔐 Security

### XSS Protection

- All variables are HTML-escaped before insertion
- Prevents malicious code injection
- Safe to use user-provided content

### Access Control

- Only admin users can edit templates
- Row Level Security enforced at database level
- Template changes logged to activity log

### Data Privacy

- Customer data not stored in templates
- Variables replaced at send-time only
- Compliant with GDPR/CCPA requirements

## 📚 Additional Resources

### Related Documentation

- [MARKETING_CONTENT_MANAGEMENT.md](./MARKETING_CONTENT_MANAGEMENT.md) - Full marketing system guide
- [EMAIL_MANAGEMENT_GUIDE.md](./EMAIL_MANAGEMENT_GUIDE.md) - Email service documentation
- [Admin Dashboard Guide](./ADMIN_DASHBOARD_IMPLEMENTATION.md) - Admin features overview

### Admin Dashboard Pages

- **Email Templates:** `/admin/marketing/email-templates`
- **Email Preview:** `/admin/preview-contact-email`
- **Email History:** `/admin/emails`
- **Exit Intent:** `/admin/marketing/exit-intent`

### Code References

- Template Service: [lib/services/templateService.ts](lib/services/templateService.ts)
- Email Service: [lib/services/emailService.ts](lib/services/emailService.ts)
- Contact API: [app/api/contact/route.ts](app/api/contact/route.ts)
- Email Branding: [lib/email/emailBranding.ts](lib/email/emailBranding.ts)

## 🎓 Pro Tips

1. **Always Preview** - Check your changes before activating
2. **Test Variables** - Ensure all variables have fallback values
3. **Mobile-First** - Most emails opened on mobile devices
4. **Clear CTAs** - Make buttons obvious and compelling
5. **Personalize** - Use customer's name and company for better engagement
6. **Keep It Short** - People scan emails quickly
7. **Brand Consistency** - Match your website's tone and style
8. **Version Control** - Keep notes on what works best

---

**Last Updated:** 2026-01-30
**Version:** 1.0.0
**Status:** ✅ Active & Production Ready
