const psp22_contract = {
  CONTRACT_ADDRESS: "5FQMr41cYDwMk8g1tpmozBVubvWzYy4Hb2Vt3nGTzj4GpeWU",
  CONTRACT_ABI: {
	  "source": {
		"hash": "0xa1b1ff734772bd12e7b554a3127b074080731caebc08e233cf7d7799ad914613",
		"language": "ink! 3.4.0",
		"compiler": "rustc 1.68.0-nightly"
	  },
	  "contract": {
		"name": "my_psp22",
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
				  "label": "mint_to",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				},
				{
				  "label": "total_supply",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 4
				  }
				},
				{
				  "label": "name",
				  "type": {
					"displayName": [
					  "String"
					],
					"type": 12
				  }
				},
				{
				  "label": "symbol",
				  "type": {
					"displayName": [
					  "String"
					],
					"type": 12
				  }
				},
				{
				  "label": "decimal",
				  "type": {
					"displayName": [
					  "u8"
					],
					"type": 2
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
			  "args": [],
			  "docs": [],
			  "label": "faucet",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 13
			  },
			  "selector": "0x91bd0a53"
			},
			{
			  "args": [
				{
				  "label": "to",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "TransferInput1"
					],
					"type": 0
				  }
				},
				{
				  "label": "value",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "TransferInput2"
					],
					"type": 4
				  }
				},
				{
				  "label": "data",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "TransferInput3"
					],
					"type": 12
				  }
				}
			  ],
			  "docs": [
				" Transfers `value` amount of tokens from the caller's account to account `to`",
				" with additional `data` in unspecified format.",
				"",
				" On success a `Transfer` event is emitted.",
				"",
				" # Errors",
				"",
				" Returns `InsufficientBalance` error if there are not enough tokens on",
				" the caller's account Balance.",
				"",
				" Returns `ZeroSenderAddress` error if sender's address is zero.",
				"",
				" Returns `ZeroRecipientAddress` error if recipient's address is zero."
			  ],
			  "label": "PSP22::transfer",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22_external",
				  "TransferOutput"
				],
				"type": 13
			  },
			  "selector": "0xdb20f9f5"
			},
			{
			  "args": [
				{
				  "label": "spender",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "DecreaseAllowanceInput1"
					],
					"type": 0
				  }
				},
				{
				  "label": "delta_value",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "DecreaseAllowanceInput2"
					],
					"type": 4
				  }
				}
			  ],
			  "docs": [
				" Atomically decreases the allowance granted to `spender` by the caller.",
				"",
				" An `Approval` event is emitted.",
				"",
				" # Errors",
				"",
				" Returns `InsufficientAllowance` error if there are not enough tokens allowed",
				" by owner for `spender`.",
				"",
				" Returns `ZeroSenderAddress` error if sender's address is zero.",
				"",
				" Returns `ZeroRecipientAddress` error if recipient's address is zero."
			  ],
			  "label": "PSP22::decrease_allowance",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22_external",
				  "DecreaseAllowanceOutput"
				],
				"type": 13
			  },
			  "selector": "0xfecb57d5"
			},
			{
			  "args": [
				{
				  "label": "from",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "TransferFromInput1"
					],
					"type": 0
				  }
				},
				{
				  "label": "to",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "TransferFromInput2"
					],
					"type": 0
				  }
				},
				{
				  "label": "value",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "TransferFromInput3"
					],
					"type": 4
				  }
				},
				{
				  "label": "data",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "TransferFromInput4"
					],
					"type": 12
				  }
				}
			  ],
			  "docs": [
				" Transfers `value` tokens on the behalf of `from` to the account `to`",
				" with additional `data` in unspecified format.",
				"",
				" This can be used to allow a contract to transfer tokens on ones behalf and/or",
				" to charge fees in sub-currencies, for example.",
				"",
				" On success a `Transfer` and `Approval` events are emitted.",
				"",
				" # Errors",
				"",
				" Returns `InsufficientAllowance` error if there are not enough tokens allowed",
				" for the caller to withdraw from `from`.",
				"",
				" Returns `InsufficientBalance` error if there are not enough tokens on",
				" the the account Balance of `from`.",
				"",
				" Returns `ZeroSenderAddress` error if sender's address is zero.",
				"",
				" Returns `ZeroRecipientAddress` error if recipient's address is zero."
			  ],
			  "label": "PSP22::transfer_from",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22_external",
				  "TransferFromOutput"
				],
				"type": 13
			  },
			  "selector": "0x54b3c76e"
			},
			{
			  "args": [
				{
				  "label": "spender",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "ApproveInput1"
					],
					"type": 0
				  }
				},
				{
				  "label": "value",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "ApproveInput2"
					],
					"type": 4
				  }
				}
			  ],
			  "docs": [
				" Allows `spender` to withdraw from the caller's account multiple times, up to",
				" the `value` amount.",
				"",
				" If this function is called again it overwrites the current allowance with `value`.",
				"",
				" An `Approval` event is emitted.",
				"",
				" # Errors",
				"",
				" Returns `ZeroSenderAddress` error if sender's address is zero.",
				"",
				" Returns `ZeroRecipientAddress` error if recipient's address is zero."
			  ],
			  "label": "PSP22::approve",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22_external",
				  "ApproveOutput"
				],
				"type": 13
			  },
			  "selector": "0xb20f1bbd"
			},
			{
			  "args": [
				{
				  "label": "owner",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "BalanceOfInput1"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [
				" Returns the account Balance for the specified `owner`.",
				"",
				" Returns `0` if the account is non-existent."
			  ],
			  "label": "PSP22::balance_of",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22_external",
				  "BalanceOfOutput"
				],
				"type": 4
			  },
			  "selector": "0x6568382f"
			},
			{
			  "args": [],
			  "docs": [
				" Returns the total token supply."
			  ],
			  "label": "PSP22::total_supply",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22_external",
				  "TotalSupplyOutput"
				],
				"type": 4
			  },
			  "selector": "0x162df8c2"
			},
			{
			  "args": [
				{
				  "label": "spender",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "IncreaseAllowanceInput1"
					],
					"type": 0
				  }
				},
				{
				  "label": "delta_value",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "IncreaseAllowanceInput2"
					],
					"type": 4
				  }
				}
			  ],
			  "docs": [
				" Atomically increases the allowance granted to `spender` by the caller.",
				"",
				" An `Approval` event is emitted.",
				"",
				" # Errors",
				"",
				" Returns `ZeroSenderAddress` error if sender's address is zero.",
				"",
				" Returns `ZeroRecipientAddress` error if recipient's address is zero."
			  ],
			  "label": "PSP22::increase_allowance",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22_external",
				  "IncreaseAllowanceOutput"
				],
				"type": 13
			  },
			  "selector": "0x96d6b57a"
			},
			{
			  "args": [
				{
				  "label": "owner",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "AllowanceInput1"
					],
					"type": 0
				  }
				},
				{
				  "label": "spender",
				  "type": {
					"displayName": [
					  "psp22_external",
					  "AllowanceInput2"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [
				" Returns the amount which `spender` is still allowed to withdraw from `owner`.",
				"",
				" Returns `0` if no allowance has been set `0`."
			  ],
			  "label": "PSP22::allowance",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22_external",
				  "AllowanceOutput"
				],
				"type": 4
			  },
			  "selector": "0x4d47d921"
			},
			{
			  "args": [],
			  "docs": [
				" Returns the token symbol."
			  ],
			  "label": "PSP22Metadata::token_symbol",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22metadata_external",
				  "TokenSymbolOutput"
				],
				"type": 15
			  },
			  "selector": "0x34205be5"
			},
			{
			  "args": [],
			  "docs": [
				" Returns the token name."
			  ],
			  "label": "PSP22Metadata::token_name",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22metadata_external",
				  "TokenNameOutput"
				],
				"type": 15
			  },
			  "selector": "0x3d261bd4"
			},
			{
			  "args": [],
			  "docs": [
				" Returns the token decimals."
			  ],
			  "label": "PSP22Metadata::token_decimals",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22metadata_external",
				  "TokenDecimalsOutput"
				],
				"type": 2
			  },
			  "selector": "0x7271b782"
			},
			{
			  "args": [
				{
				  "label": "account",
				  "type": {
					"displayName": [
					  "psp22burnable_external",
					  "BurnInput1"
					],
					"type": 0
				  }
				},
				{
				  "label": "amount",
				  "type": {
					"displayName": [
					  "psp22burnable_external",
					  "BurnInput2"
					],
					"type": 4
				  }
				}
			  ],
			  "docs": [],
			  "label": "PSP22Burnable::burn",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "psp22burnable_external",
				  "BurnOutput"
				],
				"type": 13
			  },
			  "selector": "0x7a9da510"
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
				"type": 16
			  },
			  "selector": "0x5e228753"
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
				"type": 16
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
			  "args": [
				{
				  "label": "value",
				  "type": {
					"displayName": [
					  "admintrait_external",
					  "WithdrawFeeInput1"
					],
					"type": 4
				  }
				},
				{
				  "label": "receiver",
				  "type": {
					"displayName": [
					  "admintrait_external",
					  "WithdrawFeeInput2"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [
				" This function allows contract owner to withdraw contract balance to his account."
			  ],
			  "label": "AdminTrait::withdraw_fee",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "admintrait_external",
				  "WithdrawFeeOutput"
				],
				"type": 18
			  },
			  "selector": "0x07573e99"
			},
			{
			  "args": [
				{
				  "label": "psp22_contract_address",
				  "type": {
					"displayName": [
					  "admintrait_external",
					  "TranferPsp22Input1"
					],
					"type": 0
				  }
				},
				{
				  "label": "amount",
				  "type": {
					"displayName": [
					  "admintrait_external",
					  "TranferPsp22Input2"
					],
					"type": 4
				  }
				},
				{
				  "label": "receiver",
				  "type": {
					"displayName": [
					  "admintrait_external",
					  "TranferPsp22Input3"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [
				" This function allow contract owner withdraw PSP22 to an account in case there is any token sent to contract by mistake"
			  ],
			  "label": "AdminTrait::tranfer_psp22",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "admintrait_external",
				  "TranferPsp22Output"
				],
				"type": 18
			  },
			  "selector": "0xd9aad284"
			},
			{
			  "args": [
				{
				  "label": "nft_contract_address",
				  "type": {
					"displayName": [
					  "admintrait_external",
					  "TranferNftInput1"
					],
					"type": 0
				  }
				},
				{
				  "label": "token_id",
				  "type": {
					"displayName": [
					  "admintrait_external",
					  "TranferNftInput2"
					],
					"type": 21
				  }
				},
				{
				  "label": "receiver",
				  "type": {
					"displayName": [
					  "admintrait_external",
					  "TranferNftInput3"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [
				" This function allow contract owner withdraw NFT to an account in case there is any NFT sent to contract by mistake"
			  ],
			  "label": "AdminTrait::tranfer_nft",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "admintrait_external",
				  "TranferNftOutput"
				],
				"type": 18
			  },
			  "selector": "0xed1e1dfa"
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
				  "struct": {
					"fields": [
					  {
						"layout": {
						  "cell": {
							"key": "0xf232311200000000000000000000000000000000000000000000000000000000",
							"ty": 4
						  }
						},
						"name": "supply"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0xf332311200000000000000000000000000000000000000000000000000000000",
							"ty": 5
						  }
						},
						"name": "balances"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0xf432311200000000000000000000000000000000000000000000000000000000",
							"ty": 8
						  }
						},
						"name": "allowances"
					  },
					  {
						"layout": {
						  "enum": {
							"dispatchKey": "0xf532311200000000000000000000000000000000000000000000000000000000",
							"variants": {
							  "0": {
								"fields": [
								  {
									"layout": {
									  "cell": {
										"key": "0xf632311200000000000000000000000000000000000000000000000000000000",
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
				"name": "psp22"
			  },
			  {
				"layout": {
				  "struct": {
					"fields": [
					  {
						"layout": {
						  "enum": {
							"dispatchKey": "0x89ae8e4b00000000000000000000000000000000000000000000000000000000",
							"variants": {
							  "0": {
								"fields": [
								  {
									"layout": {
									  "cell": {
										"key": "0x8aae8e4b00000000000000000000000000000000000000000000000000000000",
										"ty": 12
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
						"name": "name"
					  },
					  {
						"layout": {
						  "enum": {
							"dispatchKey": "0x8aae8e4b00000000000000000000000000000000000000000000000000000000",
							"variants": {
							  "0": {
								"fields": [
								  {
									"layout": {
									  "cell": {
										"key": "0x8bae8e4b00000000000000000000000000000000000000000000000000000000",
										"ty": 12
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
						"name": "symbol"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x8bae8e4b00000000000000000000000000000000000000000000000000000000",
							"ty": 2
						  }
						},
						"name": "decimals"
					  },
					  {
						"layout": {
						  "enum": {
							"dispatchKey": "0x8cae8e4b00000000000000000000000000000000000000000000000000000000",
							"variants": {
							  "0": {
								"fields": [
								  {
									"layout": {
									  "cell": {
										"key": "0x8dae8e4b00000000000000000000000000000000000000000000000000000000",
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
				"name": "metadata"
			  },
			  {
				"layout": {
				  "struct": {
					"fields": [
					  {
						"layout": {
						  "enum": {
							"dispatchKey": "0xd343691000000000000000000000000000000000000000000000000000000000",
							"variants": {
							  "0": {
								"fields": [
								  {
									"layout": {
									  "cell": {
										"key": "0xd443691000000000000000000000000000000000000000000000000000000000",
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
				"name": "admin_data"
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
					  "type": 6
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
				  "type": 4
				}
			  ],
			  "path": [
				"openbrush_lang",
				"storage",
				"mapping",
				"Mapping"
			  ]
			}
		  },
		  {
			"id": 6,
			"type": {
			  "def": {
				"sequence": {
				  "type": 7
				}
			  }
			}
		  },
		  {
			"id": 7,
			"type": {
			  "def": {
				"tuple": [
				  0,
				  4
				]
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
					  "type": 10
					}
				  ]
				}
			  },
			  "params": [
				{
				  "name": "K",
				  "type": 9
				},
				{
				  "name": "V",
				  "type": 4
				}
			  ],
			  "path": [
				"openbrush_lang",
				"storage",
				"mapping",
				"Mapping"
			  ]
			}
		  },
		  {
			"id": 9,
			"type": {
			  "def": {
				"tuple": [
				  0,
				  0
				]
			  }
			}
		  },
		  {
			"id": 10,
			"type": {
			  "def": {
				"sequence": {
				  "type": 11
				}
			  }
			}
		  },
		  {
			"id": 11,
			"type": {
			  "def": {
				"tuple": [
				  9,
				  4
				]
			  }
			}
		  },
		  {
			"id": 12,
			"type": {
			  "def": {
				"sequence": {
				  "type": 2
				}
			  }
			}
		  },
		  {
			"id": 13,
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
						  "type": 14
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
				  "type": 14
				}
			  ],
			  "path": [
				"Result"
			  ]
			}
		  },
		  {
			"id": 14,
			"type": {
			  "def": {
				"variant": {
				  "variants": [
					{
					  "fields": [
						{
						  "type": 12,
						  "typeName": "String"
						}
					  ],
					  "index": 0,
					  "name": "Custom"
					},
					{
					  "index": 1,
					  "name": "InsufficientBalance"
					},
					{
					  "index": 2,
					  "name": "InsufficientAllowance"
					},
					{
					  "index": 3,
					  "name": "ZeroRecipientAddress"
					},
					{
					  "index": 4,
					  "name": "ZeroSenderAddress"
					},
					{
					  "fields": [
						{
						  "type": 12,
						  "typeName": "String"
						}
					  ],
					  "index": 5,
					  "name": "SafeTransferCheckFailed"
					}
				  ]
				}
			  },
			  "path": [
				"openbrush_contracts",
				"traits",
				"errors",
				"psp22",
				"PSP22Error"
			  ]
			}
		  },
		  {
			"id": 15,
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
						  "type": 12
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
				  "type": 12
				}
			  ],
			  "path": [
				"Option"
			  ]
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
		  },
		  {
			"id": 18,
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
						  "type": 19
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
				  "type": 19
				}
			  ],
			  "path": [
				"Result"
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
					  "fields": [
						{
						  "type": 12,
						  "typeName": "String"
						}
					  ],
					  "index": 0,
					  "name": "Custom"
					},
					{
					  "fields": [
						{
						  "type": 14,
						  "typeName": "PSP22Error"
						}
					  ],
					  "index": 1,
					  "name": "PSP22Error"
					},
					{
					  "fields": [
						{
						  "type": 20,
						  "typeName": "PSP34Error"
						}
					  ],
					  "index": 2,
					  "name": "PSP34Error"
					},
					{
					  "fields": [
						{
						  "type": 17,
						  "typeName": "OwnableError"
						}
					  ],
					  "index": 3,
					  "name": "OwnableError"
					},
					{
					  "index": 4,
					  "name": "CannotTransfer"
					},
					{
					  "index": 5,
					  "name": "NotEnoughBalance"
					},
					{
					  "index": 6,
					  "name": "WithdrawFeeError"
					},
					{
					  "index": 7,
					  "name": "WithdrawNFTError"
					},
					{
					  "index": 8,
					  "name": "WithdrawPSP22Error"
					}
				  ]
				}
			  },
			  "path": [
				"inkwhale_project",
				"traits",
				"error",
				"Error"
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
						  "type": 12,
						  "typeName": "String"
						}
					  ],
					  "index": 0,
					  "name": "Custom"
					},
					{
					  "index": 1,
					  "name": "SelfApprove"
					},
					{
					  "index": 2,
					  "name": "NotApproved"
					},
					{
					  "index": 3,
					  "name": "TokenExists"
					},
					{
					  "index": 4,
					  "name": "TokenNotExists"
					},
					{
					  "fields": [
						{
						  "type": 12,
						  "typeName": "String"
						}
					  ],
					  "index": 5,
					  "name": "SafeTransferCheckFailed"
					}
				  ]
				}
			  },
			  "path": [
				"openbrush_contracts",
				"traits",
				"errors",
				"psp34",
				"PSP34Error"
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
						  "type": 22,
						  "typeName": "u16"
						}
					  ],
					  "index": 1,
					  "name": "U16"
					},
					{
					  "fields": [
						{
						  "type": 23,
						  "typeName": "u32"
						}
					  ],
					  "index": 2,
					  "name": "U32"
					},
					{
					  "fields": [
						{
						  "type": 24,
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
						  "type": 12,
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
			"id": 22,
			"type": {
			  "def": {
				"primitive": "u16"
			  }
			}
		  },
		  {
			"id": 23,
			"type": {
			  "def": {
				"primitive": "u32"
			  }
			}
		  },
		  {
			"id": 24,
			"type": {
			  "def": {
				"primitive": "u64"
			  }
			}
		  }
		]
	  }
	}
};

export default psp22_contract;