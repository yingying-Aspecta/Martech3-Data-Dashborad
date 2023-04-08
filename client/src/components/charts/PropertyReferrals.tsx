import { Box, Stack, Typography } from "@mui/material";

import { propertyReferralsInfo } from "constants/index";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "components";
import { DataItem } from "pages/home";
interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
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
      return "#EEB51A";
    case "> 0.05%":
      return "#F9CD4C";
    case "other":
      return "#FF8C00";
    default:
      return "gray";
  }
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
interface PropertyReferralsProps {
  dataItem: DataItem;
}

const PropertyReferrals: React.FC<PropertyReferralsProps> = ({ dataItem }) => {
  if (!dataItem) {
    console.error("dataItem is undefined!");
    return null; // 或者返回一个表示错误状态的组件
  }

  console.log("property dataitem:", dataItem);
  var data = dataItem.data;
  var index = dataItem.index;
  var name = dataItem.name;
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
        Decentralized Index
      </Typography>

      <Stack my="20px" direction="column" gap={4}>
        {Object.entries(data).map(([title, percentage]) => (
          <ProgressBar
            key={title}
            title={title}
            percentage={percentage}
            color={getColor(title)}
          />
        ))}
      </Stack>
      <PieChart
        title={"Decentralized Index for " + name}
        value={`${index}%`}
        series={Object.values(data)}
        colors={[
          "#F45252",
          "#FFA2C0",
          "#FFCE73",
          "#EEB51A",
          "#F9CD4C",
          "#FF8C00",
        ]}
      />
    </Box>
  );
};

export default PropertyReferrals;
