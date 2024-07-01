# Universal Bottom Sheet
A bottom sheet component that combines [Gorhom Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet) and [Vaul](https://github.com/emilkowalski/vaul) for seamless and responsive experience across both mobile and web.


> **Note:** This is not a standalone package. It is a wrapper around Gorhom Bottom Sheet and Vaul for use across both mobile and web. You need to install Gorhom Bottom Sheet and Vaul separately to use this package.


### Installation
I recommend following the [installation guide](https://ui.gorhom.dev/components/bottom-sheet/) for Gorhom's Bottom Sheet

```bash
npm install @gorhom/bottom-sheet@^4
```
or
```bash
yarn add @gorhom/bottom-sheet@^4

```
### Peer Dependencies
Make sure to install the following peer dependencies
```bash
npm install react-native-reanimated react-native-gesture-handler
```
or
```bash
yarn add react-native-reanimated react-native-gesture-handler
```
or with expo
```bash
npx expo install react-native-reanimated react-native-gesture-handler
```
### Web Support
Make sure to install the following dependencies
```bash
npm install vaul
```
or
```bash
yarn add vaul
```

### Styling with NativeWind (Optional)

This example uses [NativeWind](https://www.nativewind.dev/v4/overview/) for styling. You can use any other styling library of your choice.

Follow the installation guide [here](https://www.nativewind.dev/v4/getting-started/react-native)


### Usage
An example usage of component is shown below:

The `ui/bottom-sheet` module exports the following components:

- `BottomSheetModal`
- `BottomSheetModalProvider`
- `BottomSheetView`
- `BottomSheetTrigger`
- `BottomSheetHandle`
- `BottomSheetScrollView`


The files can be found in the [`ui/bottom-sheet`](https://github.com/adebayoileri/universal-bottom-sheet/tree/main/packages/ui/bottom-sheet) directory. Copy the files to your project and import them as shown below:

```tsx
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

```
### Author

#### [Adebayo Ilerioluwa](https://github.com/adebayoileri)