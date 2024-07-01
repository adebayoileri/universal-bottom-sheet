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
import { Pressable, StyleSheet, Platform } from "react-native";

export function Home() {
  const [isOpen, setIsOpen] = React.useState(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // bottomSheetWebRef
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
      <View style={styles.container}>
        {Platform.OS !== "web" && (
          <Pressable onPress={handlePresentModalPress}>
            <Text>Present Modal</Text>
          </Pressable>
        )}

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
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
          <BottomSheetView style={styles.contentContainer}>
            {Platform.OS === "web" && (
              <BottomSheetHandle
                className="bg-gray-300 mt-2"
                animatedIndex={undefined}
                animatedPosition={undefined}
              />
            )}
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 4,
    borderRadius: 4,
    // height: 28,
    // justifyContent: "center",
    // backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
