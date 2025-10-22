import { useState } from 'react';
import SettingsDialog from '../SettingsDialog';

export default function SettingsDialogExample() {
  const [timeout, setTimeout] = useState(3000);
  
  return (
    <SettingsDialog 
      open={true}
      onOpenChange={() => {}}
      timeout={timeout}
      onTimeoutChange={setTimeout}
    />
  );
}
