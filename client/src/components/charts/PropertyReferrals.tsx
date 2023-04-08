import { Box, Stack, Typography } from "@mui/material";

import { propertyReferralsInfo } from "constants/index";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "components";
interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="#ffffff">
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={500} color="#ffffff">
        {percentage}%
      </Typography>
    </Stack>
    <Box
      mt={2}
      position="relative"
      width="100%"
      height="8px"
      borderRadius={1}
      bgcolor="#e4e8ef"
    >
      <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
      />
    </Box>
  </Box>
);
interface ProgressData {
  title: string;
  percentage: number;
  color: string;
}
interface DataItem {
  "> 1%": number;
  "> 0.5%": number;
  "> 0.2%": number;
  "> 0.1%": number;
  other: number;
}

async function fetchProgressData(): Promise<ProgressData[]> {
  try {
    const response = await axios.get(
      "http://149.248.11.13:8080/api/v1/holders/getHolderAndAsset/0x09ffd4248f735965795bb36df9754ec58e872caa"
    );
    const data: DataItem = response.data;

    const progressData: ProgressData[] = Object.entries(data).map(
      ([title, percentage]) => {
        return {
          title,
          percentage,
          color: getColor(title), // 使用 getColor(title) 函数为不同的 title 分配颜色
        };
      }
    );

    return progressData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
function getColor(title: string): string {
  // 根据 title 为不同的进度条分配颜色
  switch (title) {
    case "> 1%":
      return "#F45252";
    case "> 0.5%":
      return "#FFA2C0";
    case "> 0.2%":
      return "#FFCE73";
    case "> 0.1%":
      return "#7FBA7A";
    case "other":
      return "#FF8C00";
    default:
      return "gray";
  }
}

const PropertyReferrals: React.FC = () => {
  const [ProgressBarProps, setProgressBarProps] = useState<ProgressBarProps[]>(
    []
  );

  const fetchProgressBarPropsData = async () => {
    try {
      const _data = await fetchProgressData();
      setProgressBarProps(_data);
    } catch (error) {
      console.error("从后端获取数据时出错:", error);
    }
  };

  useEffect(() => {
    fetchProgressBarPropsData();
  }, []);
  return (
    <Box
      p={4}
      bgcolor="#404040  "
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#ffffff">
        Decentralized Index for xxx
      </Typography>

      <Stack my="20px" direction="column" gap={4}>
        {ProgressBarProps.map((bar) => (
          <ProgressBar key={bar.title} {...bar} />
        ))}
      </Stack>
      <PieChart
        title="Decentralized Index"
        value={91.2}
        series={[0.5, 1.1, 3.8, 11.1, 83.5]}
        colors={["#F45252", "#FFA2C0", "#FFCE73", "#7FBA7A", "#FF8C00"]}
      />
    </Box>
  );
};

export default PropertyReferrals;
