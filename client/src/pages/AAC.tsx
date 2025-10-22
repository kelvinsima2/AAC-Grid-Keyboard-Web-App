import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import TextDisplay from "@/components/TextDisplay";
import KeyboardGrid from "@/components/KeyboardGrid";
import ControlBar from "@/components/ControlBar";
import PathIndicator from "@/components/PathIndicator";
import { 
  getKeyByCode, 
  getAvailableKeys, 
  isCompleteCode, 
  getNextOptions 
} from "@/lib/huffman";

export default function AAC() {
  const [text, setText] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-reset path after 3 seconds of inactivity
  useEffect(() => {
    if (currentPath === "") return;
    
    const timeout = setTimeout(() => {
      setCurrentPath("");
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [currentPath]);

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

  const highlightedKeys = getAvailableKeys(currentPath);

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
              Each letter has a unique code shown below it. Watch the highlighted keys as you type.
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
            isPlaying={isPlaying}
            hasText={text.length > 0}
          />

          {/* Keyboard Grid */}
          <KeyboardGrid 
            currentPath={currentPath}
            highlightedKeys={highlightedKeys}
          />
        </div>
      </main>
    </div>
  );
}
