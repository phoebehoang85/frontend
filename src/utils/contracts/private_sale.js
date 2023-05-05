const private_sale_contract = {
  CONTRACT_ADDRESS: "5EPxiersMTi47NLLwq6R5tQPAM1M7dJ8TSVRG4gcAZFgNmWq",
  CONTRACT_ABI: {
	  "source": {
		"hash": "0xad507a21197d4f811ceeca328c03da7dcd07082360d2ead1ec2e7ed82094cfe1",
		"language": "ink! 4.2.0",
		"compiler": "rustc 1.70.0-nightly",
		"build_info": {
		  "build_mode": "Release",
		  "cargo_contract_version": "2.0.2",
		  "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
		  "wasm_opt_settings": {
			"keep_debug_symbols": false,
			"optimization_passes": "Z"
		  }
		}
	  },
	  "contract": {
		"name": "private_sale",
		"version": "1.0.0",
		"authors": [
		  "InkWhale <admin@artzero.io>"
		]
	  },
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
				"label": "start_time",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "end_time",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "total_amount",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 5
				}
			  },
			  {
				"label": "inw_contract",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "inw_price",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 5
				}
			  },
			  {
				"label": "immediate_buying_rate",
				"type": {
				  "displayName": [
					"u32"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "vesting_duration",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 4
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "new",
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink_primitives",
				"ConstructorResult"
			  ],
			  "type": 8
			},
			"selector": "0x9bae9d5e"
		  }
		],
		"docs": [],
		"environment": {
		  "accountId": {
			"displayName": [
			  "AccountId"
			],
			"type": 0
		  },
		  "balance": {
			"displayName": [
			  "Balance"
			],
			"type": 5
		  },
		  "blockNumber": {
			"displayName": [
			  "BlockNumber"
			],
			"type": 6
		  },
		  "chainExtension": {
			"displayName": [
			  "ChainExtension"
			],
			"type": 29
		  },
		  "hash": {
			"displayName": [
			  "Hash"
			],
			"type": 28
		  },
		  "maxEventTopics": 4,
		  "timestamp": {
			"displayName": [
			  "Timestamp"
			],
			"type": 4
		  }
		},
		"events": [
		  {
			"args": [
			  {
				"docs": [],
				"indexed": false,
				"label": "buyer",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "amount",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 5
				}
			  }
			],
			"docs": [],
			"label": "PrivatePurchaseEvent"
		  },
		  {
			"args": [
			  {
				"docs": [],
				"indexed": false,
				"label": "buyer",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"docs": [],
				"indexed": false,
				"label": "amount",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 5
				}
			  }
			],
			"docs": [],
			"label": "PrivateClaimEvent"
		  }
		],
		"lang_error": {
		  "displayName": [
			"ink",
			"LangError"
		  ],
		  "type": 15
		},
		"messages": [
		  {
			"args": [
			  {
				"label": "start_time",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "end_time",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "total_amount",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 5
				}
			  },
			  {
				"label": "inw_contract",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "inw_price",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 5
				}
			  },
			  {
				"label": "immediate_buying_rate",
				"type": {
				  "displayName": [
					"u32"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "vesting_duration",
				"type": {
				  "displayName": [
					"u64"
				  ],
				  "type": 4
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "initialize",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0xf2f6dba3"
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
			"default": false,
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
				"ink",
				"MessageResult"
			  ],
			  "type": 16
			},
			"selector": "0x11f43efd"
		  },
		  {
			"args": [],
			"default": false,
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
				"ink",
				"MessageResult"
			  ],
			  "type": 16
			},
			"selector": "0x5e228753"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [
			  " Returns the address of the current owner."
			],
			"label": "Ownable::owner",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 18
			},
			"selector": "0x4fa43c8c"
		  },
		  {
			"args": [
			  {
				"label": "amount",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"TopupInput1"
				  ],
				  "type": 5
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::topup",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x8afc6b74"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::burn",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x16895379"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::get_unclaimed_amount",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 19
			},
			"selector": "0x0cd12283"
		  },
		  {
			"args": [
			  {
				"label": "amount",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"PurchaseInput1"
				  ],
				  "type": 5
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::purchase",
			"mutates": true,
			"payable": true,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0xfc854c90"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::inw_contract",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 18
			},
			"selector": "0x85727e85"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::vesting_duration",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 21
			},
			"selector": "0xeb8a7b3d"
		  },
		  {
			"args": [
			  {
				"label": "inw_price",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"SetInwPriceInput1"
				  ],
				  "type": 5
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::set_inw_price",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0xbbdc2b16"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::end_time",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 21
			},
			"selector": "0x9a7338d4"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::immediate_buying_rate",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 22
			},
			"selector": "0x8b835be0"
		  },
		  {
			"args": [
			  {
				"label": "buyer",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"GetBuyerInfoInput1"
				  ],
				  "type": 0
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::get_buyer_info",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 23
			},
			"selector": "0x71675782"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::total_claimed_amount",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 26
			},
			"selector": "0x1f3590e4"
		  },
		  {
			"args": [
			  {
				"label": "start_time",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"SetStartTimeInput1"
				  ],
				  "type": 4
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::set_start_time",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x04697380"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::start_time",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 21
			},
			"selector": "0x7b7a54ac"
		  },
		  {
			"args": [
			  {
				"label": "vesting_duration",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"SetVestingDurationInput1"
				  ],
				  "type": 4
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::set_vesting_duration",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x714c57b2"
		  },
		  {
			"args": [
			  {
				"label": "inw_contract",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"SetInwContractInput1"
				  ],
				  "type": 0
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::set_inw_contract",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x165100e6"
		  },
		  {
			"args": [
			  {
				"label": "immediate_buying_rate",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"SetImmediateBuyingRateInput1"
				  ],
				  "type": 6
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::set_immediate_buying_rate",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x9f28ae3e"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::claim",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x2e060143"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::total_amount",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 26
			},
			"selector": "0x3badc100"
		  },
		  {
			"args": [
			  {
				"label": "total_amount",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"SetTotalAmountInput1"
				  ],
				  "type": 5
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::set_total_amount",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x9099bb70"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::is_burned",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 27
			},
			"selector": "0xe6421504"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::get_balance",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 19
			},
			"selector": "0x3321577e"
		  },
		  {
			"args": [
			  {
				"label": "end_time",
				"type": {
				  "displayName": [
					"generictokensaletrait_external",
					"SetEndTimeInput1"
				  ],
				  "type": 4
				}
			  }
			],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::set_end_time",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x9309d971"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::total_purchased_amount",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 26
			},
			"selector": "0x045239b0"
		  },
		  {
			"args": [],
			"default": false,
			"docs": [],
			"label": "GenericTokenSaleTrait::inw_price",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 26
			},
			"selector": "0xeb730c59"
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
				  "type": 5
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
			"default": false,
			"docs": [
			  " This function allows contract owner to withdraw contract balance to his account."
			],
			"label": "AdminTrait::withdraw_fee",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
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
				  "type": 5
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
			"default": false,
			"docs": [
			  " This function allow contract owner withdraw PSP22 to an account in case there is any token sent to contract by mistake"
			],
			"label": "AdminTrait::tranfer_psp22",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0xd9aad284"
		  },
		  {
			"args": [
			  {
				"label": "code_hash",
				"type": {
				  "displayName": [
					"upgradeabletrait_external",
					"SetCodeInput1"
				  ],
				  "type": 1
				}
			  }
			],
			"default": false,
			"docs": [
			  " This function allow contract owner modifies the code which is used to execute calls to this contract address (`AccountId`)."
			],
			"label": "UpgradeableTrait::set_code",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x9e32fab2"
		  }
		]
	  },
	  "storage": {
		"root": {
		  "layout": {
			"struct": {
			  "fields": [
				{
				  "layout": {
					"struct": {
					  "fields": [
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 0
							}
						  },
						  "name": "owner"
						},
						{
						  "layout": {
							"enum": {
							  "dispatchKey": "0x00000000",
							  "name": "Option",
							  "variants": {
								"0": {
								  "fields": [],
								  "name": "None"
								},
								"1": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x00000000",
										  "ty": 3
										}
									  },
									  "name": "0"
									}
								  ],
								  "name": "Some"
								}
							  }
							}
						  },
						  "name": "_reserved"
						}
					  ],
					  "name": "Data"
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
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "start_time"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "end_time"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 5
							}
						  },
						  "name": "total_amount"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 0
							}
						  },
						  "name": "inw_contract"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 5
							}
						  },
						  "name": "inw_price"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 6
							}
						  },
						  "name": "immediate_buying_rate"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "vesting_duration"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "end_vesting_time"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "vesting_days"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 5
							}
						  },
						  "name": "total_purchased_amount"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 5
							}
						  },
						  "name": "total_claimed_amount"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"struct": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0xa6c4ef41",
										  "ty": 5
										}
									  },
									  "name": "purchased_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0xa6c4ef41",
										  "ty": 5
										}
									  },
									  "name": "vesting_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0xa6c4ef41",
										  "ty": 5
										}
									  },
									  "name": "claimed_amount"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0xa6c4ef41",
										  "ty": 4
										}
									  },
									  "name": "last_updated_time"
									}
								  ],
								  "name": "BuyerInformation"
								}
							  },
							  "root_key": "0xa6c4ef41"
							}
						  },
						  "name": "buyers"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 7
							}
						  },
						  "name": "is_burned"
						},
						{
						  "layout": {
							"enum": {
							  "dispatchKey": "0x00000000",
							  "name": "Option",
							  "variants": {
								"0": {
								  "fields": [],
								  "name": "None"
								},
								"1": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x00000000",
										  "ty": 3
										}
									  },
									  "name": "0"
									}
								  ],
								  "name": "Some"
								}
							  }
							}
						  },
						  "name": "_reserved"
						}
					  ],
					  "name": "Data"
					}
				  },
				  "name": "data"
				},
				{
				  "layout": {
					"struct": {
					  "fields": [
						{
						  "layout": {
							"enum": {
							  "dispatchKey": "0x00000000",
							  "name": "Option",
							  "variants": {
								"0": {
								  "fields": [],
								  "name": "None"
								},
								"1": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x00000000",
										  "ty": 3
										}
									  },
									  "name": "0"
									}
								  ],
								  "name": "Some"
								}
							  }
							}
						  },
						  "name": "_reserved"
						}
					  ],
					  "name": "Data"
					}
				  },
				  "name": "admin_data"
				},
				{
				  "layout": {
					"struct": {
					  "fields": [
						{
						  "layout": {
							"enum": {
							  "dispatchKey": "0x00000000",
							  "name": "Option",
							  "variants": {
								"0": {
								  "fields": [],
								  "name": "None"
								},
								"1": {
								  "fields": [
									{
									  "layout": {
										"leaf": {
										  "key": "0x00000000",
										  "ty": 3
										}
									  },
									  "name": "0"
									}
								  ],
								  "name": "Some"
								}
							  }
							}
						  },
						  "name": "_reserved"
						}
					  ],
					  "name": "Data"
					}
				  },
				  "name": "upgradeable_data"
				}
			  ],
			  "name": "PrivateSale"
			}
		  },
		  "root_key": "0x00000000"
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
			  "ink_primitives",
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
			  "primitive": "u64"
			}
		  }
		},
		{
		  "id": 5,
		  "type": {
			"def": {
			  "primitive": "u128"
			}
		  }
		},
		{
		  "id": 6,
		  "type": {
			"def": {
			  "primitive": "u32"
			}
		  }
		},
		{
		  "id": 7,
		  "type": {
			"def": {
			  "primitive": "bool"
			}
		  }
		},
		{
		  "id": 8,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 9
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 9
			  },
			  {
				"name": "E",
				"type": 15
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 9,
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
						"type": 10
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
				"type": 10
			  }
			],
			"path": [
			  "Result"
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
						"type": 11,
						"typeName": "String"
					  }
					],
					"index": 0,
					"name": "Custom"
				  },
				  {
					"fields": [
					  {
						"type": 12,
						"typeName": "OwnableError"
					  }
					],
					"index": 1,
					"name": "OwnableError"
				  },
				  {
					"fields": [
					  {
						"type": 13,
						"typeName": "PSP22Error"
					  }
					],
					"index": 2,
					"name": "PSP22Error"
				  },
				  {
					"index": 3,
					"name": "NotEnoughBalance"
				  },
				  {
					"index": 4,
					"name": "WithdrawFeeError"
				  },
				  {
					"index": 5,
					"name": "NotCallable"
				  },
				  {
					"index": 6,
					"name": "CannotTransfer"
				  },
				  {
					"index": 7,
					"name": "CannotBurn"
				  },
				  {
					"index": 8,
					"name": "CheckedOperations"
				  },
				  {
					"index": 9,
					"name": "InvalidBalanceAndAllowance"
				  },
				  {
					"index": 10,
					"name": "AlreadyInit"
				  },
				  {
					"index": 11,
					"name": "InvalidBuyAmount"
				  },
				  {
					"index": 12,
					"name": "InvalidTransferAmount"
				  },
				  {
					"index": 13,
					"name": "CannotCreatePool"
				  },
				  {
					"index": 14,
					"name": "NotTimeToStake"
				  },
				  {
					"index": 15,
					"name": "NoStakerFound"
				  },
				  {
					"index": 16,
					"name": "InvalidUnstakedAmount"
				  },
				  {
					"index": 17,
					"name": "NotEnoughReward"
				  },
				  {
					"index": 18,
					"name": "NotTokenOwner"
				  },
				  {
					"index": 19,
					"name": "AllowanceNotSet"
				  },
				  {
					"index": 20,
					"name": "TokenNotFound"
				  },
				  {
					"index": 21,
					"name": "UserNotStake"
				  },
				  {
					"index": 22,
					"name": "NoTokenOwner"
				  },
				  {
					"index": 23,
					"name": "ExceedTotalStakingAmount"
				  },
				  {
					"index": 24,
					"name": "NoClaimAmount"
				  },
				  {
					"index": 25,
					"name": "NotTimeToWithdraw"
				  },
				  {
					"index": 26,
					"name": "NotEnoughRewardToWithdraw"
				  },
				  {
					"index": 27,
					"name": "NotTopupEnoughReward"
				  },
				  {
					"index": 28,
					"name": "NoAmount"
				  },
				  {
					"index": 29,
					"name": "InvalidTokenBalanceAndAllowance"
				  },
				  {
					"index": 30,
					"name": "CannotApprove"
				  },
				  {
					"index": 31,
					"name": "CannotTopupRewardPool"
				  },
				  {
					"index": 32,
					"name": "NotTimeToPurchase"
				  },
				  {
					"index": 33,
					"name": "NotTimeToClaim"
				  },
				  {
					"index": 34,
					"name": "NotTimeToBurn"
				  },
				  {
					"index": 35,
					"name": "NoTokenPurchased"
				  },
				  {
					"index": 36,
					"name": "AlreadyBurnt"
				  },
				  {
					"index": 37,
					"name": "InvalidTime"
				  },
				  {
					"index": 38,
					"name": "InvalidPercentage"
				  },
				  {
					"index": 39,
					"name": "InvalidDuration"
				  },
				  {
					"index": 40,
					"name": "InvalidTopupAmount"
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
		  "id": 11,
		  "type": {
			"def": {
			  "primitive": "str"
			}
		  }
		},
		{
		  "id": 12,
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
		  "id": 13,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 14,
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
						"type": 14,
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
		  "id": 14,
		  "type": {
			"def": {
			  "sequence": {
				"type": 2
			  }
			}
		  }
		},
		{
		  "id": 15,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"index": 1,
					"name": "CouldNotReadInput"
				  }
				]
			  }
			},
			"path": [
			  "ink_primitives",
			  "LangError"
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
						"type": 17
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 17
			  },
			  {
				"name": "E",
				"type": 15
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
						"type": 3
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 12
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
				"type": 12
			  }
			],
			"path": [
			  "Result"
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
						"type": 0
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 0
			  },
			  {
				"name": "E",
				"type": 15
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
						"type": 20
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 20
			  },
			  {
				"name": "E",
				"type": 15
			  }
			],
			"path": [
			  "Result"
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
						"type": 5
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 10
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
				"type": 5
			  },
			  {
				"name": "E",
				"type": 10
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
					"fields": [
					  {
						"type": 4
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 4
			  },
			  {
				"name": "E",
				"type": 15
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 22,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 6
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 6
			  },
			  {
				"name": "E",
				"type": 15
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 23,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 24
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 24
			  },
			  {
				"name": "E",
				"type": 15
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 24,
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
						"type": 25
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
				"type": 25
			  }
			],
			"path": [
			  "Option"
			]
		  }
		},
		{
		  "id": 25,
		  "type": {
			"def": {
			  "composite": {
				"fields": [
				  {
					"name": "purchased_amount",
					"type": 5,
					"typeName": "Balance"
				  },
				  {
					"name": "vesting_amount",
					"type": 5,
					"typeName": "Balance"
				  },
				  {
					"name": "claimed_amount",
					"type": 5,
					"typeName": "Balance"
				  },
				  {
					"name": "last_updated_time",
					"type": 4,
					"typeName": "u64"
				  }
				]
			  }
			},
			"path": [
			  "inkwhale_project",
			  "impls",
			  "generic_token_sale",
			  "data",
			  "BuyerInformation"
			]
		  }
		},
		{
		  "id": 26,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 5
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 5
			  },
			  {
				"name": "E",
				"type": 15
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 27,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 7
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 7
			  },
			  {
				"name": "E",
				"type": 15
			  }
			],
			"path": [
			  "Result"
			]
		  }
		},
		{
		  "id": 28,
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
			  "types",
			  "Hash"
			]
		  }
		},
		{
		  "id": 29,
		  "type": {
			"def": {
			  "variant": {}
			},
			"path": [
			  "ink_env",
			  "types",
			  "NoChainExtension"
			]
		  }
		}
	  ],
	  "version": "4"
	}
};

export default private_sale_contract;