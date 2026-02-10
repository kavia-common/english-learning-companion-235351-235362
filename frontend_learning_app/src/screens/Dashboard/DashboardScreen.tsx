import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/rootTypes";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Chip } from "../../components/Chip";
import { ProgressBar } from "../../components/ProgressBar";
import { theme } from "../../theme/theme";
import { fetchProgress } from "../../api/useCases";
import { useAppStore } from "../../store/useAppStore";

export function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const displayName = useAppStore((s) => s.displayName);
  const lastLessonId = useAppStore((s) => s.lastLessonId);
  const lastQuizId = useAppStore((s) => s.lastQuizId);

  const [loading, setLoading] = useState(false);
  const [streakDays, setStreakDays] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [avgQuizScore, setAvgQuizScore] = useState(0);
  const [vocabKnown, setVocabKnown] = useState(0);
  const [vocabLearning, setVocabLearning] = useState(0);
  const [vocabNew, setVocabNew] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProgress()
      .then((p) => {
        if (!mounted) return;
        setStreakDays(p.streakDays);
        setLessonsCompleted(p.lessonsCompleted);
        setAvgQuizScore(p.averageQuizScore);
        setVocabKnown(p.vocabMastery.known);
        setVocabLearning(p.vocabMastery.learning);
        setVocabNew(p.vocabMastery.new);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const vocabTotal = useMemo(() => vocabKnown + vocabLearning + vocabNew, [vocabKnown, vocabLearning, vocabNew]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title={`Hi, ${displayName}`} subtitle="Let’s keep your English flowing today." />

      <View style={styles.grid}>
        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statTitle}>Streak</Text>
            <Chip tone="primary" label={loading ? "Loading..." : `${streakDays} days`} />
          </View>
          <Text style={styles.statValue}>{streakDays}</Text>
          <Text style={styles.statHint}>Consistency builds confidence.</Text>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statTitle}>Lessons</Text>
            <Chip tone="secondary" label={loading ? "Loading..." : `${lessonsCompleted} done`} />
          </View>
          <Text style={styles.statValue}>{lessonsCompleted}</Text>
          <Text style={styles.statHint}>Small sessions add up fast.</Text>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statTitle}>Quiz Avg</Text>
            <Chip tone="success" label={loading ? "Loading..." : `${avgQuizScore}%`} />
          </View>
          <Text style={styles.statValue}>{avgQuizScore}%</Text>
          <Text style={styles.statHint}>Keep sharpening accuracy.</Text>
        </Card>

        <Card style={styles.statCard}>
          <View style={styles.statHeader}>
            <Text style={styles.statTitle}>Vocab</Text>
            <Chip tone="neutral" label={`${vocabTotal} words`} />
          </View>
          <Text style={styles.statSmall}>
            Known <Text style={styles.bold}>{vocabKnown}</Text> · Learning{" "}
            <Text style={styles.bold}>{vocabLearning}</Text> · New <Text style={styles.bold}>{vocabNew}</Text>
          </Text>
          <ProgressBar
            value={vocabTotal === 0 ? 0 : vocabKnown / vocabTotal}
            color={theme.colors.primary}
            style={{ marginTop: theme.spacing.md }}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick actions</Text>

        <Card style={styles.actionCard}>
          <Text style={styles.actionTitle}>Continue a lesson</Text>
          <Text style={styles.actionDesc}>Pick up where you left off or start something new.</Text>
          <Button
            title={lastLessonId ? "Continue lesson" : "Browse lessons"}
            onPress={() => {
              navigation.navigate("LessonsTab");
              if (lastLessonId) {
                setTimeout(() => navigation.navigate("LessonDetail", { lessonId: lastLessonId }), 0);
              }
            }}
            style={{ marginTop: theme.spacing.md }}
          />
        </Card>

        <Card style={styles.actionCard}>
          <Text style={styles.actionTitle}>Take a quiz</Text>
          <Text style={styles.actionDesc}>Test yourself with quick multiple-choice questions.</Text>
          <Button
            title={lastQuizId ? "Continue quiz" : "Choose a quiz"}
            variant="secondary"
            onPress={() => {
              navigation.navigate("QuizzesTab");
              if (lastQuizId) {
                setTimeout(() => navigation.navigate("QuizPlayer", { quizId: lastQuizId }), 0);
              }
            }}
            style={{ marginTop: theme.spacing.md }}
          />
        </Card>

        <Card style={styles.actionCard}>
          <Text style={styles.actionTitle}>Review vocabulary</Text>
          <Text style={styles.actionDesc}>Short reviews help move words into long-term memory.</Text>
          <Button
            title="View progress"
            variant="ghost"
            onPress={() => navigation.navigate("ProgressTab")}
            style={{ marginTop: theme.spacing.md }}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingBottom: theme.spacing.xxl,
  },
  grid: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statCard: {
    padding: theme.spacing.lg,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  statTitle: {
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text,
  },
  statValue: {
    fontSize: theme.typography.size.xxl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
  },
  statHint: {
    marginTop: theme.spacing.xs,
    color: theme.colors.mutedText,
  },
  statSmall: {
    color: theme.colors.mutedText,
    lineHeight: 20,
  },
  bold: { fontWeight: theme.typography.weight.bold, color: theme.colors.text },

  section: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  actionCard: {
    marginBottom: theme.spacing.md,
  },
  actionTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text,
  },
  actionDesc: {
    marginTop: theme.spacing.xs,
    color: theme.colors.mutedText,
    lineHeight: 20,
  },
});
