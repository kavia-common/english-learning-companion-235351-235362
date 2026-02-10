import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/rootTypes";

import type { QuizzesStackParamList } from "../../navigation/types";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { ProgressBar } from "../../components/ProgressBar";
import { theme } from "../../theme/theme";

export function QuizResultsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<QuizzesStackParamList, "QuizResults">>();

  const { score, total, quizId } = route.params;
  const pct = total === 0 ? 0 : score / total;

  return (
    <View style={styles.screen}>
      <Header title="Results" subtitle="Nice work—keep the momentum going." />

      <View style={styles.body}>
        <Card>
          <Text style={styles.big}>
            {score} / {total}
          </Text>
          <Text style={styles.small}>{Math.round(pct * 100)}% correct</Text>

          <ProgressBar value={pct} style={{ marginTop: theme.spacing.md }} />

          <View style={{ marginTop: theme.spacing.lg }}>
            <Button title="Try again" onPress={() => navigation.replace("QuizPlayer", { quizId })} />
            <Button
              title="Back to quizzes"
              variant="ghost"
              onPress={() => navigation.popToTop()}
              style={{ marginTop: theme.spacing.sm }}
            />
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  body: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md },
  big: { fontSize: 44, fontWeight: theme.typography.weight.bold, color: theme.colors.text },
  small: { marginTop: theme.spacing.xs, color: theme.colors.mutedText, fontWeight: theme.typography.weight.semibold },
});
