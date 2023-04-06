import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { ArrowCircleUpRounded } from "@mui/icons-material";

import Chart from "react-apexcharts";
import {
  TotalRevenueSeries,
  AnotherChartSeries,
  TotalRevenueOptions,
  AnotherChartOptions,
} from "./chart.config"; // 从chartConfig.ts中导入配置和数据

const TotalRevenue: React.FC = () => {
  const [showAnotherChart, setShowAnotherChart] = useState(false);

  const handleClick = (event: any, chartContext: any, config: any) => {
    console.log(chartContext, config);
    setShowAnotherChart(true);
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

      {!showAnotherChart && (
        <Chart
          series={TotalRevenueSeries}
          type="bar"
          height={600}
          options={{
            ...TotalRevenueOptions,
            chart: {
              ...TotalRevenueOptions.chart,
              events: { click: handleClick },
            },
          }}
        />
      )}
      {showAnotherChart && (
        <Chart
          options={AnotherChartOptions}
          series={AnotherChartSeries}
          type="bar"
          height={600}
        />
      )}
    </Box>
  );
};

export default TotalRevenue;
