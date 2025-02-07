import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
interface StyledButtonProps {
  title: string;
  color: string;
  onPress: () => void;
}
const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: 'white' }]}
    >
      <Text
        style={{
          textAlign: 'center',
          color: color,
          fontWeight: '400',
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    color: '#5F5DEC',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
