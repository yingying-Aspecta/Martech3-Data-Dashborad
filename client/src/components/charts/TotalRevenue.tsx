import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { ArrowCircleUpRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
// import { fetchDataAndUpdate } from "./chart.config";

import Chart from "react-apexcharts";
import {
  ChartOptionsArray,
  ChartSeriesArray,
  ChartSeries,
  ChartOptions,
  DataArrays,
} from "./chart.config"; // 从chartConfig.ts中导入配置和数据

interface ChartSeriesItem {
  name: string;
  data: number[];
}
interface TotalRevenueProps {
  chartData: {
    ChartSeries: ChartSeriesItem[];
    ChartCategories: string[];
    CategoriesArray: string[][];
    DataArrays: number[][];
    ChartSeriesArray: ChartSeriesItem[];
  };
}
function calculateSum(chartSeries: ChartSeriesItem[]): number {
  let totalSum = 0;

  chartSeries.forEach((series) => {
    series.data.forEach((value) => {
      totalSum += value;
    });
  });

  return totalSum;
}
function useNewChartSeriesSum(
  dataArrays: number[][],
  clickedIndex: number | null
): number {
  const [newChartSeriesSum, setNewChartSeriesSum] = useState(0);

  useEffect(() => {
    if (clickedIndex !== null && dataArrays[clickedIndex]) {
      const sum = dataArrays[clickedIndex].reduce(
        (total, value) => total + value,
        0
      );
      setNewChartSeriesSum(sum);
    }
  }, [dataArrays, clickedIndex]);

  return newChartSeriesSum;
}
const TotalRevenue: React.FC<TotalRevenueProps> = ({ chartData }) => {
  // 使用传入的 chartData 更新图表
  const {
    ChartSeries,
    ChartCategories,
    CategoriesArray,
    DataArrays,
    ChartSeriesArray,
  } = chartData;
  const [showAnotherChart, setShowAnotherChart] = useState(false);
  const [clickedDataPointIndex, setClickedDataPointIndex] = useState<
    number | null
  >(null);

  const handleClick = (event: any, chartContext: any, config: any) => {
    // console.log(chartContext, config);
    const clickedDataPointIndex = config.dataPointIndex;
    console.log("Clicked bar index:", clickedDataPointIndex);
    setClickedDataPointIndex(clickedDataPointIndex);
    // console.log("Clicked bar index:", clickedDataPointIndex);
    // fetchDataAndUpdate();
    if (clickedDataPointIndex !== -1) {
      setShowAnotherChart(true);
    }
  };
  const updatedChartOptions = {
    ...ChartOptions,
    xaxis: {
      ...ChartOptions.xaxis,
      categories: ChartCategories,
      labels: {
        style: {
          colors: Array(ChartCategories.length).fill("#FFFFFF"), // 将所有图例颜色设置为白色
        },
      },
    },
  };
  var newData = useNewChartSeriesSum(DataArrays, clickedDataPointIndex);
  const chartSeriesSum = calculateSum(ChartSeries);
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#404040 "
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      {!showAnotherChart && (
        <>
          <Typography fontSize={18} fontWeight={600} color="#ffffff">
            Total Number
          </Typography>
          <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
            <Typography fontSize={28} fontWeight={700} color="#ffffff">
              {chartSeriesSum}
            </Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <ArrowCircleUpRounded sx={{ fontSize: 25, color: "#FF8C00" }} />
              <Stack>
                <Typography fontSize={15} color="#FFFFFF">
                  11.2%
                </Typography>
                <Typography fontSize={12} color="#808191">
                  Than Last Month
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Chart
            series={ChartSeries}
            type="bar"
            height={550}
            options={{
              ...updatedChartOptions,
              chart: {
                ...updatedChartOptions.chart,
                events: { click: handleClick },
              },
            }}
          />
        </>
      )}
      {showAnotherChart &&
        clickedDataPointIndex !== null &&
        clickedDataPointIndex < CategoriesArray.length && (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography fontSize={18} fontWeight={600} color="#FFFFFF">
                  Other Labels
                </Typography>
                <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
                  <Typography fontSize={28} fontWeight={700} color="#FFFFFF">
                    {newData}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <ArrowCircleUpRounded
                      sx={{ fontSize: 25, color: "#FF8C00" }}
                    />
                    <Stack>
                      <Typography fontSize={15} color="#ffffff">
                        11.2%
                      </Typography>
                      <Typography fontSize={12} color="#808191">
                        Than Last Month
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setShowAnotherChart(false)}
                  sx={{
                    backgroundColor: "#FF8C00",
                    "&:hover": {
                      backgroundColor: "#FF8C00",
                    },
                  }}
                >
                  Back
                </Button>
              </Box>
            </Box>

            <Chart
              key={clickedDataPointIndex}
              options={
                ChartOptionsArray[clickedDataPointIndex]
                  ? {
                      ...ChartOptionsArray[clickedDataPointIndex],
                      xaxis: {
                        ...ChartOptionsArray[clickedDataPointIndex].xaxis,
                        categories: CategoriesArray[clickedDataPointIndex],
                        labels: {
                          style: {
                            colors: Array(ChartCategories.length).fill(
                              "#FFFFFF"
                            ), // 将所有图例颜色设置为白色
                          },
                        },
                      },
                    }
                  : {
                      ...ChartOptions,
                      xaxis: {
                        ...ChartOptions.xaxis,
                        categories: CategoriesArray[clickedDataPointIndex],
                        labels: {
                          style: {
                            colors: Array(ChartCategories.length).fill(
                              "#FFFFFF"
                            ), // 将所有图例颜色设置为白色
                          },
                        },
                      },
                    }
              }
              series={[ChartSeriesArray[clickedDataPointIndex]]}
              type="bar"
              height={550}
            />
          </>
        )}
    </Box>
  );
};

export default TotalRevenue;
