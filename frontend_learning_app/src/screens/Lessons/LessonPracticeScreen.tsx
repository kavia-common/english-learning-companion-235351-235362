import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/rootTypes";

import type { LessonsStackParamList } from "../../navigation/types";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { theme } from "../../theme/theme";
import type { Lesson } from "../../api/client";
import { fetchLesson } from "../../api/useCases";

export function LessonPracticeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<LessonsStackParamList, "LessonPractice">>();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchLesson(route.params.lessonId).then((l) => mounted && setLesson(l));
    return () => {
      mounted = false;
    };
  }, [route.params.lessonId]);

  const prompt = useMemo(() => {
    const title = lesson?.title ?? "this lesson";
    return `Write one sentence using something you learned in “${title}”.`;
  }, [lesson]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Header title="Practice" subtitle="Short writing practice to reinforce the lesson." />

      <View style={styles.body}>
        <Card>
          <Text style={styles.prompt}>{prompt}</Text>
          <TextInput
            value={answer}
            onChangeText={(t) => {
              setAnswer(t);
              setSubmitted(false);
            }}
            placeholder="Type your sentence..."
            placeholderTextColor="rgba(55, 65, 81, 0.45)"
            style={styles.input}
            multiline
          />
          {submitted ? <Text style={styles.feedback}>Nice! Keep it simple and clear. Try adding one more detail.</Text> : null}

          <View style={{ marginTop: theme.spacing.md }}>
            <Button
              title="Submit"
              onPress={() => setSubmitted(true)}
              disabled={answer.trim().length < 5}
            />
            <Button title="Back" variant="ghost" onPress={() => navigation.goBack()} style={{ marginTop: theme.spacing.sm }} />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { paddingBottom: theme.spacing.xxl },
  body: { paddingHorizontal: theme.spacing.lg },
  prompt: { color: theme.colors.text, fontSize: theme.typography.size.md, fontWeight: theme.typography.weight.semibold },
  input: {
    marginTop: theme.spacing.md,
    minHeight: 110,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    color: theme.colors.text,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  feedback: { marginTop: theme.spacing.sm, color: theme.colors.success, fontWeight: theme.typography.weight.semibold },
});
