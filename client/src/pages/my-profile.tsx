import { Box, Button, TextField, Typography, CircularProgress  } from "@mui/material";
import axios from "axios";
import { Create, Show, List } from "@refinedev/mui";
import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Web3Button } from "@thirdweb-dev/react";
import callContract from "./get_contract_data";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const FactoryContractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "userAddress",
        "type": "string"
      }
    ],
    "name": "NewUser",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "user_address",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "nft_attitude_oracle",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "token_attitude_oracle",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "recent_active_trader_type_oracle",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "active_trader_type_oracle",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "whale_type_oracle",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dealer_oracle",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "higher_risk_appetite_oracle",
        "type": "string"
      }
    ],
    "name": "createUserDataMapping",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUserNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "userCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "userTagMappings",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const MyProfile = () => {
  const [loading, setLoading] = React.useState(false);
  const [userAddress, setUserAddress] = React.useState("");
  const [successAddress, setSuccessAddress] = React.useState("");
  const [contractAddress, setContractAddress] = React.useState("");
  const [dataFeedsArray, setDataFeedsArray] = React.useState(Object);
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  // const { dataGridProps } = useDataGrid();
  const [data, setData] = React.useState<any>([]);


  // let categoryData = { data: '1' }
  // const constructData = (data:any):any[] => {
  //   let nData:any[] = []
  //   const newData = Object.entries(data).forEach(([key, value]) => {
  //     nData.concat ([{
  //       name: key,
  //       category: value,
  //       explain: 'value'
  //     }])
  //   });
  //   console.log(newData)
  //   return nData;
  // }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));





  interface MyObject {
    [key: string]: string;
  }

  const json_mock_data: MyObject = {
    "nft_attitude_oracle": "",
    "token_attitude_oracle": "",
    "recent_active_trader_type_oracle": "",
    "active_trader_type_oracle": "",
    "whale_type_oracle": "",
    "dealer_oracle": "",
    "higher_risk_appetite_oracle": "",
  }


  // const { data: user } = useGetIdentity({
  //     v3LegacyAuthProviderCompatible: true,
  // });
  // const { data, isLoading, isError } = useOne({
  //     resource: "users",
  //     id: user?.userid,
  // });

  // const myProfile = data?.data ?? [];

  const handleOracleCreations = async (user_id: String, main_path: String) => {
    console.log('=========', `${main_path}${user_id}}`)
    const nft_attitude_oracle = await createOraclesForUser(user_id, main_path, `$.nft_attitude_oracle`);
    console.log("nft_attitude_oracle", nft_attitude_oracle)
    if (nft_attitude_oracle === "OK" || nft_attitude_oracle === "Introduced pair URL with JSONPath already exists") {
      console.log("nft_attitude_oracle created");
    } else {
      return false
    }
    const token_attitude_oracle = await createOraclesForUser(user_id, main_path, `$.token_attitude_oracle`);
    console.log("token_attitude_oracle", token_attitude_oracle)
    if (token_attitude_oracle === "OK" || token_attitude_oracle === "Introduced pair URL with JSONPath already exists") {
      console.log("token_attitude_oracle created");
    } else {
      return false
    }
    const recent_active_trader_type_oracle = await createOraclesForUser(user_id, main_path, `$.recent_active_trader_type_oracle`);
    console.log("recent_active_trader_type_oracle", recent_active_trader_type_oracle)
    if (recent_active_trader_type_oracle === "OK" || recent_active_trader_type_oracle === "Introduced pair URL with JSONPath already exists") {
      console.log("recent_active_trader_type_oracle created");
    } else {
      return false
    }
    const active_trader_type_oracle = await createOraclesForUser(user_id, main_path, `$.active_trader_type_oracle`);
    console.log("active_trader_type_oracle", active_trader_type_oracle)
    if (active_trader_type_oracle === "OK" || active_trader_type_oracle === "Introduced pair URL with JSONPath already exists") {
      console.log("active_trader_type_oracle created");
    } else {
      return false
    }
    const whale_type_oracle = await createOraclesForUser(user_id, main_path, `$.whale_type_oracle`);
    console.log("whale_type_oracle", whale_type_oracle)
    if (whale_type_oracle === "OK" || whale_type_oracle === "Introduced pair URL with JSONPath already exists") {
      console.log("whale_type_oracle created");
    } else {
      return false
    }
    const dealer_oracle = await createOraclesForUser(user_id, main_path, `$.dealer_oracle`);
    console.log("dealer_oracle", dealer_oracle)
    if (dealer_oracle === "OK" || dealer_oracle === "Introduced pair URL with JSONPath already exists") {
      console.log("dealer_oracle created");
    } else {
      return false
    }
    const higher_risk_appetite_oracle = await createOraclesForUser(user_id, main_path, `$.higher_risk_appetite_oracle`);
    console.log("higher_risk_appetite_oracle", higher_risk_appetite_oracle)
    if (higher_risk_appetite_oracle === "OK" || higher_risk_appetite_oracle === "Introduced pair URL with JSONPath already exists") {
      console.log("higher_risk_appetite_oracle created");
    } else {
      return false
    }
    return true;
  }

  // if (isLoading) return <div>loading...</div>;
  // if (isError) return <div>error...</div>;
  const createOraclesForUser = async (user_id: String, path: String, item: String): Promise<string> => {
    const url = 'https://custom-urls-manifest-updater.redstone.finance/api/custom-urls';

    const payload = {
      url: `${path}${user_id}`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },

      jsonpath: item, // '$.assets.crypto_holdings.tokens[1].value',
      comment: '',
    };

    console.log(url, payload.url)
    return axios.post(url, payload)
      .then((response) => {
        console.log(response);
        return "OK"
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log('Status code 400, treated as "OK"');
          return "OK";
        } else {
          console.error('Error:', error);
          return error.response;
        }
      });
  }



  React.useEffect(() => {
    setLoading(true)
    callContract(contractAddress, dataFeedsArray).then(
      (data) => { setData(data); console.log('data', data); setLoading(false)}
    ).catch((error) => {
      callContract(contractAddress, dataFeedsArray).then(
        (data) => { setData(data); console.log('data', data); setLoading(false) }
      )
    }
    )

  }, [dataFeedsArray, contractAddress])


  const findOracles = async (user_id: String): Promise<boolean> => {
    const url = "https://custom-urls-manifest-updater.redstone.finance/api/assets"
    return axios.get(url)
      .then((response) => {
        const data: [string, any][] = Object.entries(response.data)
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i][1].customUrlDetails.url)
          if (data[i][1].customUrlDetails.url === `http://149.248.11.13:8080/api/v1/oracles/${user_id}`) {
            let item = data[i][1].customUrlDetails.jsonpath.toString().split(".").reverse()[0];
            console.log(item);
            json_mock_data[item] = data[i][0];
          }
        }
        console.log('G', json_mock_data)
        setDataFeedsArray(json_mock_data)
        if (Object.values(json_mock_data).every(val => val !== "")) {
          console.log('here')
          return true
        } else {
          return false
        }
      })
      .catch((error) => {
        console.error(error);
        return false
      });

  }


  return (
    <Box>
      <Create title={'Please type an address to map its evm user data to Scroll'} footerButtons={
        <Web3Button
          contractAddress="0x0BDE5812Cf666cBF568b5352bc39e471E7fC4151"
          contractAbi={FactoryContractABI}
          action={async (contract) => {
            setLoading(true)
            const CreateOracleSuccess = await handleOracleCreations(userAddress, "http://149.248.11.13:8080/api/v1/oracles/")
            console.log("user address", userAddress)
            console.log('hi')
            try {
              const count = await contract.call("getUserNumber")
              console.log("user count", Number(count))
              console.log("-----------------------------------------------------------------")
            } catch (e) {
              console.log(e)
            }
            if (CreateOracleSuccess) {
              console.log('findubf!')


              const findSuccess = await findOracles(userAddress)
              if (findSuccess) {
                const res1 = await contract.call("userTagMappings", [userAddress])
                setContractAddress(res1)
                if (res1 === "0x0000000000000000000000000000000000000000") {
                  const res = await contract.call("createUserDataMapping", [userAddress, json_mock_data.nft_attitude_oracle, json_mock_data.token_attitude_oracle, json_mock_data.recent_active_trader_type_oracle, json_mock_data.active_trader_type_oracle, json_mock_data.whale_type_oracle, json_mock_data.dealer_oracle, json_mock_data.higher_risk_appetite_oracle]); console.log('reshere', res);
                  const res1 = await contract.call("userTagMappings", [userAddress]); setContractAddress(res1); setSuccessAddress(userAddress)
                }
                console.log('=============', res1)

              }

            }
            setLoading(false)
          }}
          theme="dark"
        >
          Submit
        </Web3Button>
      }>
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
            label="User Address"
            name="user"
            onChange={async (e) => { setUserAddress(e.target.value) }}
            disabled={loading}
          />
        </Box>
      </Create>
      <List
        title={<Typography variant="h5">{`${successAddress === '' ? 'Your' : successAddress}'s Data Mapping on Scroll`}</Typography>}
      >
        <Box sx={{ marginBottom: 3 }}>{`Contract Address:${contractAddress === '' ? 'None' : contractAddress}`}</Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User Label</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Explaination</StyledTableCell>
                <StyledTableCell align="right">Oracle ID</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{alignItems:'center'}}>
              {data.map((row: any) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.category}</StyledTableCell>
                  <StyledTableCell align="right">{row.explaination}</StyledTableCell>
                  <StyledTableCell align="right">{row.oracleId}</StyledTableCell>
                </StyledTableRow>
              ))}
              {loading && <CircularProgress sx={{alignSelf: 'center'}} />}
            </TableBody>
          </Table>
        </TableContainer>
      </List>
    </Box>

  );
};

export default MyProfile;
