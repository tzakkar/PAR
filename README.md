# PAR Builder

A production-ready, no-database SaaS application for creating professional Project Approval Requests (PAR) with bilingual support (English/Arabic) and RTL layout.

## 🚀 Features

- **Multi-step Form Wizard**: Comprehensive PAR creation with real-time validation
- **Live Document Preview**: See your document as you type with professional formatting
- **Bilingual Support**: Full English and Arabic support with proper RTL layout
- **Export Options**: Download as Word (.docx) or JSON format
- **Share System**: Generate secure links for stakeholders to view documents
- **Privacy First**: All data stays in your browser - no server storage
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Keyboard navigable with ARIA support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Shadcn UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **Internationalization**: i18next (EN/AR + RTL)
- **Document Generation**: docx npm package
- **File Downloads**: file-saver
- **Testing**: Vitest + React Testing Library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd par-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
par-builder/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Marketing pages
│   ├── builder/           # PAR builder interface
│   ├── share/             # Shared document viewer
│   ├── about/             # About page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Steps/            # Wizard step components
│   ├── Navbar.tsx        # Navigation bar
│   ├── CommandBar.tsx    # Action toolbar
│   ├── Wizard.tsx        # Main wizard component
│   └── DocumentPreview.tsx # Document preview
├── lib/                  # Utility libraries
│   ├── schema.ts         # Zod validation schema
│   ├── state.ts          # Zustand store
│   ├── exportDocx.ts     # Word document generation
│   ├── exportJson.ts     # JSON export
│   ├── importJson.ts     # JSON import
│   ├── share.ts          # Share link system
│   ├── i18n.ts           # Internationalization
│   └── utils.ts          # Utility functions
├── types/                # TypeScript type definitions
├── locales/              # Translation files
│   ├── en/               # English translations
│   └── ar/               # Arabic translations
├── styles/               # Global styles
└── tests/                # Test files
```

## 🎯 Usage

### Creating a PAR

1. **Start**: Click "Create PAR" on the homepage
2. **Fill Form**: Use the step-by-step wizard to enter:
   - Project Details (name, program, duration, priority)
   - Benefits & Impact Analysis
   - Risk Analysis with likelihood/impact assessment
   - Contracting Approach
   - Budget & Timeline
   - Approval & Attachments
3. **Preview**: Switch to preview mode to see the final document
4. **Export**: Download as Word document or JSON
5. **Share**: Generate a secure link for stakeholders

### Managing Data

- **Auto-save**: Your work is automatically saved to browser storage
- **Manual Save**: Use "Save Draft" to explicitly save your progress
- **Import**: Load previously exported JSON files
- **Clear**: Reset all data (with confirmation)

### Sharing Documents

- **Generate Link**: Use the "Share" button to create a secure URL
- **View Shared**: Access shared documents at `/share#data=<encoded-data>`
- **Export from Share**: Download or print from the shared view

## 🌐 Internationalization

### Adding Translations

1. **English**: Edit `locales/en/common.json`, `locales/en/form.json`, `locales/en/doc.json`
2. **Arabic**: Edit `locales/ar/common.json`, `locales/ar/form.json`, `locales/ar/doc.json`

### Translation Keys

- `common.*`: General UI text (buttons, navigation, messages)
- `form.*`: Form labels, placeholders, validation messages
- `doc.*`: Document headings and content labels

### RTL Support

The application automatically applies RTL layout when Arabic is selected:
- Text direction: `dir="rtl"`
- CSS classes: RTL-specific styling
- Document layout: Mirrored for Arabic documents

## 🎨 Theming

### Dark/Light Mode

- Toggle in the navigation bar
- Preferences saved to localStorage
- Automatic system preference detection

### Customizing Styles

- **Colors**: Modify CSS variables in `styles/globals.css`
- **Components**: Update Tailwind classes in component files
- **Print Styles**: Customize `styles/print.css` for document printing

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### Test Coverage

- **Schema Validation**: Zod schema tests for data validation
- **Export Functions**: Document generation and file handling
- **Share System**: URL encoding/decoding and data integrity

## 📝 Adding New Fields

### 1. Update Types

Add new fields to `types/par.ts`:

```typescript
export interface ParData {
  // ... existing fields
  newField: string
  newArray: string[]
}
```

### 2. Update Schema

Add validation to `lib/schema.ts`:

```typescript
export const ParDataSchema = z.object({
  // ... existing fields
  newField: z.string().min(1, 'New field is required'),
  newArray: z.array(z.string()).min(1, 'At least one item required'),
})
```

### 3. Update Default Data

Add default values in `lib/schema.ts`:

```typescript
export const defaultParData: ParData = {
  // ... existing fields
  newField: 'Default value',
  newArray: ['Default item'],
}
```

### 4. Update Form Components

Add form fields to the appropriate step component in `components/Steps/`.

### 5. Update Document Preview

Add the new fields to `components/DocumentPreview.tsx`.

### 6. Update Export Functions

Include new fields in `lib/exportDocx.ts` for Word document generation.

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Optional: Custom configuration
NEXT_PUBLIC_APP_NAME="PAR Builder"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### Build Configuration

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Code formatting with Tailwind plugin
- **Tailwind**: Custom theme with CSS variables

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build**: Vercel automatically detects Next.js
3. **Deploy**: Push to main branch triggers automatic deployment

### Other Platforms

The application is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any platform supporting Node.js

### Build Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔒 Privacy & Security

### Data Handling

- **No Server Storage**: All data remains in the user's browser
- **Local Storage**: Drafts saved to browser's localStorage
- **Share Links**: Data encoded in URL hash (client-side only)
- **No Tracking**: No analytics or user tracking

### Security Features

- **Input Validation**: Zod schema validation for all form data
- **XSS Protection**: React's built-in XSS protection
- **CSP Headers**: Content Security Policy for additional security
- **HTTPS Only**: Secure connections in production

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `npm test`
6. Commit your changes: `git commit -m 'Add new feature'`
7. Push to the branch: `git push origin feature/new-feature`
8. Submit a pull request

### Code Style

- **TypeScript**: Strict mode, no `any` types
- **React**: Functional components with hooks
- **Styling**: TailwindCSS utility classes
- **Formatting**: Prettier with Tailwind plugin

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues

**Q: My document doesn't export properly**
A: Ensure all required fields are filled and try refreshing the page.

**Q: Arabic text doesn't display correctly**
A: Make sure your browser supports Arabic fonts and RTL text direction.

**Q: Share links don't work**
A: Check that the URL is complete and hasn't been truncated.

**Q: Data is lost after refresh**
A: Data is saved to localStorage. Check if you have sufficient storage space.

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions

## 🎉 Acknowledgments

- **Next.js Team**: For the excellent framework
- **TailwindCSS**: For the utility-first CSS framework
- **Shadcn**: For the beautiful UI components
- **i18next**: For internationalization support
- **docx**: For Word document generation

---

Built with ❤️ for creating professional Project Approval Requests.