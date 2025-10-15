'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  FileText, 
  Eye, 
  Download, 
  Globe, 
  Shield, 
  Zap, 
  Smartphone,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Info
} from 'lucide-react'

export default function LandingPage() {
  const { t } = useTranslation('common')

  const features = [
    {
      icon: FileText,
      title: t('professionalOutput'),
      description: 'Generate professional documents that match industry standards and requirements.',
    },
    {
      icon: Globe,
      title: t('bilingualSupport'),
      description: 'Full support for English and Arabic with proper RTL layout and typography.',
    },
    {
      icon: Shield,
      title: t('noDatabase'),
      description: 'No database required - all data stays in your browser for maximum privacy.',
    },
    {
      icon: Zap,
      title: t('realTimePreview'),
      description: 'See changes instantly as you type with live document preview.',
    },
    {
      icon: Smartphone,
      title: t('responsiveDesign'),
      description: 'Works perfectly on desktop, tablet, and mobile devices.',
    },
    {
      icon: Users,
      title: t('easySharing'),
      description: 'Share documents with stakeholders through secure, temporary links.',
    },
  ]

  const steps = [
    {
      number: 1,
      title: t('inputData'),
      description: t('inputDescription'),
      icon: FileText,
    },
    {
      number: 2,
      title: t('previewDocument'),
      description: t('previewDescription'),
      icon: Eye,
    },
    {
      number: 3,
      title: t('exportShare'),
      description: t('exportDescription'),
      icon: Download,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('tagline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="text-lg px-8 py-6">
                {t('getStarted')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                {t('learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="py-8 px-4 bg-muted/50">
        <div className="container mx-auto">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('noServerStorage')}
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t('howItWorks')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <Card key={step.number} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t('step')} {step.number}: {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t('features')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to create your PAR?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('builtWith')}
          </p>
          <Link href="/builder">
            <Button size="lg" className="text-lg px-8 py-6">
              {t('createPar')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

