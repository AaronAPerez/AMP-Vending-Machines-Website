import { createClient } from '@supabase/supabase-js';
import { generateEmailHTML, BUSINESS_INFO } from '@/lib/email/emailBranding';

/**
 * Template Service
 * Fetches email templates from database and renders them with variables
 */

interface EmailTemplate {
  template_id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  is_active: boolean;
}

interface TemplateVariables {
  [key: string]: string;
}

export class TemplateService {
  private static instance: TemplateService;

  private constructor() {}

  public static getInstance(): TemplateService {
    if (!TemplateService.instance) {
      TemplateService.instance = new TemplateService();
    }
    return TemplateService.instance;
  }

  /**
   * Fetch template from database by template_id
   */
  async getTemplate(templateId: string): Promise<EmailTemplate | null> {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Supabase not configured, falling back to default templates');
        return null;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase
        .from('email_templates')
        .select('template_id, name, subject, body, variables, is_active')
        .eq('template_id', templateId)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error(`Error fetching template ${templateId}:`, error);
        return null;
      }

      // Increment usage count (fire and forget - don't await to avoid blocking)
      supabase.rpc('increment_template_usage', { p_template_id: templateId }).then(
        () => console.log(`✅ Incremented usage count for template: ${templateId}`),
        (err) => console.warn(`⚠️ Failed to increment usage count:`, err)
      );

      return data as EmailTemplate;
    } catch (error) {
      console.error('Template fetch error:', error);
      return null;
    }
  }

  /**
   * Render template with variables
   */
  renderTemplate(template: EmailTemplate, variables: TemplateVariables): { subject: string; body: string } {
    let subject = template.subject;
    let body = template.body;

    // Replace all variables in subject and body
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `[${key}]`;
      const safeValue = this.escapeHtml(value || '');
      subject = subject.replace(new RegExp(placeholder, 'g'), safeValue);
      body = body.replace(new RegExp(placeholder, 'g'), safeValue);
    });

    // Wrap body in professional email HTML template
    const wrappedBody = generateEmailHTML(body, subject);

    return {
      subject,
      body: wrappedBody
    };
  }

  /**
   * Get rendered template (fetch + render in one call)
   */
  async getRenderedTemplate(
    templateId: string,
    variables: TemplateVariables
  ): Promise<{ subject: string; body: string } | null> {
    const template = await this.getTemplate(templateId);

    if (!template) {
      return null;
    }

    return this.renderTemplate(template, variables);
  }

  /**
   * Escape HTML to prevent XSS
   */
  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

// Export singleton instance
export const templateService = TemplateService.getInstance();
