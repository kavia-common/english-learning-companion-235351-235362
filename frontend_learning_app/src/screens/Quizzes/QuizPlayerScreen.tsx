import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/rootTypes";

import type { QuizzesStackParamList } from "../../navigation/types";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { theme } from "../../theme/theme";
import type { Quiz } from "../../api/client";
import { fetchQuizWithQuestions, submitQuizAttempt } from "../../api/useCases";
import { useAppStore } from "../../store/useAppStore";

export function QuizPlayerScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<QuizzesStackParamList, "QuizPlayer">>();
  const setLastQuizId = useAppStore((s) => s.setLastQuizId);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Array<{ questionId: string; choiceIndex: number }>>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLastQuizId(route.params.quizId);
    fetchQuizWithQuestions(route.params.quizId).then((q) => mounted && setQuiz(q));
    return () => {
      mounted = false;
    };
  }, [route.params.quizId, setLastQuizId]);

  const questions = quiz?.questions ?? [];
  const current = questions[index];

  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    return (index + 1) / questions.length;
  }, [index, questions.length]);

  async function onNext() {
    if (!quiz || !current || selected == null) return;

    const nextAnswers = [...answers, { questionId: current.id, choiceIndex: selected }];
    setAnswers(nextAnswers);
    setSelected(null);

    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      return;
    }

    // Compute local score from mock correct answers (if available).
    const score = questions.reduce((acc, q, i) => {
      const chosen = nextAnswers[i]?.choiceIndex;
      return acc + (chosen === q.answerIndex ? 1 : 0);
    }, 0);

    setSubmitting(true);
    await submitQuizAttempt({ quizId: quiz.id, answers: nextAnswers, score });
    setSubmitting(false);

    navigation.replace("QuizResults", { quizId: quiz.id, score, total: questions.length });
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title={quiz?.title ?? "Quiz"} subtitle={quiz ? `Question ${index + 1} of ${questions.length}` : "Loading quiz..."} />

      <View style={styles.body}>
        {current ? (
          <Card>
            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
            </View>

            <Text style={styles.prompt}>{current.prompt}</Text>

            <View style={{ marginTop: theme.spacing.md, gap: theme.spacing.sm }}>
              {current.choices.map((c, i) => {
                const isSelected = selected === i;
                return (
                  <Pressable
                    key={`${current.id}-choice-${i}`}
                    onPress={() => setSelected(i)}
                    style={({ pressed }) => [
                      styles.choice,
                      isSelected ? styles.choiceSelected : null,
                      pressed ? { opacity: 0.97 } : null,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <Text style={[styles.choiceText, isSelected ? styles.choiceTextSelected : null]}>{c}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={{ marginTop: theme.spacing.lg }}>
              <Button
                title={index === questions.length - 1 ? "Finish" : "Next"}
                onPress={onNext}
                disabled={selected == null || submitting}
                loading={submitting}
              />
              <Button title="Exit quiz" variant="ghost" onPress={() => navigation.goBack()} style={{ marginTop: theme.spacing.sm }} />
            </View>
          </Card>
        ) : (
          <Card>
            <Text style={{ color: theme.colors.mutedText }}>Quiz questions unavailable. Please try again.</Text>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingBottom: theme.spacing.xxl },
  body: { paddingHorizontal: theme.spacing.lg },

  progressRow: { flexDirection: "row", alignItems: "center", gap: theme.spacing.sm },
  progressTrack: {
    flex: 1,
    height: 10,
    borderRadius: theme.radii.pill,
    backgroundColor: "rgba(55, 65, 81, 0.10)",
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: theme.colors.primary, borderRadius: theme.radii.pill },
  progressText: { color: theme.colors.mutedText, fontWeight: theme.typography.weight.semibold },

  prompt: {
    marginTop: theme.spacing.lg,
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
  },

  choice: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  choiceSelected: {
    borderColor: "rgba(244, 114, 182, 0.55)",
    backgroundColor: "rgba(244, 114, 182, 0.12)",
  },
  choiceText: { color: theme.colors.text, fontWeight: theme.typography.weight.semibold },
  choiceTextSelected: { color: theme.colors.primary },
});
