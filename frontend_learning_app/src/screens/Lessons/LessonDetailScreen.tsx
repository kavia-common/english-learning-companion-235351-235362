import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/rootTypes";

import type { LessonsStackParamList } from "../../navigation/types";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { Chip } from "../../components/Chip";
import { theme } from "../../theme/theme";
import type { Lesson } from "../../api/client";
import { fetchLesson } from "../../api/useCases";
import { useAppStore } from "../../store/useAppStore";

export function LessonDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<LessonsStackParamList, "LessonDetail">>();
  const setLastLessonId = useAppStore((s) => s.setLastLessonId);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchLesson(route.params.lessonId)
      .then((data) => {
        if (!mounted) return;
        setLesson(data);
        setLastLessonId(data.id);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [route.params.lessonId, setLastLessonId]);

  const title = lesson?.title ?? "Lesson";

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title={title} subtitle={loading ? "Loading lesson..." : "Read, then practice right away."} />

      {lesson ? (
        <View style={styles.body}>
          <View style={styles.heroRow}>
            <Chip
              label={lesson.difficulty}
              tone={lesson.difficulty === "Beginner" ? "success" : lesson.difficulty === "Intermediate" ? "secondary" : "primary"}
            />
            <Text style={styles.heroMeta}>{lesson.durationMinutes} min</Text>
          </View>

          {lesson.sections.map((s, idx) => (
            <Card key={`${lesson.id}-sec-${idx}`} style={{ marginTop: theme.spacing.md }}>
              <Text style={styles.sectionHeading}>{s.heading}</Text>
              <Text style={styles.sectionBody}>{s.content}</Text>
            </Card>
          ))}

          <View style={styles.footer}>
            <Button title="Start / Continue" onPress={() => navigation.navigate("LessonPractice", { lessonId: lesson.id })} />
            <Button title="Back to lessons" variant="ghost" onPress={() => navigation.goBack()} style={{ marginTop: theme.spacing.sm }} />
          </View>
        </View>
      ) : (
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          <Card>
            <Text style={{ color: theme.colors.mutedText }}>Lesson not available yet. Please try again.</Text>
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingBottom: theme.spacing.xxl },
  body: { paddingHorizontal: theme.spacing.lg },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  heroMeta: { color: theme.colors.mutedText, fontWeight: theme.typography.weight.semibold },
  sectionHeading: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text,
  },
  sectionBody: { marginTop: theme.spacing.sm, color: theme.colors.mutedText, lineHeight: 22 },
  footer: { marginTop: theme.spacing.xl },
});
