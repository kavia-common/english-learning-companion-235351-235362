import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Chip } from "../../components/Chip";
import { ProgressBar } from "../../components/ProgressBar";
import { theme } from "../../theme/theme";
import { fetchProgress } from "../../api/useCases";

export function ProgressScreen() {
  const [loading, setLoading] = useState(false);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [averageQuizScore, setAverageQuizScore] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);
  const [fresh, setFresh] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProgress()
      .then((p) => {
        if (!mounted) return;
        setLessonsCompleted(p.lessonsCompleted);
        setAverageQuizScore(p.averageQuizScore);
        setStreakDays(p.streakDays);
        setKnown(p.vocabMastery.known);
        setLearning(p.vocabMastery.learning);
        setFresh(p.vocabMastery.new);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const vocabTotal = useMemo(() => known + learning + fresh, [known, learning, fresh]);
  const knownPct = useMemo(() => (vocabTotal === 0 ? 0 : known / vocabTotal), [known, vocabTotal]);
  const learningPct = useMemo(() => (vocabTotal === 0 ? 0 : learning / vocabTotal), [learning, vocabTotal]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title="Progress" subtitle={loading ? "Loading your progress..." : "Your learning, beautifully summarized."} />

      <View style={styles.body}>
        <View style={styles.row}>
          <Card style={styles.kpi}>
            <Text style={styles.kpiLabel}>Lessons completed</Text>
            <Text style={styles.kpiValue}>{lessonsCompleted}</Text>
          </Card>
          <Card style={styles.kpi}>
            <Text style={styles.kpiLabel}>Streak</Text>
            <Text style={styles.kpiValue}>{streakDays}d</Text>
          </Card>
        </View>

        <Card style={{ marginTop: theme.spacing.md }}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Quiz performance</Text>
            <Chip tone="secondary" label={`${averageQuizScore}% avg`} />
          </View>
          <Text style={styles.cardSub}>Aim for 85%+ to lock in patterns.</Text>
          <ProgressBar value={averageQuizScore / 100} color={theme.colors.secondary} style={{ marginTop: theme.spacing.md }} />
        </Card>

        <Card style={{ marginTop: theme.spacing.md }}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Vocabulary mastery</Text>
            <Chip tone="primary" label={`${vocabTotal} words`} />
          </View>

          <View style={{ marginTop: theme.spacing.md }}>
            <Text style={styles.vocabLine}>
              Known <Text style={styles.bold}>{known}</Text>
            </Text>
            <ProgressBar value={knownPct} color={theme.colors.primary} style={{ marginTop: theme.spacing.xs }} />
          </View>

          <View style={{ marginTop: theme.spacing.md }}>
            <Text style={styles.vocabLine}>
              Learning <Text style={styles.bold}>{learning}</Text>
            </Text>
            <ProgressBar value={learningPct} color={theme.colors.success} style={{ marginTop: theme.spacing.xs }} />
          </View>

          <View style={{ marginTop: theme.spacing.md }}>
            <Text style={styles.vocabLine}>
              New <Text style={styles.bold}>{fresh}</Text>
            </Text>
            <ProgressBar value={vocabTotal === 0 ? 0 : fresh / vocabTotal} color={theme.colors.error} style={{ marginTop: theme.spacing.xs }} />
          </View>

          <Text style={[styles.cardSub, { marginTop: theme.spacing.md }]}>
            Tip: review “learning” words daily to move them into “known”.
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingBottom: theme.spacing.xxl },
  body: { paddingHorizontal: theme.spacing.lg },

  row: { flexDirection: "row", gap: theme.spacing.md },
  kpi: { flex: 1 },
  kpiLabel: { color: theme.colors.mutedText, fontWeight: theme.typography.weight.semibold },
  kpiValue: { marginTop: theme.spacing.xs, fontSize: 34, fontWeight: theme.typography.weight.bold, color: theme.colors.text },

  cardHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: theme.spacing.md },
  cardTitle: { fontSize: theme.typography.size.lg, fontWeight: theme.typography.weight.bold, color: theme.colors.text },
  cardSub: { marginTop: theme.spacing.xs, color: theme.colors.mutedText, lineHeight: 20 },

  vocabLine: { color: theme.colors.mutedText, fontWeight: theme.typography.weight.semibold },
  bold: { color: theme.colors.text, fontWeight: theme.typography.weight.bold },
});
