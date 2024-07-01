"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { Text } from "ui/text";
import { View } from "ui/view";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetTrigger,
  BottomSheetHandle,
} from "ui/bottom-sheet";
import { Pressable, Platform } from "react-native";

export function Home() {
  const [isOpen, setIsOpen] = React.useState(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // bottomSheetModalRef
  console.log({ bottomSheetModalRef });

  // variables
  const snapPoints = useMemo(() => [600, "20%", "50%", "70%", "95%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    // bottomSheetWebRef.current?.focus();

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
              animatedIndex={undefined}
              animatedPosition={undefined}
            />
          )}
        >
          {Platform.OS === "web" && (
            <>
              <BottomSheetTrigger>
                <Text>Present Modal</Text>
              </BottomSheetTrigger>
            </>
          )}
          <BottomSheetView className="flex-1">
            {Platform.OS === "web" && (
              <BottomSheetHandle
                className="bg-gray-300 mt-2"
                animatedIndex={undefined}
                animatedPosition={undefined}
              />
            )}
            <Text className="mt-10 text-center">Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </View>
  );
}
