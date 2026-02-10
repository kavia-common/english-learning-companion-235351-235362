import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/rootTypes";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Chip } from "../../components/Chip";
import { theme } from "../../theme/theme";
import type { Lesson } from "../../api/client";
import { fetchLessons } from "../../api/useCases";

export function LessonsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchLessons()
      .then((data) => mounted && setLessons(data))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.screen}>
      <Header title="Lessons" subtitle={loading ? "Loading lessons..." : "Choose a lesson and practice in minutes."} />

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("LessonDetail", { lessonId: item.id })}
            style={({ pressed }) => [{ opacity: pressed ? 0.96 : 1 }]}
          >
            <Card style={styles.card}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.meta}>{item.durationMinutes} min · {item.sections.length} sections</Text>
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
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  card: {},
  row: { flexDirection: "row", alignItems: "center", gap: theme.spacing.md },
  title: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text,
  },
  meta: { marginTop: theme.spacing.xs, color: theme.colors.mutedText },
});
