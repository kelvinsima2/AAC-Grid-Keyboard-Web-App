import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import TextDisplay from "@/components/TextDisplay";
import KeyboardGrid from "@/components/KeyboardGrid";
import ControlBar from "@/components/ControlBar";
import PathIndicator from "@/components/PathIndicator";
import SettingsDialog from "@/components/SettingsDialog";
import { 
  getKeyByCode, 
  getAvailableKeys, 
  isCompleteCode,
  isActionCode,
  getNextOptions,
  ACTION_CODES
} from "@/lib/huffman";

export default function AAC() {
  const [text, setText] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pathTimeout, setPathTimeout] = useState(3000); // Default 3 seconds

  // Auto-reset path after timeout
  useEffect(() => {
    if (currentPath === "") return;
    
    const timeout = setTimeout(() => {
      setCurrentPath("");
    }, pathTimeout);
    
    return () => clearTimeout(timeout);
  }, [currentPath, pathTimeout]);

  // Speech feedback for a single character
  const speakCharacter = useCallback((char: string) => {
    const charToSpeak = char === ' ' ? 'space' : char === 'BACKSPACE' ? 'backspace' : char;
    const utterance = new SpeechSynthesisUtterance(charToSpeak);
    utterance.rate = 1.2;
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  }, []);

  // Handle number press
  const handleNumberPress = useCallback((num: string) => {
    const newPath = currentPath + num;
    
    // Check if this is an action code
    if (isActionCode(newPath)) {
      if (newPath === ACTION_CODES.PLAY) {
        handlePlay();
      } else if (newPath === ACTION_CODES.CLEAR) {
        handleClear();
      } else if (newPath === ACTION_CODES.SETTINGS) {
        setSettingsOpen(true);
      }
      setCurrentPath("");
      return;
    }
    
    // Check if this completes a key
    if (isCompleteCode(newPath)) {
      const key = getKeyByCode(newPath);
      if (key) {
        if (key.char === 'BACKSPACE') {
          setText(prev => prev.slice(0, -1));
          speakCharacter('BACKSPACE');
        } else {
          setText(prev => prev + key.char);
          speakCharacter(key.char);
        }
      }
      setCurrentPath("");
    } else {
      setCurrentPath(newPath);
    }
  }, [currentPath, speakCharacter]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const availableNumbers = getNextOptions(currentPath);
        if (availableNumbers.includes(e.key)) {
          handleNumberPress(e.key);
        }
      } else if (e.key === 'Escape') {
        setCurrentPath("");
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPath, handleNumberPress]);

  // Text-to-speech for full text
  const handlePlay = () => {
    if (!text || isPlaying) return;
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const handleClear = () => {
    setText("");
    setCurrentPath("");
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleTimeoutChange = (newTimeout: number) => {
    setPathTimeout(newTimeout);
    localStorage.setItem('aac-path-timeout', newTimeout.toString());
  };

  // Load saved timeout on mount
  useEffect(() => {
    const savedTimeout = localStorage.getItem('aac-path-timeout');
    if (savedTimeout) {
      setPathTimeout(parseInt(savedTimeout, 10));
    }
  }, []);

  const highlightedKeys = getAvailableKeys(currentPath);
  const highlightPlay = currentPath === ACTION_CODES.PLAY.slice(0, currentPath.length) && currentPath.length > 0;
  const highlightClear = currentPath === ACTION_CODES.CLEAR.slice(0, currentPath.length) && currentPath.length > 0;
  const highlightSettings = currentPath === ACTION_CODES.SETTINGS.slice(0, currentPath.length) && currentPath.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
          {/* Instructions */}
          <div className="text-center space-y-2">
            <p className="text-lg text-muted-foreground">
              Press numbers 1-4 on your keyboard to navigate and select letters
            </p>
            <p className="text-sm text-muted-foreground">
              Each letter has a unique code shown below it. Control buttons also have codes.
            </p>
          </div>

          {/* Text Display */}
          <TextDisplay text={text} />

          {/* Current Path Indicator */}
          <PathIndicator currentPath={currentPath} />

          {/* Control Buttons */}
          <ControlBar 
            onPlay={handlePlay}
            onClear={handleClear}
            onSettings={() => setSettingsOpen(true)}
            isPlaying={isPlaying}
            hasText={text.length > 0}
            highlightPlay={highlightPlay}
            highlightClear={highlightClear}
            highlightSettings={highlightSettings}
          />

          {/* Keyboard Grid */}
          <KeyboardGrid 
            currentPath={currentPath}
            highlightedKeys={highlightedKeys}
          />
        </div>
      </main>

      {/* Settings Dialog */}
      <SettingsDialog 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        timeout={pathTimeout}
        onTimeoutChange={handleTimeoutChange}
      />
    </div>
  );
}
