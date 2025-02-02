import React, { ReactElement } from "react";
import {
  SafeAreaInsetsContext,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styled, View } from "tamagui";
import { ViewProps, ViewComponent } from "react-native";
import { MySafeAreaView } from "./MySafeAreaView";

export const SafeAreaModalView = ({
  children,
}: ViewProps): ReactElement<ViewProps, any> => {
  const insets = useSafeAreaInsets();
  return (
    <MySafeAreaView
      style={{
        paddingTop: -insets?.top,
        paddingBottom: insets?.top,
        paddingRight: insets?.right,
        paddingLeft: insets?.left,
      }}
    >
      {children}
    </MySafeAreaView>
  );
};
