import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeout: number;
  onTimeoutChange: (timeout: number) => void;
}

export default function SettingsDialog({
  open,
  onOpenChange,
  timeout,
  onTimeoutChange,
}: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-settings">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Adjust the path timeout to match your typing speed
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="timeout-slider" className="text-base">
                Path Timeout
              </Label>
              <span className="text-lg font-semibold text-primary" data-testid="text-timeout-value">
                {timeout / 1000}s
              </span>
            </div>
            
            <Slider
              id="timeout-slider"
              min={1000}
              max={10000}
              step={500}
              value={[timeout]}
              onValueChange={(values) => onTimeoutChange(values[0])}
              className="w-full"
              data-testid="slider-timeout"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1s (Fast)</span>
              <span>10s (Slow)</span>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              This controls how long you have to enter the next number before the path resets.
              Increase this if you need more time between key presses.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
