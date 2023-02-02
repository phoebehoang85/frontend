const core_contract = {
  CONTRACT_ADDRESS: "5DLfvZZx3CtS9ki12HAHUes5aQfhTiMzbA3c5H4QymgMKGkC",
  CONTRACT_ABI: {
	  "source": {
		"hash": "0xe62c8d4a53e0ed21857ae3a05284a3eed555b189c482968619f3658bdf31a760",
		"language": "ink! 3.4.0",
		"compiler": "rustc 1.68.0-nightly"
	  },
	  "contract": {
		"name": "token_generator",
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
				  "label": "psp22_hash",
				  "type": {
					"displayName": [
					  "Hash"
					],
					"type": 4
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
				  "label": "creation_fee",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 6
				  }
				},
				{
				  "label": "owner_address",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
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
				  "label": "psp22_hash",
				  "type": {
					"displayName": [
					  "Hash"
					],
					"type": 4
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
				  "label": "creation_fee",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 6
				  }
				}
			  ],
			  "docs": [],
			  "label": "initialize",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 12
			  },
			  "selector": "0xf2f6dba3"
			},
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
					"type": 6
				  }
				},
				{
				  "label": "name",
				  "type": {
					"displayName": [
					  "String"
					],
					"type": 9
				  }
				},
				{
				  "label": "symbol",
				  "type": {
					"displayName": [
					  "String"
					],
					"type": 9
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
			  "label": "new_token",
			  "mutates": true,
			  "payable": true,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 12
			  },
			  "selector": "0x7d97ec7b"
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
				"type": 17
			  },
			  "selector": "0x5e228753"
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
				"type": 17
			  },
			  "selector": "0x11f43efd"
			},
			{
			  "args": [
				{
				  "label": "psp22_hash",
				  "type": {
					"displayName": [
					  "tokenmanagertrait_external",
					  "SetContractHashInput1"
					],
					"type": 4
				  }
				}
			  ],
			  "docs": [],
			  "label": "TokenManagerTrait::set_contract_hash",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "tokenmanagertrait_external",
				  "SetContractHashOutput"
				],
				"type": 12
			  },
			  "selector": "0xf38784b8"
			},
			{
			  "args": [
				{
				  "label": "value",
				  "type": {
					"displayName": [
					  "tokenmanagertrait_external",
					  "WithdrawFeeInput1"
					],
					"type": 6
				  }
				}
			  ],
			  "docs": [
				" Withdraw Fees - only Owner"
			  ],
			  "label": "TokenManagerTrait::withdraw_fee",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "tokenmanagertrait_external",
				  "WithdrawFeeOutput"
				],
				"type": 12
			  },
			  "selector": "0xf8bc0c3d"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "TokenManagerTrait::get_token_count",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "tokenmanagertrait_external",
				  "GetTokenCountOutput"
				],
				"type": 5
			  },
			  "selector": "0xebabc233"
			},
			{
			  "args": [
				{
				  "label": "value",
				  "type": {
					"displayName": [
					  "tokenmanagertrait_external",
					  "WithdrawWalInput1"
					],
					"type": 6
				  }
				}
			  ],
			  "docs": [],
			  "label": "TokenManagerTrait::withdraw_wal",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "tokenmanagertrait_external",
				  "WithdrawWalOutput"
				],
				"type": 12
			  },
			  "selector": "0x4e807631"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "TokenManagerTrait::get_creation_fee",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "tokenmanagertrait_external",
				  "GetCreationFeeOutput"
				],
				"type": 6
			  },
			  "selector": "0x034ef9b9"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "TokenManagerTrait::get_contract_hash",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "tokenmanagertrait_external",
				  "GetContractHashOutput"
				],
				"type": 4
			  },
			  "selector": "0xf39b5876"
			},
			{
			  "args": [
				{
				  "label": "index",
				  "type": {
					"displayName": [
					  "tokenmanagertrait_external",
					  "GetTokenInfoInput1"
					],
					"type": 5
				  }
				}
			  ],
			  "docs": [],
			  "label": "TokenManagerTrait::get_token_info",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "tokenmanagertrait_external",
				  "GetTokenInfoOutput"
				],
				"type": 18
			  },
			  "selector": "0x3453024b"
			},
			{
			  "args": [
				{
				  "label": "wal_contract",
				  "type": {
					"displayName": [
					  "tokenmanagertrait_external",
					  "SetWalContractInput1"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [],
			  "label": "TokenManagerTrait::set_wal_contract",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "tokenmanagertrait_external",
				  "SetWalContractOutput"
				],
				"type": 12
			  },
			  "selector": "0x929ea02e"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "TokenManagerTrait::get_wal_contract",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "tokenmanagertrait_external",
				  "GetWalContractOutput"
				],
				"type": 0
			  },
			  "selector": "0x23887774"
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
					"type": 6
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
				"type": 12
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
					"type": 19
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
				"type": 12
			  },
			  "selector": "0xed1e1dfa"
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
					"type": 6
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
				"type": 12
			  },
			  "selector": "0x07573e99"
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
							"key": "0xc386dafc00000000000000000000000000000000000000000000000000000000",
							"ty": 4
						  }
						},
						"name": "standard_psp22_hash"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0xc486dafc00000000000000000000000000000000000000000000000000000000",
							"ty": 0
						  }
						},
						"name": "admin_address"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0xc586dafc00000000000000000000000000000000000000000000000000000000",
							"ty": 5
						  }
						},
						"name": "token_count"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0xc686dafc00000000000000000000000000000000000000000000000000000000",
							"ty": 0
						  }
						},
						"name": "wal_contract"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0xc786dafc00000000000000000000000000000000000000000000000000000000",
							"ty": 6
						  }
						},
						"name": "creation_fee"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0xc886dafc00000000000000000000000000000000000000000000000000000000",
							"ty": 7
						  }
						},
						"name": "token_list"
					  },
					  {
						"layout": {
						  "enum": {
							"dispatchKey": "0xc986dafc00000000000000000000000000000000000000000000000000000000",
							"variants": {
							  "0": {
								"fields": [
								  {
									"layout": {
									  "cell": {
										"key": "0xca86dafc00000000000000000000000000000000000000000000000000000000",
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
				"name": "manager"
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
				"Hash"
			  ]
			}
		  },
		  {
			"id": 5,
			"type": {
			  "def": {
				"primitive": "u64"
			  }
			}
		  },
		  {
			"id": 6,
			"type": {
			  "def": {
				"primitive": "u128"
			  }
			}
		  },
		  {
			"id": 7,
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
				  "type": 5
				},
				{
				  "name": "V",
				  "type": 8
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
			"id": 8,
			"type": {
			  "def": {
				"composite": {
				  "fields": [
					{
					  "name": "name",
					  "type": 9,
					  "typeName": "String"
					},
					{
					  "name": "symbol",
					  "type": 9,
					  "typeName": "String"
					},
					{
					  "name": "decimal",
					  "type": 2,
					  "typeName": "u8"
					},
					{
					  "name": "contract_address",
					  "type": 0,
					  "typeName": "AccountId"
					},
					{
					  "name": "creator",
					  "type": 0,
					  "typeName": "AccountId"
					},
					{
					  "name": "mint_to",
					  "type": 0,
					  "typeName": "AccountId"
					},
					{
					  "name": "total_supply",
					  "type": 6,
					  "typeName": "Balance"
					}
				  ]
				}
			  },
			  "path": [
				"inkwhale_project",
				"impls",
				"token_manager",
				"data",
				"Token"
			  ]
			}
		  },
		  {
			"id": 9,
			"type": {
			  "def": {
				"sequence": {
				  "type": 2
				}
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
				  5,
				  8
				]
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
						  "type": 13
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
				  "type": 13
				}
			  ],
			  "path": [
				"Result"
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
						  "type": 9,
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
						  "type": 15,
						  "typeName": "PSP34Error"
						}
					  ],
					  "index": 2,
					  "name": "PSP34Error"
					},
					{
					  "fields": [
						{
						  "type": 16,
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
			"id": 14,
			"type": {
			  "def": {
				"variant": {
				  "variants": [
					{
					  "fields": [
						{
						  "type": 9,
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
						  "type": 9,
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
					  "fields": [
						{
						  "type": 9,
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
						  "type": 9,
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
			"id": 16,
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
						  "type": 16
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
				  "type": 16
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
					  "index": 0,
					  "name": "None"
					},
					{
					  "fields": [
						{
						  "type": 8
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
				  "type": 8
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
						  "type": 20,
						  "typeName": "u16"
						}
					  ],
					  "index": 1,
					  "name": "U16"
					},
					{
					  "fields": [
						{
						  "type": 21,
						  "typeName": "u32"
						}
					  ],
					  "index": 2,
					  "name": "U32"
					},
					{
					  "fields": [
						{
						  "type": 5,
						  "typeName": "u64"
						}
					  ],
					  "index": 3,
					  "name": "U64"
					},
					{
					  "fields": [
						{
						  "type": 6,
						  "typeName": "u128"
						}
					  ],
					  "index": 4,
					  "name": "U128"
					},
					{
					  "fields": [
						{
						  "type": 9,
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
			"id": 20,
			"type": {
			  "def": {
				"primitive": "u16"
			  }
			}
		  },
		  {
			"id": 21,
			"type": {
			  "def": {
				"primitive": "u32"
			  }
			}
		  }
		]
	  }
	}
};

export default core_contract;