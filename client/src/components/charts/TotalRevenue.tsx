import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { ArrowCircleUpRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

import Chart from "react-apexcharts";
import {
  ChartOptionsArray,
  ChartSeriesArray,
  ChartSeries,
  ChartOptions,
} from "./chart.config"; // 从chartConfig.ts中导入配置和数据

const TotalRevenue: React.FC = () => {
  const [showAnotherChart, setShowAnotherChart] = useState(false);
  const [clickedDataPointIndex, setClickedDataPointIndex] = useState<
    number | null
  >(null);

  const handleClick = (event: any, chartContext: any, config: any) => {
    // console.log(chartContext, config);

    const clickedDataPointIndex = config.dataPointIndex;
    console.log("Clicked bar index:", clickedDataPointIndex);
    setClickedDataPointIndex(clickedDataPointIndex);
    if (clickedDataPointIndex !== -1) {
      setShowAnotherChart(true);
    }
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
              ...ChartOptions,
              chart: {
                ...ChartOptions.chart,
                events: { click: handleClick },
              },
            }}
          />
        </>
      )}
      {showAnotherChart &&
        [0, 1, 2, 3, 4, 5, 6].map((index) => {
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
                  series={ChartSeriesArray[index]}
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
