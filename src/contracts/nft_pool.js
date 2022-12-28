const nft_pool_contract = {
  CONTRACT_ADDRESS: "5Chve18v56hufx7vPM7SSpPJrHPpAKFpg4k7sbM1K9tfJRrY",
  CONTRACT_ABI: {
	  "source": {
		"hash": "0xe12325d2bd29efbb61231daf530d60139d3982cc9a4bfc88853913370b49a740",
		"language": "ink! 3.4.0",
		"compiler": "rustc 1.68.0-nightly"
	  },
	  "contract": {
		"name": "my_nft_pool",
		"version": "2.3.0",
		"authors": [
		  "Support <contact@artzero.io>"
		]
	  },
	  "V3": {
		"spec": {
		  "constructors": [
			{
			  "args": [
				{
				  "label": "contract_owner",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				},
				{
				  "label": "wal_contract",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				},
				{
				  "label": "psp34_contract_address",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				},
				{
				  "label": "psp22_contract_address",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				},
				{
				  "label": "multiplier",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 4
				  }
				},
				{
				  "label": "duration",
				  "type": {
					"displayName": [
					  "u64"
					],
					"type": 7
				  }
				},
				{
				  "label": "start_time",
				  "type": {
					"displayName": [
					  "u64"
					],
					"type": 7
				  }
				},
				{
				  "label": "unstake_fee",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 4
				  }
				}
			  ],
			  "docs": [],
			  "label": "new",
			  "payable": false,
			  "selector": "0x9bae9d5e"
			}
		  ],
		  "docs": [],
		  "events": [],
		  "messages": [
			{
			  "args": [
				{
				  "label": "amount",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 4
				  }
				}
			  ],
			  "docs": [],
			  "label": "topup_reward_pool",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 16
			  },
			  "selector": "0xc62a07a3"
			},
			{
			  "args": [
				{
				  "label": "token_id",
				  "type": {
					"displayName": [
					  "Id"
					],
					"type": 10
				  }
				}
			  ],
			  "docs": [],
			  "label": "stake",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 16
			  },
			  "selector": "0x5adb38de"
			},
			{
			  "args": [
				{
				  "label": "token_id",
				  "type": {
					"displayName": [
					  "Id"
					],
					"type": 10
				  }
				}
			  ],
			  "docs": [],
			  "label": "unstake",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 16
			  },
			  "selector": "0x82364901"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "claim_reward",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 16
			  },
			  "selector": "0x9a8353a7"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "multiplier",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Balance"
				],
				"type": 4
			  },
			  "selector": "0x750cd387"
			},
			{
			  "args": [
				{
				  "label": "account",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [],
			  "label": "get_total_staked_by_account",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "u64"
				],
				"type": 7
			  },
			  "selector": "0x84726e23"
			},
			{
			  "args": [
				{
				  "label": "account",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				},
				{
				  "label": "index",
				  "type": {
					"displayName": [
					  "u64"
					],
					"type": 7
				  }
				}
			  ],
			  "docs": [],
			  "label": "get_staked_id",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Option"
				],
				"type": 18
			  },
			  "selector": "0xd5ee8ef6"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "duration",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "u64"
				],
				"type": 7
			  },
			  "selector": "0x0a985246"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "start_time",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "u64"
				],
				"type": 7
			  },
			  "selector": "0x624d1009"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "reward_pool",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Balance"
				],
				"type": 4
			  },
			  "selector": "0x644b2fa9"
			},
			{
			  "args": [
				{
				  "label": "amount",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 4
				  }
				}
			  ],
			  "docs": [],
			  "label": "withdraw_reward_pool",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 16
			  },
			  "selector": "0x3fc58289"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "total_staked",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "u64"
				],
				"type": 7
			  },
			  "selector": "0x36d67128"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "psp22_contract_address",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "AccountId"
				],
				"type": 0
			  },
			  "selector": "0xea1023d6"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "unstake_fee",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Balance"
				],
				"type": 4
			  },
			  "selector": "0x6e4ec9b8"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "wal_contract",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "AccountId"
				],
				"type": 0
			  },
			  "selector": "0x2b2e98f0"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "psp34_contract_address",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "AccountId"
				],
				"type": 0
			  },
			  "selector": "0x82c1595f"
			},
			{
			  "args": [
				{
				  "label": "staker",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [],
			  "label": "get_stake_info",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Option"
				],
				"type": 19
			  },
			  "selector": "0x19617e8c"
			},
			{
			  "args": [
				{
				  "label": "new_owner",
				  "type": {
					"displayName": [
					  "ownable_external",
					  "TransferOwnershipInput1"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [
				" Transfers ownership of the contract to a `new_owner`.",
				" Can only be called by the current owner.",
				"",
				" On success a `OwnershipTransferred` event is emitted.",
				"",
				" # Errors",
				"",
				" Panics with `CallerIsNotOwner` error if caller is not owner.",
				"",
				" Panics with `NewOwnerIsZero` error if new owner's address is zero."
			  ],
			  "label": "Ownable::transfer_ownership",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "ownable_external",
				  "TransferOwnershipOutput"
				],
				"type": 20
			  },
			  "selector": "0x11f43efd"
			},
			{
			  "args": [],
			  "docs": [
				" Returns the address of the current owner."
			  ],
			  "label": "Ownable::owner",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "ownable_external",
				  "OwnerOutput"
				],
				"type": 0
			  },
			  "selector": "0x4fa43c8c"
			},
			{
			  "args": [],
			  "docs": [
				" Leaves the contract without owner. It will not be possible to call",
				" owner's functions anymore. Can only be called by the current owner.",
				"",
				" NOTE: Renouncing ownership will leave the contract without an owner,",
				" thereby removing any functionality that is only available to the owner.",
				"",
				" On success a `OwnershipTransferred` event is emitted.",
				"",
				" # Errors",
				"",
				" Panics with `CallerIsNotOwner` error if caller is not owner"
			  ],
			  "label": "Ownable::renounce_ownership",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "ownable_external",
				  "RenounceOwnershipOutput"
				],
				"type": 20
			  },
			  "selector": "0x5e228753"
			}
		  ]
		},
		"storage": {
		  "struct": {
			"fields": [
			  {
				"layout": {
				  "struct": {
					"fields": [
					  {
						"layout": {
						  "cell": {
							"key": "0xb36ee29c00000000000000000000000000000000000000000000000000000000",
							"ty": 0
						  }
						},
						"name": "owner"
					  },
					  {
						"layout": {
						  "enum": {
							"dispatchKey": "0xb46ee29c00000000000000000000000000000000000000000000000000000000",
							"variants": {
							  "0": {
								"fields": [
								  {
									"layout": {
									  "cell": {
										"key": "0xb56ee29c00000000000000000000000000000000000000000000000000000000",
										"ty": 3
									  }
									},
									"name": null
								  }
								]
							  },
							  "1": {
								"fields": []
							  }
							}
						  }
						},
						"name": "_reserved"
					  }
					]
				  }
				},
				"name": "ownable"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0000000000000000000000000000000000000000000000000000000000000000",
					"ty": 0
				  }
				},
				"name": "psp34_contract_address"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0100000000000000000000000000000000000000000000000000000000000000",
					"ty": 0
				  }
				},
				"name": "psp22_contract_address"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0200000000000000000000000000000000000000000000000000000000000000",
					"ty": 0
				  }
				},
				"name": "wal_contract"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0300000000000000000000000000000000000000000000000000000000000000",
					"ty": 4
				  }
				},
				"name": "multiplier"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0400000000000000000000000000000000000000000000000000000000000000",
					"ty": 5
				  }
				},
				"name": "stakers"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0500000000000000000000000000000000000000000000000000000000000000",
					"ty": 9
				  }
				},
				"name": "staking_list"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0600000000000000000000000000000000000000000000000000000000000000",
					"ty": 4
				  }
				},
				"name": "reward_pool"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0700000000000000000000000000000000000000000000000000000000000000",
					"ty": 7
				  }
				},
				"name": "total_staked"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0800000000000000000000000000000000000000000000000000000000000000",
					"ty": 7
				  }
				},
				"name": "duration"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0900000000000000000000000000000000000000000000000000000000000000",
					"ty": 7
				  }
				},
				"name": "start_time"
			  },
			  {
				"layout": {
				  "cell": {
					"key": "0x0a00000000000000000000000000000000000000000000000000000000000000",
					"ty": 4
				  }
				},
				"name": "unstake_fee"
			  }
			]
		  }
		},
		"types": [
		  {
			"id": 0,
			"type": {
			  "def": {
				"composite": {
				  "fields": [
					{
					  "type": 1,
					  "typeName": "[u8; 32]"
					}
				  ]
				}
			  },
			  "path": [
				"ink_env",
				"types",
				"AccountId"
			  ]
			}
		  },
		  {
			"id": 1,
			"type": {
			  "def": {
				"array": {
				  "len": 32,
				  "type": 2
				}
			  }
			}
		  },
		  {
			"id": 2,
			"type": {
			  "def": {
				"primitive": "u8"
			  }
			}
		  },
		  {
			"id": 3,
			"type": {
			  "def": {
				"tuple": []
			  }
			}
		  },
		  {
			"id": 4,
			"type": {
			  "def": {
				"primitive": "u128"
			  }
			}
		  },
		  {
			"id": 5,
			"type": {
			  "def": {
				"composite": {
				  "fields": [
					{
					  "name": "offset_key",
					  "type": 8,
					  "typeName": "Key"
					}
				  ]
				}
			  },
			  "params": [
				{
				  "name": "K",
				  "type": 0
				},
				{
				  "name": "V",
				  "type": 6
				}
			  ],
			  "path": [
				"ink_storage",
				"lazy",
				"mapping",
				"Mapping"
			  ]
			}
		  },
		  {
			"id": 6,
			"type": {
			  "def": {
				"composite": {
				  "fields": [
					{
					  "name": "last_reward_update",
					  "type": 7,
					  "typeName": "u64"
					},
					{
					  "name": "staked_value",
					  "type": 7,
					  "typeName": "u64"
					},
					{
					  "name": "unclaimed_reward",
					  "type": 4,
					  "typeName": "Balance"
					}
				  ]
				}
			  },
			  "path": [
				"my_nft_pool",
				"my_nft_pool",
				"StakeInformation"
			  ]
			}
		  },
		  {
			"id": 7,
			"type": {
			  "def": {
				"primitive": "u64"
			  }
			}
		  },
		  {
			"id": 8,
			"type": {
			  "def": {
				"composite": {
				  "fields": [
					{
					  "type": 1,
					  "typeName": "[u8; 32]"
					}
				  ]
				}
			  },
			  "path": [
				"ink_primitives",
				"Key"
			  ]
			}
		  },
		  {
			"id": 9,
			"type": {
			  "def": {
				"composite": {
				  "fields": [
					{
					  "type": 14
					}
				  ]
				}
			  },
			  "params": [
				{
				  "name": "K",
				  "type": 0
				},
				{
				  "name": "V",
				  "type": 10
				}
			  ],
			  "path": [
				"openbrush_lang",
				"storage",
				"multi_mapping",
				"MultiMapping"
			  ]
			}
		  },
		  {
			"id": 10,
			"type": {
			  "def": {
				"variant": {
				  "variants": [
					{
					  "fields": [
						{
						  "type": 2,
						  "typeName": "u8"
						}
					  ],
					  "index": 0,
					  "name": "U8"
					},
					{
					  "fields": [
						{
						  "type": 11,
						  "typeName": "u16"
						}
					  ],
					  "index": 1,
					  "name": "U16"
					},
					{
					  "fields": [
						{
						  "type": 12,
						  "typeName": "u32"
						}
					  ],
					  "index": 2,
					  "name": "U32"
					},
					{
					  "fields": [
						{
						  "type": 7,
						  "typeName": "u64"
						}
					  ],
					  "index": 3,
					  "name": "U64"
					},
					{
					  "fields": [
						{
						  "type": 4,
						  "typeName": "u128"
						}
					  ],
					  "index": 4,
					  "name": "U128"
					},
					{
					  "fields": [
						{
						  "type": 13,
						  "typeName": "Vec<u8>"
						}
					  ],
					  "index": 5,
					  "name": "Bytes"
					}
				  ]
				}
			  },
			  "path": [
				"openbrush_contracts",
				"traits",
				"types",
				"Id"
			  ]
			}
		  },
		  {
			"id": 11,
			"type": {
			  "def": {
				"primitive": "u16"
			  }
			}
		  },
		  {
			"id": 12,
			"type": {
			  "def": {
				"primitive": "u32"
			  }
			}
		  },
		  {
			"id": 13,
			"type": {
			  "def": {
				"sequence": {
				  "type": 2
				}
			  }
			}
		  },
		  {
			"id": 14,
			"type": {
			  "def": {
				"sequence": {
				  "type": 15
				}
			  }
			}
		  },
		  {
			"id": 15,
			"type": {
			  "def": {
				"tuple": [
				  0,
				  10
				]
			  }
			}
		  },
		  {
			"id": 16,
			"type": {
			  "def": {
				"variant": {
				  "variants": [
					{
					  "fields": [
						{
						  "type": 3
						}
					  ],
					  "index": 0,
					  "name": "Ok"
					},
					{
					  "fields": [
						{
						  "type": 17
						}
					  ],
					  "index": 1,
					  "name": "Err"
					}
				  ]
				}
			  },
			  "params": [
				{
				  "name": "T",
				  "type": 3
				},
				{
				  "name": "E",
				  "type": 17
				}
			  ],
			  "path": [
				"Result"
			  ]
			}
		  },
		  {
			"id": 17,
			"type": {
			  "def": {
				"variant": {
				  "variants": [
					{
					  "fields": [
						{
						  "type": 13,
						  "typeName": "String"
						}
					  ],
					  "index": 0,
					  "name": "Custom"
					},
					{
					  "index": 1,
					  "name": "CannotTransfer"
					}
				  ]
				}
			  },
			  "path": [
				"my_nft_pool",
				"my_nft_pool",
				"Error"
			  ]
			}
		  },
		  {
			"id": 18,
			"type": {
			  "def": {
				"variant": {
				  "variants": [
					{
					  "index": 0,
					  "name": "None"
					},
					{
					  "fields": [
						{
						  "type": 10
						}
					  ],
					  "index": 1,
					  "name": "Some"
					}
				  ]
				}
			  },
			  "params": [
				{
				  "name": "T",
				  "type": 10
				}
			  ],
			  "path": [
				"Option"
			  ]
			}
		  },
		  {
			"id": 19,
			"type": {
			  "def": {
				"variant": {
				  "variants": [
					{
					  "index": 0,
					  "name": "None"
					},
					{
					  "fields": [
						{
						  "type": 6
						}
					  ],
					  "index": 1,
					  "name": "Some"
					}
				  ]
				}
			  },
			  "params": [
				{
				  "name": "T",
				  "type": 6
				}
			  ],
			  "path": [
				"Option"
			  ]
			}
		  },
		  {
			"id": 20,
			"type": {
			  "def": {
				"variant": {
				  "variants": [
					{
					  "fields": [
						{
						  "type": 3
						}
					  ],
					  "index": 0,
					  "name": "Ok"
					},
					{
					  "fields": [
						{
						  "type": 21
						}
					  ],
					  "index": 1,
					  "name": "Err"
					}
				  ]
				}
			  },
			  "params": [
				{
				  "name": "T",
				  "type": 3
				},
				{
				  "name": "E",
				  "type": 21
				}
			  ],
			  "path": [
				"Result"
			  ]
			}
		  },
		  {
			"id": 21,
			"type": {
			  "def": {
				"variant": {
				  "variants": [
					{
					  "index": 0,
					  "name": "CallerIsNotOwner"
					},
					{
					  "index": 1,
					  "name": "NewOwnerIsZero"
					}
				  ]
				}
			  },
			  "path": [
				"openbrush_contracts",
				"traits",
				"errors",
				"ownable",
				"OwnableError"
			  ]
			}
		  }
		]
	  }
	}
};

export default nft_pool_contract;