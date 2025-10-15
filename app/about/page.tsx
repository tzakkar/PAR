'use client'

import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Info, 
  Shield, 
  Globe, 
  FileText, 
  Download, 
  Share2, 
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Lock
} from 'lucide-react'

export default function AboutPage() {
  const { t } = useTranslation('common')

  const features = [
    {
      icon: FileText,
      title: 'Professional Document Generation',
      description: 'Create industry-standard Project Approval Requests with proper formatting and structure.',
    },
    {
      icon: Globe,
      title: 'Bilingual Support',
      description: 'Full English and Arabic support with proper RTL (Right-to-Left) text direction.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All data stays in your browser. No server storage, no data collection.',
    },
    {
      icon: Download,
      title: 'Multiple Export Formats',
      description: 'Export to Word (.docx) and JSON formats for maximum compatibility.',
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Share documents via secure links that can be viewed by stakeholders.',
    },
  ]

  const faqs = [
    {
      question: 'How do I create a new PAR?',
      answer: 'Click "Create PAR" on the homepage or use the "New PAR" button in the builder. Fill out the multi-step form with your project details.',
    },
    {
      question: 'Can I save my work?',
      answer: 'Yes! Your work is automatically saved to your browser\'s local storage. You can also use the "Save Draft" button to manually save.',
    },
    {
      question: 'How do I export my document?',
      answer: 'Use the export buttons in the command bar to download your PAR as a Word document (.docx) or JSON file.',
    },
    {
      question: 'Can I share my PAR with others?',
      answer: 'Yes! Use the "Share" button to generate a secure link that others can use to view your document.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! All data stays in your browser. We don\'t store anything on our servers.',
    },
    {
      question: 'Can I use this in Arabic?',
      answer: 'Yes! Click the language toggle in the navigation bar to switch between English and Arabic with full RTL support.',
    },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('about')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            PAR Builder is a modern, privacy-focused tool for creating professional Project Approval Requests.
            Built with security and usability in mind.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="mb-12">
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              <strong>Privacy First:</strong> {t('noServerStorage')}
            </AlertDescription>
          </Alert>
        </div>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">1</span>
                </div>
                <CardTitle>Fill the Form</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Use the step-by-step wizard to enter your project details, benefits, risks, and other information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">2</span>
                </div>
                <CardTitle>Preview & Review</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Review your document in real-time as you type. Switch to preview mode to see the final layout.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                  <span className="font-bold">3</span>
                </div>
                <CardTitle>Export & Share</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Export to Word or JSON format, or share a secure link for others to view and approve.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription>
                Create your first Project Approval Request in minutes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/builder">
                <Button size="lg" className="text-lg px-8 py-6">
                  {t('createPar')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

