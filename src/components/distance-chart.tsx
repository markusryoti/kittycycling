import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useRides } from "@/lib/ride-sessions/ride-sessions";
import { generateChartData } from "@/lib/chart-data/chart-data";

const chartConfig = {
  distance: {
    label: "Distance",
    color: "var(--chart-4)",
  },
  goal: {
    label: "Goal",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function DistanceChart() {
  const { sessions, rideTarget } = useRides();

  const chartData = generateChartData(
    sessions,
    Intl.DateTimeFormat("fi-FI"),
    rideTarget
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative Distance</CardTitle>
        <CardDescription>
          Total number of kilometers from beginning of training
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="distance"
              type="monotone"
              stroke="var(--color-distance)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="goal"
              type="monotone"
              stroke="var(--color-goal)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
