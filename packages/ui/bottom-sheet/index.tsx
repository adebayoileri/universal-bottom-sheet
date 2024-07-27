import React, { Fragment, forwardRef } from "react";
import BottomSheet, {
  BottomSheetView as BSView,
  BottomSheetModalProvider as BSModalProvider,
  BottomSheetModal as BSModal,
  BottomSheetScrollView as BSScrollView,
  BottomSheetHandle as BSHandle,
} from "@gorhom/bottom-sheet";
import type { BottomSheetModal as BSModalType } from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import { BottomSheetProps, BSHandleProps } from "./types";
import { View } from "react-native";

const BottomSheetContext = React.createContext(
  {} as {
    sheetRef: React.RefObject<BSModal>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

const BottomSheetModalProvider = ({
  ...props
}: {
  children: React.ReactNode;
}) => {
  const sheetRef = React.useRef<BSModal>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <BottomSheetContext.Provider value={{ sheetRef, isOpen, setIsOpen }}>
      <BSModalProvider>{props.children}</BSModalProvider>
    </BottomSheetContext.Provider>
  );
};

const useBottomSheet = () => {
  const { sheetRef, isOpen, setIsOpen } = React.useContext(BottomSheetContext);

  return { sheetRef, isOpen, setIsOpen };
};

const BottomSheetTrigger = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ children, ...props }, ref) => {
  const { sheetRef, setIsOpen, isOpen } = React.useContext(BottomSheetContext);

  const handlePress = React.useCallback(() => {
    if (sheetRef.current) {
      if (!isOpen) {
        sheetRef.current.present();
        setIsOpen(true);
      } else {
        sheetRef.current.dismiss();
        setIsOpen(false);
      }
    }
  }, [sheetRef, setIsOpen, isOpen]);

  return (
    <View ref={ref} {...props} onTouchEnd={handlePress}>
      {children}
    </View>
  );
});

type BottomSheetModal = BSModalType;
const BottomSheetModal = forwardRef<
  BSModal,
  BottomSheetProps & { children: React.ReactNode; isOpen?: boolean }
>(({ children, ...rest }: BottomSheetProps, ref) => {
  return (
    <BSModal ref={ref} {...rest}>
      {children}
    </BSModal>
  );
});

const BottomSheetView = cssInterop(BSView, {
  className: "style",
});

const BottomSheetScrollView = cssInterop(BSScrollView, {
  className: "style",
  contentContainerclassName: "contentContainerStyle",
});

const BottomSheetHandle: React.FC<BSHandleProps> = BSHandle;

export {
  BottomSheet,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTrigger,
  BottomSheetHandle,
  useBottomSheet,
};
