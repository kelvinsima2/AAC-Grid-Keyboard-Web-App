import KeyboardGrid from '../KeyboardGrid';
import { KEYBOARD_TREE } from '@/lib/huffman';

export default function KeyboardGridExample() {
  const highlightedKeys = KEYBOARD_TREE.filter(k => k.code.startsWith('11'));
  
  return (
    <KeyboardGrid 
      currentPath="11"
      highlightedKeys={highlightedKeys}
      onKeySelect={(key) => console.log('Key selected:', key)}
    />
  );
}
