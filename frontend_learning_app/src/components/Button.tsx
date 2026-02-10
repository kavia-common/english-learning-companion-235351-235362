import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { theme } from "../theme/theme";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type Props = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
};

// PUBLIC_INTERFACE
export function Button({
  title,
  onPress,
  variant = "primary",
  disabled,
  loading,
  style,
  testID,
}: Props) {
  /** Themed, reusable button with variants. */
  const isDisabled = !!disabled || !!loading;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        isDisabled ? styles.disabled : null,
        pressed && !isDisabled ? styles.pressed : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "ghost" ? theme.colors.primary : "#fff"} />
      ) : (
        <Text style={[styles.textBase, textVariantStyles[variant]]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textBase: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.55,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});

const textVariantStyles = StyleSheet.create({
  primary: { color: "#fff" },
  secondary: { color: "#fff" },
  danger: { color: "#fff" },
  ghost: { color: theme.colors.primary },
});
