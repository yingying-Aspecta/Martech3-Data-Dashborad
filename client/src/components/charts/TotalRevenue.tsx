import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";
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

var C = [
  {
    name: "Last Month",
    data: [183, 124, 115, 85, 143, 143, 96],
  },
];
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
    },
  };

  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#fcfcfc"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      {!showAnotherChart && (
        <>
          <Typography fontSize={18} fontWeight={600} color="#11142d">
            Total Number
          </Typography>
          <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
            <Typography fontSize={28} fontWeight={700} color="#11142d">
              236,535
            </Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <ArrowCircleUpRounded sx={{ fontSize: 25, color: "#475be8" }} />
              <Stack>
                <Typography fontSize={15} color="#475be8">
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
        Array.from(
          { length: DataArrays[clickedDataPointIndex].length },
          (_, index) => index
        ).map((index) => {
          if (clickedDataPointIndex === index) {
            return (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography fontSize={18} fontWeight={600} color="#11142d">
                      Other Labels
                    </Typography>
                    <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
                      <Typography
                        fontSize={28}
                        fontWeight={700}
                        color="#11142d"
                      >
                        236,535
                      </Typography>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <ArrowCircleUpRounded
                          sx={{ fontSize: 25, color: "#475be8" }}
                        />
                        <Stack>
                          <Typography fontSize={15} color="#475be8">
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
                        backgroundColor: "#475BE8",
                        "&:hover": {
                          backgroundColor: "#475BE8",
                        },
                      }}
                    >
                      Back
                    </Button>
                  </Box>
                </Box>

                <Chart
                  key={index}
                  options={ChartOptionsArray[index]}
                  series={[ChartSeriesArray[index]]}
                  type="bar"
                  height={550}
                />
              </>
            );
          }
          return null;
        })}
    </Box>
  );
};

export default TotalRevenue;
