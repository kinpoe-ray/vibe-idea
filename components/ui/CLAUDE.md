# Vibe Idea Component Library Documentation

## Overview
This document describes the micro-realistic design system implemented for the Vibe Idea application, featuring gradient backgrounds, layered shadows, and enhanced interactivity.

## Design Principles
- **Micro-realistic Design**: Three-layer shadow structure (outer projection + top highlight + bottom shadow)
- **Gradient Backgrounds**: Three-stage lighting (light → medium → dark) using CSS linear-gradient
- **Color Mixing**: Dynamic color relationships using CSS color-mix function
- **Consistent Radius**: Large rounded corners (16px+ specifications)
- **Smooth Transitions**: 0.2s ease transitions with micro-interactions

## Component Specifications

### Buttons
#### Variants
- **default**: Primary gradient with standard shadow layers
- **primary**: Same as default (primary/gradient consistency)
- **destructive**: Danger/red variant with matching shadow structure
- **accent**: Accent color variant with proper gradients
- **secondary**: Lighter secondary styling with reduced shadow intensity
- **outline**: Border-only styling with subtle shadows
- **ghost**: Transparent background with hover effects
- **link**: Text-only styling with underline

#### Sizes
- **sm**: 32px height, 16px padding, 0.75rem font
- **default**: 36px height, 20px padding, 0.875rem font
- **md**: 40px height, 24px padding, 0.9375rem font
- **lg**: 48px height, 40px padding, 1rem font
- **xl**: 56px height, 48px padding, 1.125rem font
- **icon**: 40x40px square button

#### Shadow Structure
```css
/* Base shadow */
box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 35%, transparent), 
            inset 0 1px 0 rgba(255,255,255,0.2), 
            inset 0 -1px 0 rgba(0,0,0,0.1);

/* Hover shadow */
box-shadow: 0 6px 20px color-mix(in srgb, var(--primary) 45%, transparent), 
            inset 0 1px 0 rgba(255,255,255,0.25), 
            inset 0 -1px 0 rgba(0,0,0,0.15);
```

### Cards
#### Variants
- **standard**: Outer shadow with subtle inset highlight
- **raised**: Enhanced outer shadow for prominence
- **sunken**: Inset shadows for embedded appearance

#### Shadow Structures
```css
/* Standard card */
box-shadow: 0 4px 12px color-mix(in srgb, black 8%, transparent), 
            inset 0 1px 0 rgba(255,255,255,0.2);

/* Raised card */
box-shadow: 0 6px 16px color-mix(in srgb, black 12%, transparent), 
            inset 0 1px 0 rgba(255,255,255,0.25);

/* Sunken card */
box-shadow: inset 0 2px 4px rgba(0,0,0,0.1), 
            0 1px 2px rgba(0,0,0,0.05);
```

### Inputs
#### Variants
- **standard**: Outer glow with inset shadow
- **sunken**: Inset shadows for embedded appearance

#### Shadow Structures
```css
/* Standard input */
box-shadow: inset 0 2px 4px color-mix(in srgb, black 3%, transparent);

/* Focus state */
box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent), 
            inset 0 2px 4px color-mix(in srgb, black 5%, transparent);

/* Sunken input */
box-shadow: inset 0 3px 6px rgba(0,0,0,0.1), 
            inset 0 1px 2px rgba(0,0,0,0.05);
```

### Badges
#### Variants
- **default**: Primary gradient
- **secondary**: Secondary gradient
- **destructive**: Destructive gradient
- **success**: Success gradient
- **warning**: Warning gradient
- **accent**: Accent gradient

#### Shadow Structure
```css
/* Badge shadow */
box-shadow: 0 2px 4px color-mix(in srgb, var(--primary) 30%, transparent);
```

## Color System
All colors are defined using CSS variables and dynamically mixed using color-mix:

```css
:root {
  --primary: #4f46e5;
  --primary-light: #818cf8;
  --primary-dark: #4338ca;
  --secondary: #f9fafb;
  --accent: #ec4899;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --destructive: #ef4444;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
}
```

## Radius System
- **sm**: 16px
- **md**: 20px
- **lg**: 24px
- **xl**: 32px
- **full**: 9999px

## Interaction States
- **hover**: scale(1.02) transformation
- **active**: scale(0.97) transformation
- **disabled**: 0.5 opacity, no interaction
- **focus**: 2px ring with primary color

## Accessibility
- Focus states with 2px ring
- Sufficient color contrast
- Keyboard navigation support
- Screen reader compatibility