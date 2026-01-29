# Vibe Idea - Design System Documentation

## Project Overview
Vibe Idea is an AI-powered creative ideation tool that generates innovative concepts across multiple domains. The application features a micro-realistic design system with gradient backgrounds, layered shadows, and enhanced interactivity.

## Design Philosophy
The interface follows modern material design principles with a focus on micro-realistic effects that create depth and dimensionality through:

- **Three-layer shadow structure**: Outer projection + top highlight + bottom shadow
- **Gradient backgrounds**: Three-stage lighting (light → medium → dark)
- **Dynamic color mixing**: Using CSS color-mix for adaptive color relationships
- **Consistent radius system**: Large rounded corners (16px+ specifications)
- **Smooth micro-interactions**: 0.2s ease transitions with scaling effects

## Component Architecture

### Core Components
1. **Buttons**: Multiple variants with consistent shadow systems
2. **Cards**: Standard, raised, and sunken variants for different contexts
3. **Inputs**: Standard and sunken variants for form elements
4. **Badges**: Color-coded indicators with gradient backgrounds
5. **Layout Elements**: Header, footer, and container components

### Component Hierarchy
```
components/
├── ui/
│   ├── CLAUDE.md (Component library documentation)
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Input.jsx
│   └── Badge.jsx
└── views/
    ├── MainView.jsx
    └── DesignSystemView.jsx
```

## Color Palette
The color system uses CSS variables with dynamic mixing:

- **Primary**: `--primary: #4f46e5` (Deep indigo blue)
- **Primary Light**: `--primary-light: #818cf8` (Light indigo blue)
- **Primary Dark**: `--primary-dark: #4338ca` (Dark indigo blue)
- **Secondary**: `--secondary: #f9fafb` (Light gray background)
- **Accent**: `--accent: #ec4899` (Pink accent)
- **Success**: `--success: #10b981` (Green for positive actions)
- **Warning**: `--warning: #f59e0b` (Amber for warnings)
- **Danger**: `--danger: #ef4444` (Red for destructive actions)
- **Grayscale**: `--gray-50` to `--gray-900` (Full grayscale spectrum)

## Shadow Systems

### Outer Projection (Convex/raised elements)
```
box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 35%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -1px 0 rgba(0,0,0,0.1);
```

### Inner Projection (Concave/inset elements)
```
box-shadow: inset 0 2px 4px rgba(0,0,0,0.1),
            0 1px 2px rgba(0,0,0,0.05);
```

### Hover Enhancements
```
box-shadow: 0 6px 20px color-mix(in srgb, var(--primary) 45%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.25),
            inset 0 -1px 0 rgba(0,0,0,0.15);
```

## Radius Specifications
- **Small**: `--radius-sm: 16px`
- **Medium**: `--radius-md: 20px`
- **Large**: `--radius-lg: 24px`
- **Extra Large**: `--radius-xl: 32px`
- **Full**: `--radius-full: 9999px` (Circular)

## Interaction Patterns
- **Hover State**: `transform: scale(1.02)`
- **Active State**: `transform: scale(0.97)`
- **Transition**: `all 0.2s ease`
- **Focus State**: `0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent)`

## Responsive Design
The design system adapts to different screen sizes:
- Desktop: Full component set with all shadow effects
- Tablet: Maintains depth with optimized spacing
- Mobile: Preserves core interactions with touch-friendly sizing

## Accessibility Standards
- WCAG 2.1 AA compliant color contrast ratios
- Keyboard navigation support
- Focus indicators for interactive elements
- Semantic HTML structure
- ARIA labels for complex components

## Development Guidelines

### Adding New Components
When adding new components to the system:
1. Use existing CSS variables for colors
2. Apply the appropriate shadow system (outer vs inner projection)
3. Maintain consistent radius specifications
4. Include hover and active states
5. Document new variants in the component library

### Styling Conventions
- Always use CSS variables instead of hardcoded colors
- Apply color-mix for dynamic color relationships
- Use the established transition system
- Follow the radius specification hierarchy
- Maintain consistent spacing with CSS custom properties

### Testing Requirements
- Cross-browser compatibility testing
- Responsive design verification
- Accessibility audit
- Performance optimization check
- Interaction smoothness validation

## Version History
- **v8.0**: Complete micro-realistic design system implementation
- **v7.0**: Finalized button styles with exact specifications
- **v6.0**: Micro-realistic material design with gradient backgrounds
- **v5.0**: Professional Linear-style UI with Font Awesome icons
- **v4.0**: Enhanced features with statistics and improved UX
- **v3.0**: Initial responsive design with modern UI elements
- **v2.0**: Basic functionality with conversation history
- **v1.0**: Initial implementation with core AI idea generation