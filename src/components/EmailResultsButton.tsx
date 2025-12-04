import { useState } from 'react';
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react';
import { sendAnalysisResultsEmail, previewEmail } from '../services/email.service';
import type { AnalysisResults } from '../types/str8up-map.types';

interface EmailResultsButtonProps {
  results: AnalysisResults;
  ctaUrl?: string;
}

export default function EmailResultsButton({ results, ctaUrl }: EmailResultsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const response = await sendAnalysisResultsEmail({
        recipientName: name || undefined,
        recipientEmail: email,
        results: results,
        ctaUrl: ctaUrl,
      });

      if (response.success) {
        setStatus('success');
        setMessage('Email sent successfully! Check your inbox.');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
          setEmail('');
          setName('');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(response.message || 'Failed to send email. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handlePreview = () => {
    previewEmail({
      recipientName: name || 'Valued Customer',
      recipientEmail: email || 'preview@example.com',
      results: results,
      ctaUrl: ctaUrl,
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-white dark:bg-slate-800 text-[#1C2833] dark:text-white border-2 border-[#009B77] rounded-full hover:bg-[#009B77] hover:text-white transition-colors flex items-center gap-2 group"
      >
        <Mail className="w-5 h-5" />
        <span>Email Results</span>
      </button>
    );
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-[#1C2833] dark:text-white">Email Your Results</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
            Name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-[#1C2833] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#009B77] transition-colors"
            disabled={status === 'sending'}
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-[#1C2833] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#009B77] transition-colors"
            disabled={status === 'sending'}
            required
          />
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`flex items-start gap-2 p-3 rounded-lg ${
              status === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400'
            }`}
          >
            {status === 'success' ? (
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <span className="text-sm">{message}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSendEmail}
            disabled={status === 'sending' || !email}
            className="flex-1 px-4 py-3 bg-[#009B77] text-white rounded-lg hover:bg-[#007A5E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'sending' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                <span>Send Email</span>
              </>
            )}
          </button>

          <button
            onClick={handlePreview}
            disabled={status === 'sending'}
            className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Preview email in new window"
          >
            👁️
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
          We'll send a comprehensive analysis report to this email address.
        </p>
      </div>
    </div>
  );
}
