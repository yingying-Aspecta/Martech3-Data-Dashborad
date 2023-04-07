import { useList } from "@refinedev/core";
import { Typography, Box, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
} from "components";
interface ChartData {
  ChartSeries: ChartSeriesItem[];
  ChartCategories: string[];
  CategoriesArray: string[][];
  DataArrays: number[][];
  ChartSeriesArray: ChartSeriesItem[];
}

interface ChartSeriesItem {
  name: string;
  data: number[];
}

import { fetchData } from "components/charts/chart.config";

// 创建一个异步函数，从后端获取数据并返回
async function fetchChartData(): Promise<ChartData> {
  // 在这里实现从后端获取数据的逻辑
  // 假设您已经从后端获取了数据并将其存储在变量 `response` 中
  const response = await fetchData();

  // 返回所需的数据结构
  return {
    ChartCategories: response.ChartCategories,
    ChartSeries: response.ChartSeries,
    CategoriesArray: response.CategoriesArray,
    DataArrays: response.DataArrays,
    ChartSeriesArray: response.ChartSeriesArray,
  };
}

const Home = () => {
  const [chartData, setChartData] = useState<ChartData>({
    ChartCategories: [],
    ChartSeries: [],
    CategoriesArray: [],
    DataArrays: [],
    ChartSeriesArray: [],
  });

  // 获取数据并更新状态
  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      const _data = await fetchChartData();
      setChartData(_data);
    };

    fetchDataAndUpdate();
  }, []);

  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  // if (isLoading) return <Typography>Loading...</Typography>;
  //   if (isError) return <Typography>Something went wrong!</Typography>;

  //   if (loading) fetchDataAndUpdate();
  return (
    <Box>
      <>
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          Dashboard
        </Typography>

        <Stack
          mt="25px"
          width="100%"
          direction={{ xs: "column", lg: "row" }}
          gap={4}
        >
          <TotalRevenue chartData={chartData} />
          <PropertyReferrals />
          {/* <Box mt="20px" width="300px" display="flex" flexWrap="wrap" gap={4}>
              <PieChart
                title="User Number"
                value={684}
                series={[25, 25, 50]}
                colors={["#275be8", "#c4e8ef",]}
              />
            </Box> */}
        </Stack>
      </>
    </Box>
  );
};

export default Home;
