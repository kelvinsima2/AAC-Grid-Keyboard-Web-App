// Huffman-like tree structure for QWERTY keyboard navigation
// Each key is mapped to a sequence of numbers (1, 2, 3, 4)

export interface KeyNode {
  char: string;
  code: string;
  label: string;
  row: number;
  col: number;
}

// QWERTY layout with Huffman codes
export const KEYBOARD_TREE: KeyNode[] = [
  // Row 1 - QWERTYUIOP
  { char: 'q', code: '111', label: 'Q', row: 0, col: 0 },
  { char: 'w', code: '112', label: 'W', row: 0, col: 1 },
  { char: 'e', code: '113', label: 'E', row: 0, col: 2 },
  { char: 'r', code: '114', label: 'R', row: 0, col: 3 },
  { char: 't', code: '121', label: 'T', row: 0, col: 4 },
  { char: 'y', code: '122', label: 'Y', row: 0, col: 5 },
  { char: 'u', code: '123', label: 'U', row: 0, col: 6 },
  { char: 'i', code: '124', label: 'I', row: 0, col: 7 },
  { char: 'o', code: '131', label: 'O', row: 0, col: 8 },
  { char: 'p', code: '132', label: 'P', row: 0, col: 9 },
  
  // Row 2 - ASDFGHJKL
  { char: 'a', code: '133', label: 'A', row: 1, col: 0 },
  { char: 's', code: '134', label: 'S', row: 1, col: 1 },
  { char: 'd', code: '141', label: 'D', row: 1, col: 2 },
  { char: 'f', code: '142', label: 'F', row: 1, col: 3 },
  { char: 'g', code: '143', label: 'G', row: 1, col: 4 },
  { char: 'h', code: '144', label: 'H', row: 1, col: 5 },
  { char: 'j', code: '211', label: 'J', row: 1, col: 6 },
  { char: 'k', code: '212', label: 'K', row: 1, col: 7 },
  { char: 'l', code: '213', label: 'L', row: 1, col: 8 },
  
  // Row 3 - ZXCVBNM
  { char: 'z', code: '214', label: 'Z', row: 2, col: 0 },
  { char: 'x', code: '221', label: 'X', row: 2, col: 1 },
  { char: 'c', code: '222', label: 'C', row: 2, col: 2 },
  { char: 'v', code: '223', label: 'V', row: 2, col: 3 },
  { char: 'b', code: '224', label: 'B', row: 2, col: 4 },
  { char: 'n', code: '231', label: 'N', row: 2, col: 5 },
  { char: 'm', code: '232', label: 'M', row: 2, col: 6 },
  
  // Row 4 - Special keys
  { char: ' ', code: '233', label: 'SPACE', row: 3, col: 2 },
  { char: 'BACKSPACE', code: '234', label: '⌫', row: 3, col: 5 },
  { char: '.', code: '241', label: '.', row: 3, col: 0 },
  { char: ',', code: '242', label: ',', row: 3, col: 1 },
  { char: '!', code: '243', label: '!', row: 3, col: 6 },
  { char: '?', code: '244', label: '?', row: 3, col: 7 },
];

// Action codes for control buttons
export const ACTION_CODES = {
  PLAY: '31',
  CLEAR: '32',
  SETTINGS: '33',
};

export function getKeyByCode(code: string): KeyNode | undefined {
  return KEYBOARD_TREE.find(node => node.code === code);
}

export function getAvailableKeys(currentPath: string): KeyNode[] {
  if (currentPath === '') {
    return KEYBOARD_TREE;
  }
  
  return KEYBOARD_TREE.filter(node => 
    node.code.startsWith(currentPath) && node.code !== currentPath
  );
}

export function isCompleteCode(code: string): boolean {
  return KEYBOARD_TREE.some(node => node.code === code);
}

export function isActionCode(code: string): boolean {
  return Object.values(ACTION_CODES).includes(code);
}

export function getNextOptions(currentPath: string): string[] {
  const nextChars = new Set<string>();
  const availableKeys = getAvailableKeys(currentPath);
  
  availableKeys.forEach(key => {
    if (key.code.length > currentPath.length) {
      nextChars.add(key.code[currentPath.length]);
    }
  });
  
  // Also add action codes
  Object.values(ACTION_CODES).forEach(actionCode => {
    if (actionCode.startsWith(currentPath) && actionCode.length > currentPath.length) {
      nextChars.add(actionCode[currentPath.length]);
    }
  });
  
  return Array.from(nextChars).sort();
}
