import { Card } from "@/components/ui/card";
import { KEYBOARD_TREE, type KeyNode } from "@/lib/huffman";

interface KeyboardGridProps {
  currentPath: string;
  highlightedKeys: KeyNode[];
  onKeySelect?: (key: KeyNode) => void;
}

export default function KeyboardGrid({ 
  currentPath, 
  highlightedKeys,
  onKeySelect 
}: KeyboardGridProps) {
  const isHighlighted = (key: KeyNode) => {
    return highlightedKeys.some(k => k.code === key.code);
  };
  
  const isSelected = (key: KeyNode) => {
    return key.code === currentPath;
  };
  
  const getKeyVariant = (key: KeyNode) => {
    if (key.char === 'BACKSPACE') {
      return 'bg-destructive/20 border-destructive/40';
    }
    if (isSelected(key)) {
      return 'bg-chart-2 border-chart-2 text-white scale-105';
    }
    if (isHighlighted(key)) {
      return 'bg-chart-3/30 border-chart-3 scale-[1.02]';
    }
    return 'bg-card border-card-border';
  };
  
  // Organize keys by row
  const rows = [
    KEYBOARD_TREE.filter(k => k.row === 0),
    KEYBOARD_TREE.filter(k => k.row === 1),
    KEYBOARD_TREE.filter(k => k.row === 2),
    KEYBOARD_TREE.filter(k => k.row === 3),
  ];
  
  return (
    <div className="space-y-2" role="grid" aria-label="QWERTY keyboard grid">
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex}
          className="flex justify-center gap-2 md:gap-3"
        >
          {row.map((key) => (
            <Card
              key={key.code}
              className={`
                flex flex-col items-center justify-center
                transition-all duration-200 cursor-pointer
                hover-elevate active-elevate-2
                ${key.label === 'SPACE' ? 'min-w-32 md:min-w-40 h-16 md:h-20' : 'w-12 h-16 md:w-16 md:h-20'}
                ${getKeyVariant(key)}
              `}
              onClick={() => onKeySelect?.(key)}
              data-testid={`key-${key.char}`}
              role="gridcell"
              tabIndex={0}
            >
              <span className="text-lg md:text-xl font-semibold">
                {key.label}
              </span>
              <span className="text-xs text-muted-foreground font-mono mt-1">
                {key.code}
              </span>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}
