import ControlBar from '../ControlBar';

export default function ControlBarExample() {
  return (
    <ControlBar 
      onPlay={() => console.log('Play clicked')}
      onClear={() => console.log('Clear clicked')}
      isPlaying={false}
      hasText={true}
    />
  );
}
