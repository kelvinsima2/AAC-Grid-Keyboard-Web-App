import { Button } from "@/components/ui/button";
import { Volume2, Trash2, Settings } from "lucide-react";
import { ACTION_CODES } from "@/lib/huffman";

interface ControlBarProps {
  onPlay: () => void;
  onClear: () => void;
  onSettings: () => void;
  isPlaying: boolean;
  hasText: boolean;
  highlightPlay: boolean;
  highlightClear: boolean;
  highlightSettings: boolean;
}

export default function ControlBar({ 
  onPlay, 
  onClear,
  onSettings,
  isPlaying,
  hasText,
  highlightPlay,
  highlightClear,
  highlightSettings
}: ControlBarProps) {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <Button
        size="lg"
        variant={highlightPlay ? "default" : "outline"}
        className={`min-w-32 h-14 text-lg gap-2 ${highlightPlay ? 'scale-105' : ''}`}
        onClick={onPlay}
        disabled={!hasText || isPlaying}
        data-testid="button-play"
        aria-label="Play text-to-speech"
      >
        <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
        {isPlaying ? 'Playing...' : 'Play'}
        <span className="text-xs font-mono ml-1 opacity-70">{ACTION_CODES.PLAY}</span>
      </Button>
      
      <Button
        size="lg"
        variant={highlightClear ? "default" : "outline"}
        className={`h-14 text-lg gap-2 ${highlightClear ? 'scale-105' : ''}`}
        onClick={onClear}
        disabled={!hasText}
        data-testid="button-clear"
        aria-label="Clear text"
      >
        <Trash2 className="w-5 h-5" />
        Clear
        <span className="text-xs font-mono ml-1 opacity-70">{ACTION_CODES.CLEAR}</span>
      </Button>

      <Button
        size="lg"
        variant={highlightSettings ? "default" : "outline"}
        className={`h-14 text-lg gap-2 ${highlightSettings ? 'scale-105' : ''}`}
        onClick={onSettings}
        data-testid="button-settings"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
        Settings
        <span className="text-xs font-mono ml-1 opacity-70">{ACTION_CODES.SETTINGS}</span>
      </Button>
    </div>
  );
}
