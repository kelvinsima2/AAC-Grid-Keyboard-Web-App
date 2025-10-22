# AAC Grid Keyboard

An accessible Augmentative and Alternative Communication (AAC) web application with Huffman input coding for alternative communication.

## Overview

This application provides an accessible keyboard interface that supports dual input methods:
1. **Huffman Coding**: Navigate and select letters using number combinations (1, 2, 3, 4)
2. **Direct Typing**: Type normally using your regular keyboard

The app provides immediate speech feedback for each character and text-to-speech playback for complete messages.

## Features

### Core Functionality
- **QWERTY Keyboard Layout**: Familiar layout with all letters organized in standard QWERTY rows
- **Huffman Coding System**: Each key mapped to unique 1-4 number combinations for accessible input
- **Dual Input Methods**: 
  - Use numbers 1-4 to navigate the Huffman tree and select letters
  - Type directly with your keyboard for faster input
- **Speech Feedback**: Audio confirmation for every character typed
- **Text-to-Speech Playback**: Play button (code: 31) reads complete messages aloud
- **Visual Path Tracking**: Shows current navigation path and highlights available keys

### Accessibility Features
- **Adjustable Path Timeout**: Configure how long the system waits between number inputs (1-10 seconds)
- **High-Contrast Visual Design**: Clear, readable interface optimized for visibility
- **Keyboard-Only Navigation**: Full functionality without mouse/touch
- **Clear Visual Feedback**: Highlighted keys show available options at each step
- **Dark Mode Support**: Toggle between light and dark themes

### Controls
- **Numbers 1-4**: Navigate Huffman tree or type directly
- **Letters A-Z**: Direct keyboard input
- **Space, Backspace**: Standard text editing
- **Punctuation (. , ! ?)**: Direct input
- **Escape**: Reset current path
- **Play Button (Code 31)**: Text-to-speech playback
- **Clear Button (Code 32)**: Clear all text
- **Settings (Code 33)**: Adjust path timeout

## Project Structure

### Frontend (React + TypeScript)
- **`/client/src/pages/AAC.tsx`**: Main application page with input handling
- **`/client/src/lib/huffman.ts`**: Huffman tree structure and navigation logic
- **`/client/src/components/`**: Reusable UI components
  - `Header.tsx`: App title and theme toggle
  - `TextDisplay.tsx`: Large text display area with cursor
  - `NumberInput.tsx`: 1-4 number button row with availability indicators
  - `KeyboardGrid.tsx`: QWERTY keyboard with Huffman codes
  - `ControlBar.tsx`: Play, Clear, and Settings buttons
  - `PathIndicator.tsx`: Shows current Huffman path
  - `SettingsDialog.tsx`: Timeout configuration dialog

### Backend
- Minimal Express server for serving the application
- No database - all state is client-side and session-based

## Technical Details

### Huffman Code Structure
Each letter is assigned a unique 2-3 digit code using numbers 1-4:
- Row 1 (QWERTY): q=111, w=112, e=113, r=114, t=121, etc.
- Row 2 (ASDFGH): a=133, s=134, d=141, f=142, etc.
- Row 3 (ZXCVBN): z=214, x=221, c=222, v=223, etc.
- Special: SPACE=233, BACKSPACE=234

### State Management
- **Text State**: Current typed message stored in React state
- **Path State**: Current Huffman navigation path with auto-reset timeout
- **Settings**: Path timeout persisted to localStorage

### Browser APIs Used
- **Web Speech API**: For text-to-speech functionality
- **LocalStorage**: For persisting user preferences

## User Preferences
- **Path Timeout**: Configurable 1-10 second delay before path resets
- **Theme**: Light/dark mode preference stored in localStorage

## Recent Changes
- Initial implementation with QWERTY layout
- Added dual input system (Huffman + direct typing)
- Speech feedback for each character
- Adjustable path timeout settings
- Number-coded control buttons (Play, Clear, Settings)
- Visual number input row showing available options

## Future Enhancements
- Word prediction and auto-complete
- Custom Huffman code mappings
- Phrase shortcuts for common expressions
- Voice customization options
- Message history
