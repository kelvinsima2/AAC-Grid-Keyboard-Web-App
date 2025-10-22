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
  
  return (
    <div 
      className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3"
      role="grid"
      aria-label="Keyboard grid"
    >
      {KEYBOARD_TREE.map((key) => (
        <Card
          key={key.code}
          className={`
            aspect-square flex flex-col items-center justify-center
            transition-all duration-200 cursor-pointer
            hover-elevate active-elevate-2
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
          <span className="text-xs md:text-sm text-muted-foreground font-mono mt-1">
            {key.code}
          </span>
        </Card>
      ))}
    </div>
  );
}
