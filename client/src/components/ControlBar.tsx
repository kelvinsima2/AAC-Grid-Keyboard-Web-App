import { Button } from "@/components/ui/button";
import { Volume2, Trash2 } from "lucide-react";

interface ControlBarProps {
  onPlay: () => void;
  onClear: () => void;
  isPlaying: boolean;
  hasText: boolean;
}

export default function ControlBar({ 
  onPlay, 
  onClear, 
  isPlaying,
  hasText 
}: ControlBarProps) {
  return (
    <div className="flex justify-center gap-4">
      <Button
        size="lg"
        variant="default"
        className="min-w-32 h-14 text-lg gap-2"
        onClick={onPlay}
        disabled={!hasText || isPlaying}
        data-testid="button-play"
        aria-label="Play text-to-speech"
      >
        <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
        {isPlaying ? 'Playing...' : 'Play'}
      </Button>
      
      <Button
        size="lg"
        variant="outline"
        className="h-14 text-lg gap-2"
        onClick={onClear}
        disabled={!hasText}
        data-testid="button-clear"
        aria-label="Clear text"
      >
        <Trash2 className="w-5 h-5" />
        Clear
      </Button>
    </div>
  );
}
