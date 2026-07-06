import Roast from './Toast';
import Router from './Router';
import NormalizeStyles from './NormalizeStyles';
import FontStyles from './FontStyles';
import BaseStyles from './BaseStyles';

const App = () => (
  <>
    <NormalizeStyles />
    <FontStyles />
    <BaseStyles />
    <Roast />
    <Router />
  </>
);

export default App;
