# 🌍 WorldExplorer

A comprehensive educational platform for exploring countries, cultures, and landmarks worldwide. Built with Next.js and TypeScript, featuring interactive maps, detailed country information, cultural insights, and engaging educational tools.

---

## ✨ Key Features

### 🗺️ Interactive Exploration

- **Global Search**: Real-time search across countries, cities, landmarks, and institutions
- **Interactive World Map**: Clickable countries with smooth navigation and zoom controls
- **Country Pages**: Comprehensive country profiles with detailed information
- **Browse & Filter**: Advanced filtering by continent, population, and features

### 🏛️ Rich Content

- **Landmarks & Monuments**: Famous buildings, structures, and historical sites
- **Cultural Insights**: Languages, traditions, lifestyle, and cultural practices
- **Geographic Data**: Rivers, mountains, cities, and natural features
- **Educational Institutions**: Universities, museums, and learning centers
- **Currency Information**: Real currency images, exchange rates, and economic data

### 🎮 Interactive Features

- **Quiz System**: Educational quizzes about countries and cultures
- **Interactive Games**: Engaging learning activities and challenges
- **Random Facts**: Discover interesting facts about different countries
- **Historical Timeline**: Explore historical events and periods
- **Nature Explorer**: Discover wildlife, national parks, and natural wonders

### 🌟 Advanced Tools

- **Currency Converter**: Real-time currency exchange rates
- **Weather Widget**: Current weather information for different locations
- **Language Explorer**: Learn about different languages and their origins
- **Environment Dashboard**: Climate data and environmental statistics
- **Global Rankings**: Compare countries by various metrics

### 🎨 User Experience

- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging transitions and interactive elements
- **Accessibility**: Built with accessibility best practices

---

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.1** - UI library with latest features
- **TypeScript 5** - Type-safe development

### UI Components & Styling

- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Next Themes** - Theme switching functionality

### Data & Forms

- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **Date-fns** - Date manipulation utilities

### Charts & Visualization

- **Recharts** - Chart library for data visualization
- **Embla Carousel** - Smooth carousel components

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📂 Project Structure

```bash
WorldExplorer/
├── 📁 app/                   # Next.js App Router pages
│   ├── 📁 browse/            # Browse countries page
│   ├── 📁 country/           # Individual country pages
│   ├── 📁 search/            # Search results page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout component
│   ├── loading.tsx           # Loading UI
│   ├── not-found.tsx         # 404 page
│   └── page.tsx              # Homepage
├── 📁 components/           # Reusable React components
│   ├── 📁 ui/               # Base UI components (Radix UI)
│   ├── browse-filters.tsx    # Country browsing filters
│   ├── country-*.tsx         # Country-specific components
│   ├── global-*.tsx          # Global navigation and search
│   ├── interactive-*.tsx     # Interactive features
│   ├── quiz-system.tsx       # Educational quiz system
│   ├── currency-converter.tsx # Currency conversion tool
│   └── theme-*.tsx           # Theme management
├── 📁 hooks/                 # Custom React hooks
├── 📁 lib/                   # Utility functions and services
├── 📁 public/                # Static assets
├── 📁 styles/                # CSS modules and stylesheets
├── components.json           # Shadcn/ui configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/1046prt/WorldExplorer.git
   cd WorldExplorer
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

---

## 🌟 Key Components

### Global Search

Intelligent search functionality that finds countries, cities, landmarks, and institutions with real-time suggestions and keyboard navigation.

### Country Overview

Comprehensive country information including population, currency, languages, timezones, and cultural data.

### Interactive Games & Quizzes

Educational tools to make learning about geography and cultures engaging and fun.

### Currency Converter

Real-time currency conversion with visual currency representations.

### Theme System

Dark and light theme support with smooth transitions and user preference persistence.

---

## 🎯 Features in Detail

### Search & Discovery

- **Global Search Bar**: Search across all content types
- **Advanced Filters**: Filter by continent, population, language
- **Smart Suggestions**: Autocomplete with relevant results
- **Search Results Page**: Comprehensive search results with pagination

### Country Information

- **Basic Info**: Population, area, capital, languages
- **Geography**: Rivers, mountains, cities, climate
- **Culture**: Traditions, festivals, cuisine, lifestyle
- **Economy**: Currency, GDP, major industries
- **Education**: Universities, institutions, literacy rates
- **History**: Historical events, timeline, heritage sites

### Interactive Elements

- **Clickable Maps**: Interactive world map with country selection
- **Image Galleries**: High-quality photos of landmarks and culture
- **Data Visualizations**: Charts and graphs for statistics
- **Modal Dialogs**: Detailed information in overlay windows

---

## 🔧 Configuration

### Theme Configuration

The application supports both light and dark themes. Theme preference is automatically saved and restored.

### Component Library

Built with Radix UI components for accessibility and customization. Components are configured in `components.json`.

### TypeScript Configuration

Strict TypeScript configuration for type safety and better development experience.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use existing component patterns
- Add proper error handling
- Include responsive design considerations
- Test on multiple devices and browsers

---

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/1046prt/WorldExplorer/issues) page to report bugs or request new features.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

### **Prakash Raj**

- GitHub: [@1046prt](https://github.com/1046prt)

--
