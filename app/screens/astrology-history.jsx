import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../src/hooks/useAuth";
import { getUserHistory } from "../../src/services/historyService";

const formatHistoryDate = (createdAt) => {
  if (!createdAt) return "Just now";

  const date =
    typeof createdAt?.toDate === "function"
      ? createdAt.toDate()
      : createdAt instanceof Date
        ? createdAt
        : null;

  if (!date || Number.isNaN(date.getTime())) return "Just now";

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const getResultSummary = (item) => {
  const result = item?.result || {};

  if (item?.toolName === "Zodiac Calculator") {
    return result?.name ? `Sign: ${result.name}` : "Zodiac result";
  }

  if (item?.toolName === "Lucky Number Calculator") {
    return result?.lifePathNumber
      ? `Life Path: ${result.lifePathNumber}`
      : "Lucky number result";
  }

  if (item?.toolName === "Compatibility Calculator") {
    const score = result?.score ? `${result.score}%` : "N/A";
    return `${result?.yourSign || "-"} + ${result?.partnerSign || "-"} (${score})`;
  }

  return "Astrology result";
};

export default function AstrologyHistoryScreen() {
  const { firebaseUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);

  const loadHistory = useCallback(
    async (isRefresh = false) => {
      if (!firebaseUser?.uid) {
        setHistoryItems([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      try {
        const items = await getUserHistory(firebaseUser.uid);
        const sortedItems = [...items].sort((a, b) => {
          const dateA = a?.createdAt?.seconds || 0;
          const dateB = b?.createdAt?.seconds || 0;
          return dateB - dateA;
        });
        setHistoryItems(sortedItems);
      } catch {
        setHistoryItems([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [firebaseUser?.uid]
  );

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text className="mt-4 text-sm text-gray-500">Loading history...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadHistory(true)} />}
    >
      <Text className="text-xs font-semibold uppercase tracking-widest text-violet-500">
        Astrology
      </Text>
      <Text className="mt-2 text-3xl font-bold text-gray-900">Tool History</Text>
      <Text className="mt-1 text-sm text-gray-500">
        Your saved zodiac, compatibility, and lucky number results.
      </Text>

      {historyItems.length === 0 ? (
        <View className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <Text className="text-sm font-semibold text-gray-800">No history yet</Text>
          <Text className="mt-2 text-sm text-gray-600">
            Run any astrology tool and results will appear here.
          </Text>
        </View>
      ) : (
        <View className="mt-8 gap-3">
          {historyItems.map((item) => (
            <View key={item.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <Text className="text-sm font-semibold text-violet-700">{item.toolName || "Tool"}</Text>
              <Text className="mt-1 text-sm text-gray-900">{getResultSummary(item)}</Text>
              <Text className="mt-2 text-xs text-gray-500">{formatHistoryDate(item.createdAt)}</Text>
            </View>
          ))}
        </View>
      )}

      <Pressable
        onPress={() => loadHistory(true)}
        className="mt-8 items-center rounded-2xl border border-violet-200 bg-violet-50 py-3"
      >
        <Text className="text-sm font-semibold text-violet-700">Refresh History</Text>
      </Pressable>
    </ScrollView>
  );
}
