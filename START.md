# Quick Start Guide

## To Fix Styling Issues:

1. **Stop the dev server** (Ctrl+C in terminal)

2. **Clear cache and restart**:
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Hard refresh browser**:
   - Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Safari: Cmd+Option+R

4. **Check browser console** for any errors

## Verification Checklist:

✅ Tailwind CSS is installed (v3.4.19)
✅ PostCSS config is correct
✅ index.css imports Tailwind directives
✅ main.tsx imports index.css
✅ Build succeeds without errors

## If styles still don't appear:

1. Check browser DevTools → Network tab
   - Look for CSS file loading (should be `index-[hash].css`)
   - Check if it's loading successfully

2. Check browser DevTools → Elements tab
   - Inspect an element
   - Check if Tailwind classes are in the class attribute
   - Check Computed styles to see if CSS is applied

3. Verify Tailwind is processing:
   ```bash
   npm run build
   ```
   Check `dist/assets/*.css` - should contain Tailwind utility classes

## Common Issues:

- **Browser cache**: Hard refresh (see above)
- **Dev server cache**: Delete `node_modules/.vite` folder
- **CSS not loading**: Check Network tab for 404 errors
- **Classes not applying**: Verify Tailwind config `content` paths include your files

