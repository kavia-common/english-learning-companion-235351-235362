import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { theme } from "../theme/theme";

type Props = {
  value: number; // 0..1
  height?: number;
  color?: string;
  style?: ViewStyle;
};

// PUBLIC_INTERFACE
export function ProgressBar({ value, height = 10, color = theme.colors.primary, style }: Props) {
  /** Simple themed progress bar (0..1). */
  const clamped = Math.max(0, Math.min(1, value));

  return (
    <View style={[styles.track, { height }, style]}>
      <View style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    borderRadius: theme.radii.pill,
    backgroundColor: "rgba(55, 65, 81, 0.10)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: theme.radii.pill,
  },
});
