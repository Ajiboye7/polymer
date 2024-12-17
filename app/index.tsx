import {Text} from 'react-native';
import { Link, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/*export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text className=''>Hello Guys</Text>
      <Link href="/home">Go to home</Link>
      <Link href="/payments">Go to Payment</Link>
      <Link href="/account">Go to Account</Link>
      <Link href="/cards">Go to Card</Link>

    </SafeAreaView>
    
  );
}*/

export default function HomeScreen() {
  return (
    <Redirect href="/(auth)/welcome" />
    
  );
}




