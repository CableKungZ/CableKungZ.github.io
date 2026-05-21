export const poolReaderABI = [
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "pools",
				"type": "address[]"
			}
		],
		"name": "getPoolsInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "totalSupply",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reserveCurrency",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reserveToken",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "token",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "currency",
						"type": "address"
					}
				],
				"internalType": "struct CMDAOAmmMultiPoolReader.PoolInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]