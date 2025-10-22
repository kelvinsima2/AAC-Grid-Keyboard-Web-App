import NumberInput from '../NumberInput';

export default function NumberInputExample() {
  return (
    <NumberInput 
      onNumberPress={(num) => console.log('Number pressed:', num)}
      currentPath="1"
      availableNumbers={['1', '2', '3', '4']}
    />
  );
}
