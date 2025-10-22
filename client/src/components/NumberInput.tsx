import { Button } from "@/components/ui/button";

interface NumberInputProps {
  onNumberPress: (num: string) => void;
  currentPath: string;
  availableNumbers: string[];
}

export default function NumberInput({ 
  onNumberPress, 
  currentPath,
  availableNumbers 
}: NumberInputProps) {
  const numbers = ['1', '2', '3', '4'];
  
  return (
    <div className="flex justify-center gap-3 md:gap-4">
      {numbers.map((num) => {
        const isAvailable = availableNumbers.includes(num);
        const isInPath = currentPath.includes(num);
        
        return (
          <Button
            key={num}
            size="lg"
            variant={isInPath ? "default" : "outline"}
            className={`h-16 w-16 md:h-20 md:w-20 text-2xl md:text-3xl font-bold transition-all ${
              !isAvailable ? 'opacity-40 cursor-not-allowed' : ''
            } ${isInPath ? 'scale-105' : ''}`}
            onClick={() => isAvailable && onNumberPress(num)}
            disabled={!isAvailable}
            data-testid={`button-number-${num}`}
            aria-label={`Number ${num}${isAvailable ? ' - available' : ' - not available'}`}
          >
            {num}
          </Button>
        );
      })}
    </div>
  );
}
