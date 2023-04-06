import { useList } from "@refinedev/core";
import { Typography, Box, Stack } from "@mui/material";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
} from "components";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
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
    </Box>
  );
};

export default Home;
