


import { Tabs } from "expo-router";
import { Image,  View, Text, ImageSourcePropType } from "react-native";

import { icons } from "@/constants";

interface TabIconProps {
  icon: ImageSourcePropType;  
  color: string;              
  name: string;               
  focused: boolean;           
}


const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2 w-14 ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-[30px] h-[30px]"
      />
      <Text
        className={`${focused ? "font-[590px]" : "font-[400px]"} text-xs`} style= {{color:color}}
      >
        {name}
      </Text>
    </View>
  );
};


export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#184484',
        tabBarInactiveTintColor: '#868686',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          height: 84,
          flexDirection: 'row',  
          justifyContent: 'space-evenly' , 
          alignItems: 'center',  
          paddingBottom: 20,
          shadowColor: '#000000', 
          shadowOffset: { width: 0, height: -1 }, 
          shadowOpacity: 0.2,
          shadowRadius: 2,
      
          // Android shadow
          elevation: 5, // 
         
        },
        headerShown: false,
        tabBarShowLabel: false, // Hide labels for icons only
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
            icon={icons.home}
            name='Home'
            color={color}
            focused={focused}
             />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Payments',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
            icon={icons.payment}
            name="Payment"
            color={color}
            focused={focused}
            
             />
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
            icon={icons.card}
            name="Cards"
            color={color}
            focused={focused}
             />
          ),
        }}
      />
       <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
            icon={icons.profile}
            name="Account"
            color={color}
            focused={focused}
             />
          ),
        }}
      />
    </Tabs>
  );
}
