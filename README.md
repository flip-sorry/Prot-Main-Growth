# PandaDoc Main Page

A React + TypeScript implementation of the PandaDoc main page based on Figma designs.

## Features

- Left sidebar navigation with workspace selector
- Main content area with header, search, and action buttons
- Tabbed document view (AI Recap, Drafts, Action required, etc.)
- Document table with status labels, amounts, and dates
- Responsive layout matching the Figma design

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Main layout components
│   ├── navigation/      # Sidebar and nav components
│   ├── header/          # Header components
│   ├── content/         # Main content components
│   └── ui/              # Reusable UI components
├── types/               # TypeScript type definitions
├── data/                # Sample data
└── App.tsx              # Main app component
```

## Design Notes

- Uses Graphik LC Web and Inter fonts (Inter is loaded via Google Fonts)
- Color scheme matches PandaDoc design system
- Component structure follows the Figma design hierarchy

## Notes

- Graphik LC Web font needs to be added separately if available
- Currently using Inter as the primary font with Graphik as fallback
- All components are fully typed with TypeScript
