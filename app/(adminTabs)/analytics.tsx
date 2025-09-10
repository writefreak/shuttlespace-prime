import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

type PredictionData = {
  hours: number[];
  predictions: number[];
};

export default function Analytics() {
  const [data, setData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://shuttlespace-backend.vercel.app/api/aiFeature/peakDemand"
      );
      const json: PredictionData = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const screenWidth = Dimensions.get("window").width - 32;

  const max = data?.predictions ? Math.max(...data.predictions) : 0;
  const min = data?.predictions ? Math.min(...data.predictions) : 0;
  const avg = data?.predictions
    ? Math.round(
        data.predictions.reduce((a, b) => a + b, 0) / data.predictions.length
      )
    : 0;

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="bg-white flex-1">
      <ScrollView className="p-4 pt-20">
        <Text className="text-2xl font-semibold mb-4">Analytics Dashboard</Text>

        {/* Cards */}
        <View className="flex-row justify-between mb-20">
          <View className="w-[30%] h-28 bg-blue-200 rounded-2xl justify-center items-center">
            <Text className="text-lg font-semibold">Max</Text>
            <Text className="text-2xl font-bold">{max}</Text>
          </View>
          <View className="w-[30%] h-28 bg-blue-100 rounded-2xl justify-center items-center">
            <Text className="text-lg font-semibold">Min</Text>
            <Text className="text-2xl font-bold">{min}</Text>
          </View>
          <View className="w-[30%] h-28 bg-blue-300 rounded-2xl justify-center items-center">
            <Text className="text-lg font-semibold">Avg</Text>
            <Text className="text-2xl font-bold">{avg}</Text>
          </View>
        </View>

        {/* Bar Chart */}
        <View className="pt-4">
          <Text className="text-xl font-semibold mb-4">
            Next 6 Hours Demand
          </Text>
          {loading ? (
            <ActivityIndicator size="large" color="#003380" />
          ) : data ? (
            <BarChart
              data={{
                labels: data.hours.map((h) => `${h}:00`),
                datasets: [{ data: data.predictions }],
              }}
              width={screenWidth}
              height={220}
              fromZero
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 51, 128, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
              }}
              style={{ borderRadius: 16 }}
              showValuesOnTopOfBars
              withInnerLines={false}
            />
          ) : (
            <Text className="text-neutral-500 mt-4">No data available</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
