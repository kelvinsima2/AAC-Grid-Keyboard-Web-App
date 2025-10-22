# AAC Grid Keyboard Web App - Design Guidelines

## Design Approach

**Selected Framework**: Material Design with strong accessibility focus
**Rationale**: AAC tools require maximum usability, clarity, and consistency. Material Design provides excellent accessibility patterns and high-contrast options essential for users with diverse abilities.

## Core Design Principles

1. **Clarity Over Aesthetics**: Every design decision prioritizes legibility and ease of use
2. **Maximum Contrast**: High-contrast color schemes for visibility
3. **Large Touch Targets**: Minimum 48x48px for all interactive elements
4. **Immediate Feedback**: Clear visual/audio confirmation of every interaction
5. **Zero Cognitive Load**: Intuitive layout requiring minimal learning

## Color Palette

**Light Mode**:
- Primary: 220 90% 50% (Blue - high visibility)
- Surface: 0 0% 100% (White)
- Text Primary: 0 0% 13% (Near black)
- Grid Lines: 0 0% 85% (Light gray)
- Active Highlight: 142 70% 45% (Green - positive action)
- Navigation Path: 48 95% 53% (Amber - attention)

**Dark Mode**:
- Primary: 220 90% 60% (Lighter blue)
- Surface: 0 0% 12% (Dark gray)
- Text Primary: 0 0% 95% (Near white)
- Grid Lines: 0 0% 25% (Medium gray)
- Active Highlight: 142 65% 55% (Brighter green)
- Navigation Path: 48 100% 60% (Brighter amber)

## Typography

**Font Family**: System fonts for maximum performance and clarity
- Primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

**Hierarchy**:
- Text Display: 3rem (48px), font-weight 500, line-height 1.2
- Keyboard Keys: 1.5rem (24px), font-weight 600, uppercase
- Huffman Code: 1rem (16px), font-weight 500, monospace
- Helper Text: 0.875rem (14px), font-weight 400

## Layout System

**Spacing Units**: Consistent 4px-based system
- Base unit: 4px
- Common spacing: 4 (1rem), 6 (1.5rem), 8 (2rem), 12 (3rem)

**Grid Structure**:
- Container: max-w-6xl, centered with px-4
- Keyboard Grid: 6-column layout on desktop, 5-column on mobile
- Responsive breakpoints: sm:640px, md:768px, lg:1024px

## Component Specifications

### Keyboard Grid
- Key cells: Square aspect ratio, min-h-16 on mobile, min-h-20 on desktop
- Border: 2px solid, grid-lines color
- Border radius: rounded-lg (8px)
- Hover state: scale(1.05) with subtle shadow
- Active path: 3px border, navigation-path color, pulsing animation
- Selected key: filled background with active-highlight color

### Text Display Area
- Height: min-h-32 on mobile, min-h-40 on desktop
- Padding: p-6
- Border: 2px solid, rounded-xl
- Background: Surface color with subtle inner shadow
- Cursor: Blinking vertical line (2px width)

### Number Input Indicators (1-4)
- Display: Fixed row above keyboard
- Size: h-16 w-16 on mobile, h-20 w-20 on desktop
- Border: 3px solid when active
- Typography: 2rem bold
- Active state: Filled background, scale(1.1)

### Play Button
- Size: Large touch target (min-h-14, min-w-32)
- Icon: Speaker/volume icon from Heroicons
- Position: Adjacent to text display
- Style: Filled primary color, rounded-full
- States: Normal, playing (pulsing icon), disabled (50% opacity)

### Backspace Key
- Visual distinction: Different background (red tint: 0 70% 60%)
- Icon: Backspace icon from Heroicons
- Size: Same as standard keys but highlighted

## Interaction Patterns

**Huffman Navigation**:
- Each number press (1-4) highlights the next tier of possible keys
- Progressive narrowing: Full grid → Half → Quarter → Single key
- Visual path: Highlighted border trail showing decision tree
- Auto-reset after selection or 3-second timeout

**Feedback Mechanisms**:
- Number press: Brief scale animation + border highlight
- Key selection: Success sound (if enabled) + text update
- Speech playback: Button pulse + speaking indicator
- Error states: Shake animation + red flash

## Accessibility Features

- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Arrow keys, Enter)
- Screen reader announcements for Huffman path progress
- Focus indicators: 3px offset ring in primary color
- Skip links for quick navigation
- Minimum WCAG AAA contrast ratios (7:1)

## Layout Structure

**Single-Screen App Layout**:
1. Header: App title + settings icon (top-right)
2. Text Display: Prominent position, top-third of viewport
3. Number Input Row: Directly below text display
4. Keyboard Grid: Main focus area, 60% of viewport height
5. Control Bar: Play + Clear buttons, fixed at bottom

**Spacing**:
- Vertical rhythm: gap-6 between major sections
- Internal padding: p-6 for containers
- Edge margins: mx-4 on mobile, mx-auto max-w-6xl on desktop

## Special Considerations

- No hero images or marketing elements - purely functional interface
- Minimal animations - only for feedback, never decorative
- Maximum touch target compliance for motor accessibility
- Support for switch access and scanning input modes
- Optional high-contrast mode toggle in settings
- Persistent state saving (localStorage for typed text)