export const colors = {
  primary: "#F472B6",
  secondary: "#F59E0B",
  success: "#10B981",
  error: "#EF4444",
  background: "#FDF2F8",
  surface: "#FFFFFF",
  text: "#374151",
  mutedText: "#6B7280",
  border: "rgba(55, 65, 81, 0.12)",
  overlay: "rgba(17, 24, 39, 0.35)",
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  family: {
    system: undefined as unknown as string, // RN default system font
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const shadows = {
  card: {
    shadowColor: "#111827",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
} as const;

export type AppTheme = typeof theme;
