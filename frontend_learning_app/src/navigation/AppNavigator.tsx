import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import { theme } from "../theme/theme";
import type {
  DashboardStackParamList,
  LessonsStackParamList,
  ProgressStackParamList,
  QuizzesStackParamList,
  TabParamList,
} from "./types";

import { DashboardScreen } from "../screens/Dashboard/DashboardScreen";
import { LessonsScreen } from "../screens/Lessons/LessonsScreen";
import { LessonDetailScreen } from "../screens/Lessons/LessonDetailScreen";
import { LessonPracticeScreen } from "../screens/Lessons/LessonPracticeScreen";
import { QuizzesScreen } from "../screens/Quizzes/QuizzesScreen";
import { QuizPlayerScreen } from "../screens/Quizzes/QuizPlayerScreen";
import { QuizResultsScreen } from "../screens/Quizzes/QuizResultsScreen";
import { ProgressScreen } from "../screens/Progress/ProgressScreen";

const Tab = createBottomTabNavigator<TabParamList>();

const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();
const LessonsStack = createNativeStackNavigator<LessonsStackParamList>();
const QuizzesStack = createNativeStackNavigator<QuizzesStackParamList>();
const ProgressStack = createNativeStackNavigator<ProgressStackParamList>();

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const color = focused ? theme.colors.primary : theme.colors.mutedText;
  return <Text style={{ color, fontWeight: "700", fontSize: 12 }}>{label}</Text>;
}

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="DashboardHome" component={DashboardScreen} />
    </DashboardStack.Navigator>
  );
}

function LessonsStackNavigator() {
  return (
    <LessonsStack.Navigator screenOptions={{ headerShown: false }}>
      <LessonsStack.Screen name="LessonsHome" component={LessonsScreen} />
      <LessonsStack.Screen name="LessonDetail" component={LessonDetailScreen} />
      <LessonsStack.Screen name="LessonPractice" component={LessonPracticeScreen} />
    </LessonsStack.Navigator>
  );
}

function QuizzesStackNavigator() {
  return (
    <QuizzesStack.Navigator screenOptions={{ headerShown: false }}>
      <QuizzesStack.Screen name="QuizzesHome" component={QuizzesScreen} />
      <QuizzesStack.Screen name="QuizPlayer" component={QuizPlayerScreen} />
      <QuizzesStack.Screen name="QuizResults" component={QuizResultsScreen} />
    </QuizzesStack.Navigator>
  );
}

function ProgressStackNavigator() {
  return (
    <ProgressStack.Navigator screenOptions={{ headerShown: false }}>
      <ProgressStack.Screen name="ProgressHome" component={ProgressScreen} />
    </ProgressStack.Navigator>
  );
}

// PUBLIC_INTERFACE
export function AppNavigator() {
  /** Root navigator with bottom tabs + per-tab stack navigation. */
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            height: 70,
            paddingTop: 10,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.mutedText,
          tabBarLabelStyle: { fontWeight: "700", marginBottom: 8 },
        }}
      >
        <Tab.Screen
          name="DashboardTab"
          component={DashboardStackNavigator}
          options={{ title: "Dashboard", tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} /> }}
        />
        <Tab.Screen
          name="LessonsTab"
          component={LessonsStackNavigator}
          options={{ title: "Lessons", tabBarIcon: ({ focused }) => <TabIcon label="Lessons" focused={focused} /> }}
        />
        <Tab.Screen
          name="QuizzesTab"
          component={QuizzesStackNavigator}
          options={{ title: "Quizzes", tabBarIcon: ({ focused }) => <TabIcon label="Quizzes" focused={focused} /> }}
        />
        <Tab.Screen
          name="ProgressTab"
          component={ProgressStackNavigator}
          options={{ title: "Progress", tabBarIcon: ({ focused }) => <TabIcon label="Progress" focused={focused} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
