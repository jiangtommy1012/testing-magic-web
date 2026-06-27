import PhoneFrame from './components/PhoneFrame';
import InitialScreen from './components/InitialScreen';
import PasscodeScreen from './components/PasscodeScreen';
import HomeScreen from './components/HomeScreen';
import BlackScreen from './components/BlackScreen';

/**
 * 三個畫面都常駐掛載，各自依 redux 的 screen 狀態做位移/淡入淡出過渡。
 * BlackScreen 疊在最上層，點手電筒時蓋成全黑。
 */
export default function App() {
  return (
    <PhoneFrame>
      <InitialScreen />
      <PasscodeScreen />
      <HomeScreen />
      <BlackScreen />
    </PhoneFrame>
  );
}
