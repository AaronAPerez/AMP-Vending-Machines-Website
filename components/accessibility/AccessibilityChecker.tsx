'use client';

import { useEffect, useState } from 'react';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

interface AccessibilityIssue {
  type: 'error' | 'warning';
  element: string;
  issue: string;
  fix: string;
}

/**
 * Development-only component to check accessibility issues
 * Only renders in development mode
 */
export function AccessibilityChecker() {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;
    
    const checkAccessibility = () => {
      const foundIssues: AccessibilityIssue[] = [];
      
      // Check for images without alt text
      document.querySelectorAll('img:not([alt])').forEach(img => {
        foundIssues.push({
          type: 'error',
          element: img.outerHTML.substring(0, 50) + '...',
          issue: 'Missing alt attribute',
          fix: 'Add alt="" for decorative images or descriptive alt text'
        });
      });
      
      // Check for buttons without accessible names
      document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(btn => {
        if (!btn.textContent?.trim()) {
          foundIssues.push({
            type: 'error',
            element: btn.outerHTML.substring(0, 50) + '...',
            issue: 'Button has no accessible name',
            fix: 'Add aria-label or visible text content'
          });
        }
      });
      
      // Check for form inputs without labels
      document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach(input => {
        const inputId = input.getAttribute('id');
        if (!inputId || !document.querySelector(`label[for="${inputId}"]`)) {
          foundIssues.push({
            type: 'error',
            element: input.outerHTML.substring(0, 50) + '...',
            issue: 'Form input missing label',
            fix: 'Add <label> element or aria-label attribute'
          });
        }
      });
      
      // Check for links without href or accessible name
      document.querySelectorAll('a:not([href])').forEach(link => {
        foundIssues.push({
          type: 'warning',
          element: link.outerHTML.substring(0, 50) + '...',
          issue: 'Link missing href attribute',
          fix: 'Add href or use <button> instead'
        });
      });
      
      // Check heading hierarchy
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      let lastLevel = 0;
      headings.forEach(heading => {
        const level = parseInt(heading.tagName[1]);
        if (level - lastLevel > 1) {
          foundIssues.push({
            type: 'warning',
            element: heading.outerHTML.substring(0, 50) + '...',
            issue: `Heading level skipped (${lastLevel} to ${level})`,
            fix: 'Use sequential heading levels'
          });
        }
        lastLevel = level;
      });
      
      setIssues(foundIssues);
    };
    
    // Run check after DOM is ready
    setTimeout(checkAccessibility, 1000);
  }, []);
  
  if (process.env.NODE_ENV !== 'development' || !isChecking && issues.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 max-w-md z-50">
      <button
        onClick={() => setIsChecking(!isChecking)}
        className="mb-2 px-4 py-2 bg-[#FD5A1E] text-white rounded-lg shadow-lg hover:bg-[#FD5A1E]/90 transition-colors"
        aria-label="Toggle accessibility checker"
      >
        {isChecking ? 'Hide' : 'Show'} A11y Issues ({issues.length})
      </button>
      
      {isChecking && (
        <div className="bg-[#111111] border border-[#FD5A1E] rounded-lg p-4 shadow-xl max-h-96 overflow-y-auto">
          <h3 className="text-[#F5F5F5] font-bold mb-3 flex items-center">
            <AlertCircleIcon size={20} className="mr-2 text-[#FD5A1E]" />
            Accessibility Issues
          </h3>
          
          {issues.length === 0 ? (
            <div className="flex items-center text-green-400">
              <CheckCircleIcon size={20} className="mr-2" />
              No issues found!
            </div>
          ) : (
            <ul className="space-y-3">
              {issues.map((issue, index) => (
                <li key={index} className="border-l-2 border-[#FD5A1E] pl-3">
                  <div className={`text-xs font-bold mb-1 ${
                    issue.type === 'error' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {issue.type.toUpperCase()}
                  </div>
                  <div className="text-[#A5ACAF] text-sm mb-1">{issue.issue}</div>
                  <div className="text-[#F5F5F5] text-xs font-mono bg-[#000000] p-1 rounded mb-1 overflow-x-auto">
                    {issue.element}
                  </div>
                  <div className="text-[#FD5A1E] text-xs">Fix: {issue.fix}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}