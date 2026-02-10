import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { theme } from "../theme/theme";

type Props = PropsWithChildren<{
  style?: ViewStyle;
}>;

// PUBLIC_INTERFACE
export function Card({ children, style }: Props) {
  /** Rounded surface container used across screens. */
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
  },
});
