# UptimeRobot Monitoring Setup Guide

This guide explains how to set up UptimeRobot monitoring for AMP Vending Machines website.

## Overview

UptimeRobot monitors your website's availability and alerts you when services go down. We've created a dedicated health check endpoint at `/api/health` that monitors all critical services.

## Health Check Endpoint

**URL:** `https://ampvendingmachines.com/api/health`

### What It Monitors

| Service | Critical | Description |
|---------|----------|-------------|
| Website | Yes | Basic availability (implicit if endpoint responds) |
| Database | Yes | Supabase connectivity and query performance |
| Email | No | Resend API availability |

### Response Format

```json
{
  "status": "healthy",
  "timestamp": "2026-03-12T10:30:00.000Z",
  "version": "1.0.0",
  "uptime": 86400,
  "services": {
    "database": {
      "status": "healthy",
      "message": "Supabase connected",
      "latencyMs": 45
    },
    "email": {
      "status": "healthy",
      "message": "Resend API connected",
      "latencyMs": 120
    },
    "website": {
      "status": "healthy",
      "message": "OK"
    }
  },
  "uptimeKeyword": "healthy"
}
```

### Status Codes

| HTTP Code | Status | Description |
|-----------|--------|-------------|
| 200 | healthy | All services operational |
| 200 | degraded | Non-critical services down (email) |
| 503 | unhealthy | Critical services down (database) |

---

## UptimeRobot Setup Instructions

### Step 1: Create UptimeRobot Account

1. Go to [UptimeRobot](https://uptimerobot.com/)
2. Sign up for a free account (50 monitors included)
3. Verify your email

### Step 2: Configure Primary Monitor (Keyword)

This monitor checks if the site is healthy using keyword detection.

1. Click **"+ Add New Monitor"**
2. Configure as follows:

| Setting | Value |
|---------|-------|
| Monitor Type | HTTP(s) - Keyword |
| Friendly Name | AMP Vending - Health Check |
| URL | `https://ampvendingmachines.com/api/health` |
| Keyword Type | Keyword exists |
| Keyword | `healthy` |
| Monitoring Interval | 5 minutes |

3. Click **"Create Monitor"**

### Step 3: Configure Backup Monitor (HTTP Status)

This monitor provides a secondary check using HTTP status codes.

1. Click **"+ Add New Monitor"**
2. Configure as follows:

| Setting | Value |
|---------|-------|
| Monitor Type | HTTP(s) |
| Friendly Name | AMP Vending - Website |
| URL | `https://ampvendingmachines.com` |
| Monitoring Interval | 5 minutes |

3. Click **"Create Monitor"**

### Step 4: Configure Alert Contacts

1. Go to **"My Settings"** → **"Alert Contacts"**
2. Add alert contacts:
   - **Email:** ampdesignandconsulting@gmail.com
   - **SMS:** (optional, requires Pro plan)
   - **Slack/Discord:** (optional webhook integration)

3. Edit each monitor and enable notifications for your contacts

### Step 5: Configure Additional Monitors (Recommended)

#### Contact Form API Monitor
| Setting | Value |
|---------|-------|
| Monitor Type | HTTP(s) |
| Friendly Name | AMP Vending - Contact API |
| URL | `https://ampvendingmachines.com/api/contact` |
| HTTP Method | GET |
| Monitoring Interval | 5 minutes |

#### SSL Certificate Monitor
| Setting | Value |
|---------|-------|
| Monitor Type | HTTP(s) |
| Friendly Name | AMP Vending - SSL |
| URL | `https://ampvendingmachines.com` |
| Monitoring Interval | 1 day |
| SSL Expiry Alert | 14 days before expiry |

---

## Status Page (Optional)

Create a public status page for customers:

1. Go to **"Status Pages"** → **"Add Status Page"**
2. Configure:
   - **Name:** AMP Vending Status
   - **Custom Domain:** status.ampvendingmachines.com (optional)
3. Add all your monitors to the status page
4. Share URL with stakeholders

---

## Webhook Integration (Advanced)

For custom alerting, you can send webhooks to your own endpoint:

1. Go to **"Alert Contacts"** → **"Add Contact"**
2. Select **"Webhook"**
3. Configure webhook URL and payload

### Example Webhook Payload

```json
{
  "monitor": {
    "name": "*monitorFriendlyName*",
    "url": "*monitorURL*"
  },
  "alert": {
    "type": "*alertType*",
    "datetime": "*alertDateTime*"
  }
}
```

---

## Testing the Setup

### Manual Test

```bash
# Test health endpoint
curl -s https://ampvendingmachines.com/api/health | jq

# Test HEAD request (lightweight)
curl -I https://ampvendingmachines.com/api/health
```

### Expected Response

```bash
HTTP/2 200
content-type: application/json
cache-control: no-store, no-cache, must-revalidate
x-response-time: 150ms
```

---

## Troubleshooting

### Monitor Shows "Down"

1. **Check deployment status** - Verify the site is deployed on Vercel
2. **Check environment variables** - Ensure Supabase credentials are set
3. **Check Supabase status** - Visit [status.supabase.com](https://status.supabase.com)
4. **Check Vercel logs** - Review function logs for errors

### False Positives

If you're getting false "down" alerts:

1. Increase monitoring interval to 10 minutes
2. Add retry on failure (UptimeRobot Pro feature)
3. Check if Vercel cold starts are causing timeouts

### Email Alerts Not Working

1. Check spam folder
2. Verify alert contact is enabled
3. Check that monitor has alert contact assigned

---

## Best Practices

1. **Use keyword monitoring** for health endpoints (more reliable than HTTP status)
2. **Set appropriate intervals** - 5 minutes is good balance
3. **Configure multiple alert methods** - Email + Slack/SMS
4. **Create incident response plan** - Document what to do when alerts fire
5. **Test failover periodically** - Ensure alerts work as expected

---

## Environment Variables

Ensure these are set in production for full health monitoring:

```env
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Application
NODE_ENV=production
```

---

## Recommended Monitor Configuration

| Monitor | Type | Interval | Alert After |
|---------|------|----------|-------------|
| Health Check (Keyword) | Keyword | 5 min | 1 failure |
| Website Homepage | HTTP(s) | 5 min | 2 failures |
| Contact API | HTTP(s) | 15 min | 2 failures |
| SSL Certificate | HTTP(s) | 1 day | 14 days before expiry |

---

## Related Documentation

- [Contact Form Monitoring](./CONTACT_FORM_MONITORING_SETUP.md)
- [API Testing Guide](./API_TESTING_GUIDE.md)
- [Environment Variables](../ENVIRONMENTAL_VARIABLES.md)
