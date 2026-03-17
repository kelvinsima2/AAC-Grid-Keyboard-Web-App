// Frequency-optimised 4-ary Huffman tree for AAC keyboard
// Codes use digits 1-4. Frequent letters get shorter (2-digit) codes,
// rare letters get longer (3-digit) codes. All codes are prefix-free.
//
// English letter frequencies (approximate %):
//   SPACE:18  E:12.7  T:9.1  A:8.2  O:7.5  I:7.0  N:6.7  S:6.3  H:6.1
//   R:6.0  D:4.3  L:4.0  C:2.8  U:2.8  M:2.4  W:2.4  F:2.2  G:2.0
//   Y:2.0  P:1.9  B:1.5  V:1.0  K:0.8  J:0.15  X:0.15  Q:0.10  Z:0.07
//
// 2-digit codes (9 slots) → most frequent characters
// 3-digit codes (28 slots, 26 used) → remaining characters + actions
//
// Typing "the" = T(13) + H(31) + E(12) = 6 breaths
// vs uniform 3-digit: T(121) + H(144) + E(113) = 9 breaths → 33% reduction

export interface KeyNode {
  char: string;
  code: string;
  label: string;
  row: number;
  col: number;
}

// QWERTY visual layout preserved, with frequency-optimised Huffman codes
export const KEYBOARD_TREE: KeyNode[] = [
  // Row 1 - QWERTYUIOP (visual QWERTY order)
  { char: 'q', code: '421', label: 'Q', row: 0, col: 0 },
  { char: 'w', code: '333', label: 'W', row: 0, col: 1 },
  { char: 'e', code: '12',  label: 'E', row: 0, col: 2 },
  { char: 'r', code: '321', label: 'R', row: 0, col: 3 },
  { char: 't', code: '13',  label: 'T', row: 0, col: 4 },
  { char: 'y', code: '342', label: 'Y', row: 0, col: 5 },
  { char: 'u', code: '331', label: 'U', row: 0, col: 6 },
  { char: 'i', code: '22',  label: 'I', row: 0, col: 7 },
  { char: 'o', code: '21',  label: 'O', row: 0, col: 8 },
  { char: 'p', code: '343', label: 'P', row: 0, col: 9 },

  // Row 2 - ASDFGHJKL
  { char: 'a', code: '14',  label: 'A', row: 1, col: 0 },
  { char: 's', code: '24',  label: 'S', row: 1, col: 1 },
  { char: 'd', code: '322', label: 'D', row: 1, col: 2 },
  { char: 'f', code: '334', label: 'F', row: 1, col: 3 },
  { char: 'g', code: '341', label: 'G', row: 1, col: 4 },
  { char: 'h', code: '31',  label: 'H', row: 1, col: 5 },
  { char: 'j', code: '413', label: 'J', row: 1, col: 6 },
  { char: 'k', code: '412', label: 'K', row: 1, col: 7 },
  { char: 'l', code: '323', label: 'L', row: 1, col: 8 },

  // Row 3 - ZXCVBNM
  { char: 'z', code: '422', label: 'Z', row: 2, col: 0 },
  { char: 'x', code: '414', label: 'X', row: 2, col: 1 },
  { char: 'c', code: '324', label: 'C', row: 2, col: 2 },
  { char: 'v', code: '411', label: 'V', row: 2, col: 3 },
  { char: 'b', code: '344', label: 'B', row: 2, col: 4 },
  { char: 'n', code: '23',  label: 'N', row: 2, col: 5 },
  { char: 'm', code: '332', label: 'M', row: 2, col: 6 },

  // Row 4 - Special keys
  { char: ' ',         code: '11',  label: 'SPACE', row: 3, col: 0 },
  { char: 'BACKSPACE', code: '423', label: '⌫',     row: 3, col: 1 },
  { char: '.',         code: '424', label: '.',      row: 3, col: 2 },
  { char: ',',         code: '431', label: ',',      row: 3, col: 3 },
  { char: '!',         code: '432', label: '!',      row: 3, col: 4 },
  { char: '?',         code: '433', label: '?',      row: 3, col: 5 },
];

// Action codes for control buttons (also prefix-free within the same tree)
export const ACTION_CODES = {
  PLAY: '434',
  CLEAR: '441',
  SETTINGS: '442',
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

  // Also check if any key is an exact match at current path (2-digit codes)
  if (isCompleteCode(currentPath)) {
    // Path is already complete, no further options
    return [];
  }

  // Also add action codes
  Object.values(ACTION_CODES).forEach(actionCode => {
    if (actionCode.startsWith(currentPath) && actionCode.length > currentPath.length) {
      nextChars.add(actionCode[currentPath.length]);
    }
  });

  return Array.from(nextChars).sort();
}