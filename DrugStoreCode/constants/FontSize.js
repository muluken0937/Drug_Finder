import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

const small = Math.min(window.width, window.height) * 0.03;
const medium = Math.min(window.width, window.height) * 0.035;
const large = Math.min(window.width, window.height) * 0.04;
const xLarge = Math.min(window.width, window.height) * 0.06;
const xxLarge = Math.min(window.width, window.height) * 0.07;

export default {
  small,
  medium,
  large,
  xLarge,
  xxLarge,
};

