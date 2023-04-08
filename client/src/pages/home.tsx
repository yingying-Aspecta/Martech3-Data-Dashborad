import { useList } from "@refinedev/core";
import { Typography, Box, Stack, TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "@refinedev/react-hook-form";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
} from "components";
import axios from "axios";
interface ChartData {
  ChartSeries: ChartSeriesItem[];
  ChartCategories: string[];
  CategoriesArray: string[][];
  DataArrays: number[][];
  ChartSeriesArray: ChartSeriesItem[];
}
export interface DataItem {
  data: {
    "> 1%": number;
    "> 0.5%": number;
    "> 0.2%": number;
    "> 0.1%": number;
    ">0.05%": number;
    other: number;
  };
  index: number;
  name: string;
}

interface ChartSeriesItem {
  name: string;
  data: number[];
}

import { fetchData } from "components/charts/chart.config";

// 创建一个异步函数，从后端获取数据并返回
async function fetchChartData(s: string): Promise<ChartData> {
  // 在这里实现从后端获取数据的逻辑
  // 假设您已经从后端获取了数据并将其存储在变量 `response` 中
  const response = await fetchData(s);

  // 返回所需的数据结构
  return {
    ChartCategories: response.ChartCategories,
    ChartSeries: response.ChartSeries,
    CategoriesArray: response.CategoriesArray,
    DataArrays: response.DataArrays,
    ChartSeriesArray: response.ChartSeriesArray,
  };
}
async function fetchProgressData(s: string): Promise<DataItem> {
  try {
    console.log("hello");
    const response = await axios.get(
      "http://149.248.11.13:8080/api/v1/holders/getHolderAndAsset/" + s
    );
    const _data: DataItem = response.data;
    console.log("data:", _data);
    return _data;
  } catch (error) {
    console.error(s, "\nError fetching data:", error);
    throw error;
  }
}

const Home = () => {
  const [chartData, setChartData] = useState<ChartData>({
    ChartCategories: [],
    ChartSeries: [],
    CategoriesArray: [],
    DataArrays: [],
    ChartSeriesArray: [],
  });
  //   const MyProfile = () => {
  const [loading, setLoading] = React.useState(false);
  //   const [userAddress, setUserAddress] = React.useState("");
  //   const [successAddress, setSuccessAddress] = React.useState("");
  //   const [contractAddress, setContractAddress] = React.useState("");
  var contractAddress = "";
  //   const [dataFeedsArray, setDataFeedsArray] = React.useState(Object);
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();
  // 获取数据并更新状态
  const [ProgressBarProps, setProgressBarProps] = useState<DataItem>({
    data: {
      "> 1%": 0,
      "> 0.5%": 0,
      "> 0.2%": 0,
      "> 0.1%": 0,
      ">0.05%": 0,
      other: 0,
    },
    index: 0,
    name: "",
  });

  function update() {
    contractAddress = inputString;
    console.log(contractAddress);
    const fetchDataAndUpdate = async () => {
      const _data = await fetchChartData(
        "http://149.248.11.13:8080/api/v1/holders/getLabelAndHolder/" +
          contractAddress
      );
      console.log("data:", _data);
      return _data;
    };

    const fetchProgressBarPropsData = async () => {
      console.log("contractAddress:", contractAddress);
      const _data = await fetchProgressData(contractAddress);
      console.log("data:", _data);
      // setProgressBarProps(_data);
      console.log("setProgress:", ProgressBarProps);
      return _data;
    };

    fetchDataAndUpdate().then((data1) => {
      fetchProgressBarPropsData().then((data2) => {
        setChartData(data1);
        setProgressBarProps(data2);
      });
    });
  }

  //   useEffect(() => {
  //     const fetchDataAndUpdate = async () => {
  //       const _data = await fetchChartData(
  //         "http://149.248.11.13:8080/api/v1/holders/getLabelAndHolder/" +
  //           contractAddress
  //       );
  //       console.log("data:", _data);
  //       setChartData(_data);
  //     };

  //     fetchDataAndUpdate();

  //     const fetchProgressBarPropsData = async () => {
  //       try {
  //         console.log("contractAddress:", contractAddress);
  //         const _data = await fetchProgressData(contractAddress);
  //         console.log("data:", _data);
  //         setProgressBarProps(_data);
  //         console.log("setProgress:", ProgressBarProps);
  //       } catch (error) {
  //         console.error("从后端获取数据时出错:", error);
  //       }
  //     };
  //     fetchProgressBarPropsData();
  //   }, [contractAddress]);

  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestProperties = data?.data ?? [];
  var inputString = "";

  return (
    <Box>
      <>
        <Typography fontSize={25} fontWeight={700} color="#ffffff">
          Dashboard
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <TextField
            {...register("title", {
              required: "This field is required",
            })}
            error={!!(errors as any)?.title}
            helperText={(errors as any)?.title?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Contract Address"
            name="user"
            onChange={async (e) => {
              inputString = e.target.value;
            }}
            disabled={loading}
          />
          <Button
            onClick={() => {
              update();
            }}
            disabled={loading}
          >
            submit
          </Button>
        </Box>
        <Stack
          mt="25px"
          width="100%"
          direction={{ xs: "column", lg: "row" }}
          gap={4}
        >
          <TotalRevenue chartData={chartData} />
          <PropertyReferrals dataItem={ProgressBarProps} />
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
