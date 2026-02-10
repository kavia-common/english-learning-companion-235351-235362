import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { theme } from "../theme/theme";

type Props = {
  label: string;
  tone?: "primary" | "secondary" | "neutral" | "success";
  style?: ViewStyle;
};

// PUBLIC_INTERFACE
export function Chip({ label, tone = "neutral", style }: Props) {
  /** Small rounded tag used for metadata (difficulty, duration). */
  return (
    <View style={[styles.base, toneStyles[tone], style]}>
      <Text style={[styles.text, textToneStyles[tone]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderWidth: 1,
  },
  text: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
  },
});

const toneStyles = StyleSheet.create({
  primary: { backgroundColor: "rgba(244, 114, 182, 0.14)", borderColor: "rgba(244, 114, 182, 0.30)" },
  secondary: {
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    borderColor: "rgba(245, 158, 11, 0.30)",
  },
  success: { backgroundColor: "rgba(16, 185, 129, 0.14)", borderColor: "rgba(16, 185, 129, 0.30)" },
  neutral: { backgroundColor: "rgba(55, 65, 81, 0.06)", borderColor: theme.colors.border },
});

const textToneStyles = StyleSheet.create({
  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.secondary },
  success: { color: theme.colors.success },
  neutral: { color: theme.colors.text },
});
