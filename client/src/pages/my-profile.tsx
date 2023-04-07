import { useGetIdentity, useOne, useShow } from "@refinedev/core";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Create, Show } from "@refinedev/mui";
import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { Web3Button } from "@thirdweb-dev/react";

const FactoryContractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "contractAddress",
          "type": "address"
        }
      ],
      "name": "NewUser",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user_address",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "nft_attitude_oracle",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "token_attitude_oracle",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "recent_active_trader_type_oracle",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "active_trader_type_oracle",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "whale_type_oracle",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "dealer_oracle",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "higher_risk_appetite_oracle",
          "type": "bytes32"
        }
      ],
      "name": "createCustomUrlsExample",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "deployedContracts",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserCount",
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
          "internalType": "address",
          "name": "",
          "type": "address"
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
  ]

const MyProfile = () => {
    const [loading, setLoading] = React.useState(true);
    const [userAddress, setUserAddress] = React.useState("");
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    const json_mock_data = [
        "nft_attitude_oracle",
        "token_attitude_oracle",
        "recent_active_trader_type_oracle",
        "active_trader_type_oracle",
        "whale_type_oracle",
        "dealer_oracle",
        "higher_risk_appetite_oracle",
        "user_address"
    ]
    // const { data: user } = useGetIdentity({
    //     v3LegacyAuthProviderCompatible: true,
    // });
    // const { data, isLoading, isError } = useOne({
    //     resource: "users",
    //     id: user?.userid,
    // });

    // const myProfile = data?.data ?? [];

    const handleOracleCreations = async (user_id: String, main_path: String) => {
        const nft_attitude_oracle = await createOraclesForUser(user_id, `${main_path}.nft_attitude_oracle`);
        if(nft_attitude_oracle === "OK" || nft_attitude_oracle === "Introduced pair URL with JSONPath already exists"){
            console.log("nft_attitude_oracle created");
        }else{
            return false
        }
        const token_attitude_oracle = await createOraclesForUser(user_id, `${main_path}.token_attitude_oracle`);
        if(token_attitude_oracle === "OK" || token_attitude_oracle === "Introduced pair URL with JSONPath already exists"){
            console.log("token_attitude_oracle created");
        }else{
            return false
        }
        const recent_active_trader_type_oracle = await createOraclesForUser(user_id, `${main_path}.recent_active_trader_type_oracle`);
        if(recent_active_trader_type_oracle === "OK" || recent_active_trader_type_oracle === "Introduced pair URL with JSONPath already exists"){
            console.log("recent_active_trader_type_oracle created");
        }else{
            return false
        }
        const active_trader_type_oracle = await createOraclesForUser(user_id, `${main_path}.active_trader_type_oracle`);
        if(active_trader_type_oracle === "OK" || active_trader_type_oracle === "Introduced pair URL with JSONPath already exists"){
            console.log("active_trader_type_oracle created");
        }else{
            return false
        }
        const whale_type_oracle = await createOraclesForUser(user_id, `${main_path}.whale_type_oracle`);
        if(whale_type_oracle === "OK" || whale_type_oracle === "Introduced pair URL with JSONPath already exists"){
            console.log("whale_type_oracle created");
        }else{
            return false
        }
        const dealer_oracle = await createOraclesForUser(user_id, `${main_path}.dealer_oracle`);
        if(dealer_oracle === "OK" || dealer_oracle === "Introduced pair URL with JSONPath already exists"){
            console.log("dealer_oracle created");
        }else{
            return false
        }
        const higher_risk_appetite_oracle = await createOraclesForUser(user_id, `${main_path}.higher_risk_appetite_oracle`);
        if(higher_risk_appetite_oracle === "OK" || higher_risk_appetite_oracle === "Introduced pair URL with JSONPath already exists"){
            console.log("higher_risk_appetite_oracle created");
        }else{
            return false
        }
        return true;
    }

    // if (isLoading) return <div>loading...</div>;
    // if (isError) return <div>error...</div>;
    const createOraclesForUser = async (user_id: String, path: String): Promise<string> => {
        const url = 'https://custom-urls-manifest-updater.redstone.finance/api/custom-urls';

        const payload = {
            url: `https://eloquent-halva-4fbc86.netlify.app/${user_id}.json`,
            jsonpath: path, // '$.assets.crypto_holdings.tokens[1].value',
            comment: '',
        };

        axios.post(url, payload)
            .then((response) => {
                console.log(response);
                return response.data
            })
            .catch((error) => {
                console.error(error.response);
                return error.response.data
            });
        return '';
    }


    return (
        <Create title={'Please type an address to map its evm user data to Scroll'} footerButtons={
            <Web3Button
            contractAddress="0x84B0626Ec2aF94439c9f4B5f9b75ba26d1975D4c"
            contractAbi={FactoryContractABI}
            action={async (contract) => {
                const CreateOracleSuccess = await handleOracleCreations("test","https://aesthetic-cascaron-c5a0dc.netlify.app/")
                console.log("user address", userAddress)
                console.log('hi')
                if(CreateOracleSuccess){
                    
                }
                const count = await contract.call("getUserCount")
                console.log("user count",Number(count))
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
                    onChange={async (e) => {setUserAddress(e.target.value)}}
                />

            </Box>
        </Create>

    );
};

export default MyProfile;
