# ALRawafed AlMuttahida (Rwafed United) - Frontend

This is the frontend application for the **ALRawafed AlMuttahida** official website, a high-performance landing page and corporate site built with **Next.js 16** and integrated with **Strapi CMS**.

## 🚀 Features

- **🌐 Multi-language Support**: Full Internationalization (i18n) for Arabic and English using `next-intl`.
- **🏗️ Strapi Integration**: Fully dynamic content management for Pages (About, Services, Contact) and Global Settings.
- **✨ Premium UI/UX**: Built with Framer Motion for smooth animations and a premium look.
- **🌙 Dark Mode**: Native support for dark and light themes using `next-themes`.
- **📱 Fully Responsive**: Optimized for all devices from mobile to ultra-wide desktops.
- **⚡ Performance**: Leveraging Next.js Server Components and ISR for lightning-fast loading.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **CMS**: [Strapi](https://strapi.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **I18n**: [next-intl](https://next-intl-docs.vercel.app/)

## 📁 Project Structure

```text
src/
├── app/                 # Next.js App Router (Locale-based routing)
├── components/          # Reusable UI components & sections
│   ├── shared/          # Navbar, Footer, etc.
│   ├── sections/        # Page-specific sections (Contact, Home, etc.)
│   └── ui/             # Atomic UI components
├── services/           # Strapi API service & Mappers
├── types/              # TypeScript definitions (Strapi DTOs)
├── navigation.ts       # Shared navigation logic for i18n
└── styles/             # Global CSS & Tailwind styles
```

## � Getting Started

### Prerequisites

- Node.js 18+ 
- Running Strapi Backend (on port 1337 by default)

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
npm run start
```

## 🔧 Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
```

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for **ALRawafed AlMuttahida**
