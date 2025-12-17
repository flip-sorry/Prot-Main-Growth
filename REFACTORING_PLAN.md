# Code Refactoring Plan

## Overview
This document outlines a comprehensive refactoring plan to:
1. **Centralize asset management** - Organize all SVG icons, images, and static assets
2. **Establish design token system** - Create a unified design token structure
3. **Unify repeated components** - Consolidate similar components and patterns

---

## 1. Asset Management

### Current State
- Icons are inline SVGs embedded in `src/components/ui/icons/index.tsx`
- Only `react.svg` exists in `src/assets/`
- No centralized asset management system

### Proposed Structure
```
src/
├── assets/
│   ├── icons/
│   │   ├── navigation/        # Navigation icons (Home, Documents, Templates, Contacts, More)
│   │   ├── actions/           # Action icons (Search, MoreOptions, ChevronDown, etc.)
│   │   ├── documents/         # Document-related icons (DocumentPortrait, DocumentImage, etc.)
│   │   └── workspace/         # Workspace icons (Star, Chevron)
│   ├── images/                # Image assets (if any)
│   └── fonts/                 # Custom font files (Graphik LC Web if available)
```

### Actions Required
1. **Extract SVG icons** from `icons/index.tsx` into separate files
2. **Create icon component factory** - Unified icon component with consistent props
3. **Add icon type definitions** - TypeScript types for icon names and props
4. **Create asset index** - Central export file for all assets

### Benefits
- Better tree-shaking (only import what you need)
- Easier to maintain and update icons
- Consistent icon API across the app
- Better organization and discoverability

---

## 2. Design Token System

### Current State
- Partial tokens in `tailwind.config.js` (colors, fonts, shadows)
- Many hardcoded values throughout components:
  - Colors: `#248567`, `#1f6f54`, `rgba(118,118,118,0.08)`, `#ff9045`, `#474747`, `#767676`
  - Spacing: Hardcoded padding/margin values
  - Typography: Inline `fontFamily` styles, hardcoded font sizes
  - Transitions: Repeated `transition-colors duration-150`

### Proposed Structure
```
src/
├── tokens/
│   ├── colors.ts              # Color palette and semantic colors
│   ├── typography.ts           # Font families, sizes, weights, line heights
│   ├── spacing.ts              # Spacing scale
│   ├── shadows.ts              # Shadow definitions
│   ├── borders.ts              # Border radius, widths
│   ├── transitions.ts          # Transition durations and easings
│   └── index.ts                # Central export
```

### Design Tokens to Extract

#### Colors
```typescript
// Semantic colors
primary: {
  base: '#248567',
  hover: '#1f6f54',
  light: 'rgba(36, 133, 103, 0.08)',
}
text: {
  dark: '#181818',
  light: '#474747',
  lighter: '#767676',
}
status: {
  orange: '#ff9045',
  orangeLight: 'rgba(255, 144, 69, 0.08)',
}
background: {
  base: '#f7f4f2',
  white: '#ffffff',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    300: '#d1d5db',
  }
}
workspace: {
  accent: '#fddcbd',
}
border: {
  light: 'rgba(118, 118, 118, 0.16)',
  hover: 'rgba(118, 118, 118, 0.08)',
  hoverStrong: 'rgba(118, 118, 118, 0.12)',
}
```

#### Typography
```typescript
fontFamily: {
  graphik: "'Graphik LC Web', sans-serif",
  inter: "'Inter', sans-serif",
}
fontSize: {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '9px': '0.5625rem', // 9px (for labels)
  '13px': '0.8125rem', // 13px
}
lineHeight: {
  tight: '1.2',
  normal: '1.5',
  relaxed: '1.75',
  '17px': '1.0625rem',
  '24px': '1.5rem',
  '29px': '1.8125rem',
}
```

#### Spacing
```typescript
spacing: {
  // Standard Tailwind scale + custom values
  '0.5': '0.125rem',  // 2px
  '1': '0.25rem',     // 4px
  '2': '0.5rem',      // 8px
  '3': '0.75rem',     // 12px
  '4': '1rem',        // 16px
  '6': '1.5rem',      // 24px
  '8': '2rem',        // 32px
  '10': '2.5rem',     // 40px
}
```

#### Transitions
```typescript
transition: {
  duration: {
    fast: '100ms',
    normal: '150ms',
    slow: '300ms',
  },
  easing: {
    default: 'ease-in-out',
  },
}
```

### Actions Required
1. **Create token files** - Extract all hardcoded values into token files
2. **Update Tailwind config** - Reference tokens from TypeScript files
3. **Create token utilities** - Helper functions for accessing tokens
4. **Replace hardcoded values** - Update all components to use tokens
5. **Add CSS custom properties** - Optional: Export tokens as CSS variables

### Benefits
- Single source of truth for design values
- Easier theme switching (dark mode, etc.)
- Better maintainability
- Consistent design system

---

## 3. Component Unification

### Current Issues

#### 3.1 Button Components
- **Button.tsx**: Basic button with `default` and `icon` variants
- **SplitButton.tsx**: Custom split button with hardcoded styles
- **Inconsistent styling**: Different hover states, colors, and sizes

**Proposed Solution:**
```typescript
// Unified Button component with variants
<Button variant="primary" size="md">Document</Button>
<Button variant="icon" size="md"><Icon /></Button>
<Button variant="split" size="md">
  <Button.Primary>Document</Button.Primary>
  <Button.Dropdown />
</Button>
```

#### 3.2 Typography Components
- **Repeated inline styles**: `fontFamily` style prop used throughout
- **Inconsistent text styling**: Similar text patterns repeated

**Proposed Solution:**
```typescript
// Typography components
<Text variant="heading" size="xl">Welcome back</Text>
<Text variant="body" size="sm" color="lighter">Subtitle</Text>
<Text variant="label" size="xs" uppercase>Status</Text>
```

#### 3.3 Icon Components
- **Inconsistent props**: Some icons accept `className`, some accept `size`
- **Mixed patterns**: Some wrapped in divs, some direct SVGs

**Proposed Solution:**
```typescript
// Unified Icon component
<Icon name="home" size={20} className="..." />
<Icon name="chevron-down" size={16} color="lighter" />
```

#### 3.4 Interactive States
- **Repeated hover patterns**: `hover:bg-[rgba(118,118,118,0.08)]` repeated many times
- **Inconsistent transitions**: Some use `transition-colors`, some don't

**Proposed Solution:**
```typescript
// Reusable hover/active state classes
className={cn(
  "base-interactive",
  isActive && "interactive-active",
  "interactive-hover"
)}
```

### Components to Unify

1. **Button Component**
   - Merge `Button.tsx` and `SplitButton.tsx`
   - Add variants: `primary`, `secondary`, `icon`, `split`
   - Add sizes: `sm`, `md`, `lg`
   - Standardize hover/focus states

2. **Typography Components**
   - Create `Text`, `Heading`, `Label` components
   - Remove inline `fontFamily` styles
   - Use design tokens for sizes/colors

3. **Icon System**
   - Unified `Icon` component with consistent API
   - Icon registry/registry pattern
   - Proper TypeScript types

4. **Interactive Elements**
   - Create `Interactive` wrapper component or utility classes
   - Standardize hover/active/focus states
   - Consistent transitions

5. **Status Badge**
   - Enhance `LabelStatus` component
   - Support more status types
   - Use design tokens

### Actions Required
1. **Create unified Button component** - Merge and enhance existing buttons
2. **Create Typography components** - Replace inline text styling
3. **Refactor Icon system** - Unified icon component and registry
4. **Create utility classes** - For common interactive patterns
5. **Update all components** - Use new unified components

### Benefits
- Consistent UI patterns
- Easier to maintain
- Better developer experience
- Reduced code duplication

---

## 4. Implementation Phases

### Phase 1: Design Tokens (Foundation)
**Priority: High** | **Estimated Time: 2-3 hours**

1. Create `src/tokens/` directory structure
2. Extract colors, typography, spacing, transitions
3. Update `tailwind.config.js` to use tokens
4. Create token utilities and exports
5. Test token system

**Files to create:**
- `src/tokens/colors.ts`
- `src/tokens/typography.ts`
- `src/tokens/spacing.ts`
- `src/tokens/transitions.ts`
- `src/tokens/index.ts`

**Files to modify:**
- `tailwind.config.js`

### Phase 2: Asset Organization
**Priority: Medium** | **Estimated Time: 3-4 hours**

1. Create asset directory structure
2. Extract SVG icons into separate files
3. Create unified Icon component
4. Create icon registry/types
5. Update all icon imports

**Files to create:**
- `src/assets/icons/navigation/` (5 files)
- `src/assets/icons/actions/` (4 files)
- `src/assets/icons/documents/` (3 files)
- `src/assets/icons/workspace/` (2 files)
- `src/components/ui/Icon.tsx`
- `src/types/icons.ts`

**Files to modify:**
- `src/components/ui/icons/index.tsx` (refactor)
- All components using icons

### Phase 3: Component Unification
**Priority: High** | **Estimated Time: 4-5 hours**

1. Create unified Button component
2. Create Typography components
3. Create interactive utilities
4. Refactor existing components to use new components
5. Remove duplicate code

**Files to create:**
- `src/components/ui/Button/Button.tsx` (enhanced)
- `src/components/ui/Button/index.ts`
- `src/components/ui/Typography/Text.tsx`
- `src/components/ui/Typography/Heading.tsx`
- `src/components/ui/Typography/index.ts`
- `src/utils/cn.ts` (className utility)

**Files to modify:**
- `src/components/ui/Button.tsx` (replace)
- `src/components/content/SplitButton.tsx` (replace)
- All components with inline styles
- All components using buttons

### Phase 4: Cleanup & Documentation
**Priority: Low** | **Estimated Time: 1-2 hours**

1. Remove unused code
2. Update component documentation
3. Add JSDoc comments
4. Create component usage examples
5. Update README

**Files to create:**
- `src/components/ui/README.md`
- `src/tokens/README.md`

**Files to modify:**
- `README.md`
- All component files (add JSDoc)

---

## 5. File Structure After Refactoring

```
src/
├── assets/
│   ├── icons/
│   │   ├── navigation/
│   │   ├── actions/
│   │   ├── documents/
│   │   └── workspace/
│   ├── images/
│   └── fonts/
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── Typography/
│   │   │   ├── Text.tsx
│   │   │   ├── Heading.tsx
│   │   │   └── index.ts
│   │   ├── Icon/
│   │   │   ├── Icon.tsx
│   │   │   └── index.ts
│   │   ├── Avatar.tsx
│   │   ├── LabelStatus.tsx
│   │   └── README.md
│   ├── content/
│   ├── header/
│   ├── layout/
│   └── navigation/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   ├── borders.ts
│   ├── transitions.ts
│   ├── index.ts
│   └── README.md
├── utils/
│   └── cn.ts
├── types/
│   ├── icons.ts
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## 6. Migration Strategy

### Step-by-Step Approach

1. **Start with tokens** - Foundation for everything else
2. **Migrate one component at a time** - Test after each migration
3. **Keep old components temporarily** - Use feature flags if needed
4. **Update imports gradually** - Don't break existing functionality
5. **Remove old code** - After all migrations complete

### Testing Checklist

- [ ] All components render correctly
- [ ] No visual regressions
- [ ] TypeScript types are correct
- [ ] No console errors/warnings
- [ ] Responsive design still works
- [ ] Interactive states work (hover, focus, active)
- [ ] Icons display correctly
- [ ] Colors match design system

---

## 7. Benefits Summary

### Developer Experience
- ✅ Easier to find and use components
- ✅ Consistent API across components
- ✅ Better TypeScript support
- ✅ Reduced code duplication
- ✅ Easier to maintain

### Design System
- ✅ Single source of truth for design values
- ✅ Easier to update design globally
- ✅ Better consistency
- ✅ Theme switching capability

### Performance
- ✅ Better tree-shaking (smaller bundle)
- ✅ Optimized asset loading
- ✅ Reduced CSS duplication

### Maintainability
- ✅ Clear file organization
- ✅ Easier onboarding for new developers
- ✅ Better documentation
- ✅ Easier to extend

---

## 8. Risks & Mitigation

### Risk 1: Breaking Changes
**Mitigation:** 
- Migrate incrementally
- Keep old components until migration complete
- Test thoroughly after each phase

### Risk 2: Bundle Size Increase
**Mitigation:**
- Use proper tree-shaking
- Lazy load icons
- Monitor bundle size

### Risk 3: TypeScript Complexity
**Mitigation:**
- Start with simple types
- Use type utilities
- Document complex types

---

## 9. Next Steps

1. **Review this plan** with the team
2. **Prioritize phases** based on project needs
3. **Set up development branch** for refactoring
4. **Begin Phase 1** (Design Tokens)
5. **Iterate and refine** based on learnings

---

## 10. Notes

- This refactoring can be done incrementally
- Each phase can be a separate PR
- No need to complete everything at once
- Focus on high-impact changes first
- Keep the app functional throughout the process

