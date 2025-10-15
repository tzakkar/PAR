'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/lib/state'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Moon, Sun, Globe, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { UtecLogoCSS } from '@/components/ui/utec-logo'

export function Navbar() {
  const { t, i18n } = useTranslation('common')
  const { isDarkMode, toggleDarkMode, language, setLanguage } = useAppStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Apply RTL to document
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    i18n.changeLanguage(language)
  }, [language, i18n])

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  const navItems = [
    { href: '/', label: t('welcome') },
    { href: '/builder', label: t('createPar') },
    { href: '/about', label: t('about') },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">PAR</span>
          </div>
          <span className="font-bold text-xl">{t('appName')}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* UTEC Logo */}
          <UtecLogoCSS size="sm" className="hidden sm:flex" />
          
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'العربية' : 'English'}
            </span>
          </Button>

          {/* Dark Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
              aria-label={t('darkMode')}
            />
            <Moon className="h-4 w-4" />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

