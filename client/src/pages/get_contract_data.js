
const { ethers } = require('ethers');
// const {dotenv} = require('dotenv');

const { WrapperBuilder } = require("@redstone-finance/evm-connector");



// 定义一个async函数来调用合约
const callContract = async (inputContract, dataFeedsArray) => {

    // 定义provider对象，连接到以太坊网络
    const provider = new ethers.providers.JsonRpcProvider('https://alpha-rpc.scroll.io/l2');
    // 定义合约ABI和地址
    //   const { artifacts } = require("hardhat");


    const contractABI = [
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
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "CalldataMustHaveValidPayload",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "CalldataOverOrUnderFlow",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "CanNotPickMedianOfEmptyArray",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "EachSignerMustProvideTheSameValue",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "EmptyCalldataPointersArr",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "IncorrectUnsignedMetadataSize",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "receivedSignersCount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "requiredSignersCount",
                    "type": "uint256"
                }
            ],
            "name": "InsufficientNumberOfUniqueSigners",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidCalldataPointer",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receivedSigner",
                    "type": "address"
                }
            ],
            "name": "SignerNotAuthorised",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "receivedTimestampSeconds",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "blockTimestamp",
                    "type": "uint256"
                }
            ],
            "name": "TimestampFromTooLongFuture",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "receivedTimestampSeconds",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "blockTimestamp",
                    "type": "uint256"
                }
            ],
            "name": "TimestampIsTooOld",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "_user_address",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                }
            ],
            "name": "aggregateValues",
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
                    "name": "signerAddress",
                    "type": "address"
                }
            ],
            "name": "getAuthorisedSignerIndex",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUniqueSignersThreshold",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get_active_trader_type_oracle_value",
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
            "name": "get_dealer_oracle_value",
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
            "name": "get_higher_risk_appetite_oracle_value",
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
            "name": "get_nft_attitude_oracle_value",
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
            "name": "get_recent_active_trader_type_oracle_value",
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
            "name": "get_token_attitude_oracle_value",
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
            "name": "get_whale_type_oracle_value",
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
                    "name": "source",
                    "type": "string"
                }
            ],
            "name": "stringToBytes32",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "result",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "receivedTimestampMilliseconds",
                    "type": "uint256"
                }
            ],
            "name": "validateTimestamp",
            "outputs": [],
            "stateMutability": "view",
            "type": "function"
        }
    ];


    const contractAddress = inputContract;

    // console.log(provider.getSigner('0xdBcC2C6c892C8d3e3Fe4D325fEc810B7376A5Ed6')._isSigner)
    // 创建合约实例
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // 连接到以太坊钱包
    //   await window.ethereum.enable();
    let wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataServiceId: "redstone-custom-urls-demo",
        uniqueSignersCount: 2,
        dataFeeds: [dataFeedsArray.nft_attitude_oracle],
    }, ["https://d1zm8lxy9v2ddd.cloudfront.net"]);
    // 调用合约函数

    let nft_attitude_oracle_value;

    try {
        nft_attitude_oracle_value = await wrappedContract.get_nft_attitude_oracle_value();
        nft_attitude_oracle_value = nft_attitude_oracle_value.toNumber()
    } catch (error) {
        nft_attitude_oracle_value = 0;
    }

    wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataServiceId: "redstone-custom-urls-demo",
        uniqueSignersCount: 2,
        dataFeeds: [dataFeedsArray.token_attitude_oracle],
    }, ["https://d1zm8lxy9v2ddd.cloudfront.net"]);

    let token_attitude_oracle_value;

    try {
        token_attitude_oracle_value = await wrappedContract.get_token_attitude_oracle_value();
        token_attitude_oracle_value = token_attitude_oracle_value.toNumber()
    } catch (error) {
        token_attitude_oracle_value = 0;
    }

    wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataServiceId: "redstone-custom-urls-demo",
        uniqueSignersCount: 2,
        dataFeeds: [dataFeedsArray.recent_active_trader_type_oracle],
    }, ["https://d1zm8lxy9v2ddd.cloudfront.net"]);


    let recent_active_trader_type_oracle_value;

    try {
        recent_active_trader_type_oracle_value = await wrappedContract.get_recent_active_trader_type_oracle_value();
        recent_active_trader_type_oracle_value = recent_active_trader_type_oracle_value.toNumber()
    } catch (error) {
        recent_active_trader_type_oracle_value = 0;
    }

    wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataServiceId: "redstone-custom-urls-demo",
        uniqueSignersCount: 2,
        dataFeeds: [dataFeedsArray.active_trader_type_oracle],
    }, ["https://d1zm8lxy9v2ddd.cloudfront.net"]);

    let active_trader_type_oracle_value;

    try {
        active_trader_type_oracle_value = await wrappedContract.get_active_trader_type_oracle_value();
        active_trader_type_oracle_value = active_trader_type_oracle_value.toNumber()
    } catch (error) {
        active_trader_type_oracle_value = 0;
    }

    wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataServiceId: "redstone-custom-urls-demo",
        uniqueSignersCount: 2,
        dataFeeds: [dataFeedsArray.whale_type_oracle],
    }, ["https://d1zm8lxy9v2ddd.cloudfront.net"]);

    let whale_type_oracle_value;

    try {
        whale_type_oracle_value = await wrappedContract.get_whale_type_oracle_value();
        whale_type_oracle_value = whale_type_oracle_value.toNumber()
    } catch (error) {
        whale_type_oracle_value = 0;
    }

    wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataServiceId: "redstone-custom-urls-demo",
        uniqueSignersCount: 2,
        dataFeeds: [dataFeedsArray.dealer_oracle],
    }, ["https://d1zm8lxy9v2ddd.cloudfront.net"]);

    let dealer_oracle_value;

    try {
        dealer_oracle_value = await wrappedContract.get_dealer_oracle_value();
        dealer_oracle_value = dealer_oracle_value.toNumber()
    } catch (error) {
        dealer_oracle_value = 0;
    }


    wrappedContract = WrapperBuilder.wrap(contract).usingDataService({
        dataServiceId: "redstone-custom-urls-demo",
        uniqueSignersCount: 2,
        dataFeeds: [dataFeedsArray.higher_risk_appetite_oracle],
    }, ["https://d1zm8lxy9v2ddd.cloudfront.net"]);

    let higher_risk_appetite_oracle_value;

    try {
        higher_risk_appetite_oracle_value = await wrappedContract.get_higher_risk_appetite_oracle_value();
        higher_risk_appetite_oracle_value = higher_risk_appetite_oracle_value.toNumber()
    } catch (error) {
        higher_risk_appetite_oracle_value = 0;
    }
    // console.log(valueFromOracle)
    // console.log({ valueFromOracle: valueFromOracle / 100000000 });

    const rows = [{ name: "nft_attitude_oracle_value", category: nft_attitude_oracle_value / 100000000, explaination: `NFT Attitude of the User, \n1:postive, \n0:negative`, oracleId: dataFeedsArray.nft_attitude_oracle },
    { name: "token_attitude_oracle_value", category: token_attitude_oracle_value / 100000000, explaination: "Token Attitude of the User, 1:postive, 0:negative", oracleId: dataFeedsArray.token_attitude_oracle },
    { name: "recent_active_trader_type_oracle_value", category: recent_active_trader_type_oracle_value / 100000000, explaination: "Recent Active Trader Type of the User, recent: 0:Not an active trader, 1: Active Token Trader, 2: Active NFT trader, 3: Active All Trader", oracleId: dataFeedsArray.recent_active_trader_type_oracle },
    { name: "active_trader_type_oracle_value", category: active_trader_type_oracle_value / 100000000, explaination: "Active Trader Type of the User, in total: 0:Not an active trader, 1: Active Token Trader, 2: Active NFT trader, 3: Both Active Trader", oracleId: dataFeedsArray.active_trader_type_oracle },
    { name: "whale_type_oracle_value", category: whale_type_oracle_value / 100000000, explaination: "Whale Type of the User, 0:Not a whale, 1:Token Whale, 2:NFT whale, 3:Both Whale", oracleId: dataFeedsArray.whale_type_oracle },
    { name: "dealer_oracle_value", category: dealer_oracle_value / 100000000, explaination: "Dealer Oracle Value, 0:Not a dealer on a Token, 1:a dealer at least on one Token", oracleId: dataFeedsArray.dealer_oracle },
    { name: "higher_risk_appetite_oracle_value", category: higher_risk_appetite_oracle_value / 100000000, explaination: "Higher Risk Appetite of the User, 0:Low-risk preference users, 1:High-risk preference users", oracleId: dataFeedsArray.higher_risk_appetite_oracle }
    ]
    console.log(rows)
    return rows
}

export default callContract

