# Refactoring Checklist

Quick reference checklist for the refactoring process.

## Phase 1: Design Tokens ✅

### Setup
- [ ] Create `src/tokens/` directory
- [ ] Create `src/tokens/colors.ts`
- [ ] Create `src/tokens/typography.ts`
- [ ] Create `src/tokens/spacing.ts`
- [ ] Create `src/tokens/transitions.ts`
- [ ] Create `src/tokens/index.ts`

### Extract Values
- [ ] Extract all color values from components
- [ ] Extract typography values (fonts, sizes, line heights)
- [ ] Extract spacing values
- [ ] Extract transition values
- [ ] Extract shadow values

### Integration
- [ ] Update `tailwind.config.js` to use tokens
- [ ] Test token system works
- [ ] Verify Tailwind classes still work

---

## Phase 2: Asset Organization ✅

### Icon Extraction
- [ ] Create `src/assets/icons/navigation/` directory
- [ ] Extract HomeIcon to separate file
- [ ] Extract DocumentsIcon to separate file
- [ ] Extract TemplatesIcon to separate file
- [ ] Extract ContactsIcon to separate file
- [ ] Extract MoreIcon to separate file

- [ ] Create `src/assets/icons/actions/` directory
- [ ] Extract SearchIcon
- [ ] Extract MoreOptionsIcon
- [ ] Extract ChevronDownIcon
- [ ] Extract ViewOptionsIcon

- [ ] Create `src/assets/icons/documents/` directory
- [ ] Extract DocumentPortraitIcon
- [ ] Extract DocumentImageIcon
- [ ] Extract RecentDocumentsIcon

- [ ] Create `src/assets/icons/workspace/` directory
- [ ] Extract WorkspaceStarIcon
- [ ] Extract WorkspaceChevronIcon

- [ ] Extract HelpQuestionIcon

### Icon Component
- [ ] Create `src/components/ui/Icon/Icon.tsx`
- [ ] Create unified Icon component API
- [ ] Create `src/types/icons.ts` with icon types
- [ ] Update all icon imports across codebase
- [ ] Remove old `icons/index.tsx` or refactor it

---

## Phase 3: Component Unification ✅

### Button Component
- [ ] Create `src/components/ui/Button/Button.tsx`
- [ ] Add variants: `primary`, `secondary`, `icon`, `split`
- [ ] Add sizes: `sm`, `md`, `lg`
- [ ] Merge SplitButton functionality
- [ ] Update all Button usages
- [ ] Remove old `Button.tsx` and `SplitButton.tsx`

### Typography Components
- [ ] Create `src/components/ui/Typography/Text.tsx`
- [ ] Create `src/components/ui/Typography/Heading.tsx`
- [ ] Create `src/components/ui/Typography/index.ts`
- [ ] Replace inline `fontFamily` styles
- [ ] Update all text elements to use Typography components

### Utility Functions
- [ ] Create `src/utils/cn.ts` (className utility)
- [ ] Create interactive state utilities
- [ ] Update components to use utilities

### Component Updates
- [ ] Update `DocumentRow.tsx` to use new components
- [ ] Update `Tab.tsx` to use new components
- [ ] Update `NavButton.tsx` to use new components
- [ ] Update `WelcomeSection.tsx` to use new components
- [ ] Update `LabelStatus.tsx` to use tokens
- [ ] Update `SearchBar.tsx` to use tokens
- [ ] Update `WorkspaceSelector.tsx` to use tokens
- [ ] Update `ActionButtons.tsx` to use new Button
- [ ] Update all other components

---

## Phase 4: Cleanup ✅

### Code Cleanup
- [ ] Remove unused imports
- [ ] Remove duplicate code
- [ ] Remove old component files
- [ ] Clean up unused assets

### Documentation
- [ ] Add JSDoc to all new components
- [ ] Create `src/components/ui/README.md`
- [ ] Create `src/tokens/README.md`
- [ ] Update main `README.md`
- [ ] Document component usage examples

### Testing
- [ ] Test all components render correctly
- [ ] Test responsive design
- [ ] Test interactive states (hover, focus, active)
- [ ] Test TypeScript compilation
- [ ] Check for console errors
- [ ] Verify no visual regressions

---

## Quick Reference: Hardcoded Values to Replace

### Colors
- [ ] `#248567` → `tokens.colors.primary.base`
- [ ] `#1f6f54` → `tokens.colors.primary.hover`
- [ ] `rgba(118,118,118,0.08)` → `tokens.colors.border.hover`
- [ ] `rgba(118,118,118,0.12)` → `tokens.colors.border.hoverStrong`
- [ ] `rgba(118,118,118,0.16)` → `tokens.colors.border.light`
- [ ] `#ff9045` → `tokens.colors.status.orange`
- [ ] `rgba(255,144,69,0.08)` → `tokens.colors.status.orangeLight`
- [ ] `#474747` → `tokens.colors.text.light`
- [ ] `#767676` → `tokens.colors.text.lighter`
- [ ] `#181818` → `tokens.colors.text.dark`
- [ ] `#fddcbd` → `tokens.colors.workspace.accent`

### Typography
- [ ] `'Graphik LC Web', sans-serif` → `tokens.typography.fontFamily.graphik`
- [ ] `'Inter', sans-serif` → `tokens.typography.fontFamily.inter`
- [ ] `text-[9px]` → `tokens.typography.fontSize['9px']`
- [ ] `text-[13px]` → `tokens.typography.fontSize['13px']`
- [ ] `leading-[17px]` → `tokens.typography.lineHeight['17px']`

### Transitions
- [ ] `transition-colors duration-150` → Use token-based utility class

---

## Files to Create

### Tokens
- `src/tokens/colors.ts`
- `src/tokens/typography.ts`
- `src/tokens/spacing.ts`
- `src/tokens/transitions.ts`
- `src/tokens/shadows.ts`
- `src/tokens/borders.ts`
- `src/tokens/index.ts`

### Components
- `src/components/ui/Button/Button.tsx`
- `src/components/ui/Button/index.ts`
- `src/components/ui/Typography/Text.tsx`
- `src/components/ui/Typography/Heading.tsx`
- `src/components/ui/Typography/index.ts`
- `src/components/ui/Icon/Icon.tsx`
- `src/components/ui/Icon/index.ts`

### Utilities
- `src/utils/cn.ts`

### Types
- `src/types/icons.ts`

### Assets
- `src/assets/icons/navigation/HomeIcon.tsx`
- `src/assets/icons/navigation/DocumentsIcon.tsx`
- `src/assets/icons/navigation/TemplatesIcon.tsx`
- `src/assets/icons/navigation/ContactsIcon.tsx`
- `src/assets/icons/navigation/MoreIcon.tsx`
- `src/assets/icons/actions/SearchIcon.tsx`
- `src/assets/icons/actions/MoreOptionsIcon.tsx`
- `src/assets/icons/actions/ChevronDownIcon.tsx`
- `src/assets/icons/actions/ViewOptionsIcon.tsx`
- `src/assets/icons/documents/DocumentPortraitIcon.tsx`
- `src/assets/icons/documents/DocumentImageIcon.tsx`
- `src/assets/icons/documents/RecentDocumentsIcon.tsx`
- `src/assets/icons/workspace/WorkspaceStarIcon.tsx`
- `src/assets/icons/workspace/WorkspaceChevronIcon.tsx`
- `src/assets/icons/actions/HelpQuestionIcon.tsx`

---

## Files to Modify

- `tailwind.config.js` - Use tokens
- `src/components/ui/Button.tsx` - Replace with new Button
- `src/components/content/SplitButton.tsx` - Merge into Button
- `src/components/ui/icons/index.tsx` - Refactor or remove
- All components with inline styles - Use tokens/components
- `src/App.tsx` - Update imports if needed

---

## Files to Remove (After Migration)

- `src/components/content/SplitButton.tsx` (merged into Button)
- Old `src/components/ui/Button.tsx` (replaced)
- Possibly `src/components/ui/icons/index.tsx` (if fully replaced)

---

## Testing Checklist

### Visual Testing
- [ ] All pages render correctly
- [ ] Colors match design
- [ ] Typography is consistent
- [ ] Spacing is correct
- [ ] Icons display properly
- [ ] Responsive breakpoints work

### Functional Testing
- [ ] Buttons work (click, hover, focus)
- [ ] Interactive elements respond correctly
- [ ] Transitions are smooth
- [ ] No console errors
- [ ] No TypeScript errors

### Performance Testing
- [ ] Bundle size hasn't increased significantly
- [ ] Icons load correctly
- [ ] No unnecessary re-renders


