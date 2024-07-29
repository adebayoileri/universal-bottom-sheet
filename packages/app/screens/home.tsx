"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { Text } from "ui/text";
import { View } from "ui/view";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetTrigger,
  BottomSheetHandle,
  useBottomSheet
} from "ui/bottom-sheet";
import { Pressable, Platform } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export function Home() {
  // ref
  const { sheetRef: bottomSheetModalRef, isOpen, setIsOpen } = useBottomSheet();
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);

  // bottomSheetModalRef 
  console.log({ bottomSheetModalRef });

  // variables
  const snapPoints = useMemo(() => [600, "20%", "50%", "70%", "95%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.dismiss();
      setIsOpen(false);
    } else {
      bottomSheetModalRef.current?.present();
      setIsOpen(true);
    }
  }, [isOpen]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View className="flex flex-1 justify-center items-center">
      <View className="p-1 rounded-md">
        {Platform.OS !== "web" && ( // Use this condition if you want to control the modal from outside for only mobile
          <Pressable onPress={handlePresentModalPress}>
            <Text>Present Modal</Text>
          </Pressable>
        )}

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          // open={isOpen} Use this prop if you want to control the modal from outside for web
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleComponent={() => (
            <BottomSheetHandle
              className="bg-green-300 mt-2"
              animatedIndex={animatedIndex}
              animatedPosition={animatedPosition}
            />
          )}
        >
          {Platform.OS === "web" && ( // Use this component if you want to control the modal from outside for web and also as a trigger as close within the modal on mobile
            <>
              <BottomSheetTrigger>
                <Text>Present Modal</Text>
              </BottomSheetTrigger>
            </>
          )}
          <BottomSheetView className="flex-1 items-center">
            {Platform.OS === "web" && (
              <BottomSheetHandle
                className="bg-gray-300 mt-2"
                animatedIndex={animatedIndex}
                animatedPosition={animatedPosition}
              />
            )}
            <Text className="mt-10">Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </View>
  );
}
