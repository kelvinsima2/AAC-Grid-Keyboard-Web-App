// Huffman-like tree structure for keyboard navigation
// Each key is mapped to a sequence of numbers (1, 2, 3, 4)

export interface KeyNode {
  char: string;
  code: string;
  label: string;
}

// Create a balanced tree structure with 4 branches at each level
export const KEYBOARD_TREE: KeyNode[] = [
  // First level (1x)
  { char: 'e', code: '11', label: 'E' },
  { char: 't', code: '12', label: 'T' },
  { char: 'a', code: '13', label: 'A' },
  { char: 'o', code: '14', label: 'O' },
  
  // Second level (2x)
  { char: 'i', code: '21', label: 'I' },
  { char: 'n', code: '22', label: 'N' },
  { char: 's', code: '23', label: 'S' },
  { char: 'h', code: '24', label: 'H' },
  
  // Third level (3x)
  { char: 'r', code: '31', label: 'R' },
  { char: 'd', code: '32', label: 'D' },
  { char: 'l', code: '33', label: 'L' },
  { char: 'c', code: '34', label: 'C' },
  
  // Fourth level (4x)
  { char: 'u', code: '41', label: 'U' },
  { char: 'm', code: '42', label: 'M' },
  { char: 'w', code: '43', label: 'W' },
  { char: 'f', code: '44', label: 'F' },
  
  // Extended keys (3 digits for less common letters)
  { char: 'g', code: '111', label: 'G' },
  { char: 'y', code: '112', label: 'Y' },
  { char: 'p', code: '113', label: 'P' },
  { char: 'b', code: '114', label: 'B' },
  
  { char: 'v', code: '121', label: 'V' },
  { char: 'k', code: '122', label: 'K' },
  { char: 'j', code: '123', label: 'J' },
  { char: 'x', code: '124', label: 'X' },
  
  { char: 'q', code: '131', label: 'Q' },
  { char: 'z', code: '132', label: 'Z' },
  
  // Special keys
  { char: ' ', code: '141', label: 'SPACE' },
  { char: 'BACKSPACE', code: '142', label: '⌫' },
  { char: '.', code: '211', label: '.' },
  { char: ',', code: '212', label: ',' },
  { char: '!', code: '213', label: '!' },
  { char: '?', code: '214', label: '?' },
];

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

export function getNextOptions(currentPath: string): string[] {
  const nextChars = new Set<string>();
  const availableKeys = getAvailableKeys(currentPath);
  
  availableKeys.forEach(key => {
    if (key.code.length > currentPath.length) {
      nextChars.add(key.code[currentPath.length]);
    }
  });
  
  return Array.from(nextChars).sort();
}
