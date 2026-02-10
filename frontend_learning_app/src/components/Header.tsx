import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/theme";

type Props = {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

// PUBLIC_INTERFACE
export function Header({ title, subtitle, right }: Props) {
  /** Screen header with title, subtitle, and optional right-side slot. */
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  left: { flex: 1, paddingRight: theme.spacing.md },
  right: { alignItems: "flex-end", justifyContent: "flex-end" },
  title: {
    fontSize: theme.typography.size.xxl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.size.md,
    color: theme.colors.mutedText,
  },
});
