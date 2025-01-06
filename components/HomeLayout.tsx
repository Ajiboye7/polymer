import { View, Text } from "react-native";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Home from "@/app/(tabs)/home";

import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
  } from "@gorhom/bottom-sheet";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View className="">
        <Home/>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["47%", "83%"]}
          index={0}
        >
            <BottomSheetScrollView>
                {children}
            </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeLayout;
