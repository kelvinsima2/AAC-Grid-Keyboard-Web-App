import KeyboardGrid from '../KeyboardGrid';
import { KEYBOARD_TREE } from '@/lib/huffman';

export default function KeyboardGridExample() {
  const highlightedKeys = KEYBOARD_TREE.filter(k => k.code.startsWith('1'));
  
  return (
    <KeyboardGrid 
      currentPath="1"
      highlightedKeys={highlightedKeys}
      onKeySelect={(key) => console.log('Key selected:', key)}
    />
  );
}
