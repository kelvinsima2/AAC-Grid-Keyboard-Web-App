import { Card } from "@/components/ui/card";

interface PathIndicatorProps {
  currentPath: string;
}

export default function PathIndicator({ currentPath }: PathIndicatorProps) {
  if (!currentPath) return null;
  
  return (
    <Card className="p-4 bg-chart-3/20 border-chart-3">
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Current Path:
        </span>
        <span 
          className="text-xl font-mono font-bold text-foreground"
          data-testid="text-current-path"
        >
          {currentPath.split('').join(' → ')}
        </span>
      </div>
    </Card>
  );
}
