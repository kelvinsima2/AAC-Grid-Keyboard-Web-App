import ControlBar from '../ControlBar';

export default function ControlBarExample() {
  return (
    <ControlBar 
      onPlay={() => console.log('Play clicked')}
      onClear={() => console.log('Clear clicked')}
      onSettings={() => console.log('Settings clicked')}
      isPlaying={false}
      hasText={true}
      highlightPlay={true}
      highlightClear={false}
      highlightSettings={false}
    />
  );
}
