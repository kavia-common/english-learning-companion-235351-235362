import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/rootTypes";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Chip } from "../../components/Chip";
import { theme } from "../../theme/theme";
import type { Quiz } from "../../api/client";
import { fetchQuizzes } from "../../api/useCases";
import { useAppStore } from "../../store/useAppStore";

export function QuizzesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setLastQuizId = useAppStore((s) => s.setLastQuizId);

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchQuizzes()
      .then((data) => mounted && setQuizzes(data))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.screen}>
      <Header title="Quizzes" subtitle={loading ? "Loading quizzes..." : "Quick checks to build confidence."} />

      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setLastQuizId(item.id);
              navigation.navigate("QuizPlayer", { quizId: item.id });
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.96 : 1 }]}
          >
            <Card>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.meta}>{item.questionCount} questions</Text>
                </View>
                <Chip
                  label={item.difficulty}
                  tone={item.difficulty === "Beginner" ? "success" : item.difficulty === "Intermediate" ? "secondary" : "primary"}
                />
              </View>
            </Card>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: theme.spacing.md }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  list: { paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xxl },
  row: { flexDirection: "row", alignItems: "center", gap: theme.spacing.md },
  title: { fontSize: theme.typography.size.lg, fontWeight: theme.typography.weight.semibold, color: theme.colors.text },
  meta: { marginTop: theme.spacing.xs, color: theme.colors.mutedText },
});
