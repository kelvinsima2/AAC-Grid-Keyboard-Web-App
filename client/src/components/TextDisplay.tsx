import { Card } from "@/components/ui/card";

interface TextDisplayProps {
  text: string;
  showCursor?: boolean;
}

export default function TextDisplay({ text, showCursor = true }: TextDisplayProps) {
  return (
    <Card className="w-full p-6 min-h-32 md:min-h-40" data-testid="card-text-display">
      <div className="flex items-start gap-1">
        <p 
          className="text-3xl md:text-4xl font-medium leading-tight break-words flex-1"
          data-testid="text-display-content"
        >
          {text || <span className="text-muted-foreground">Start typing...</span>}
        </p>
        {showCursor && (
          <span 
            className="inline-block w-0.5 h-10 bg-primary animate-pulse ml-1"
            data-testid="text-cursor"
            aria-hidden="true"
          />
        )}
      </div>
    </Card>
  );
}
