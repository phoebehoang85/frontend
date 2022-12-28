const core_contract = {
  CONTRACT_ADDRESS: "5DbQ4bnSy3Cp8wPTXGrEnr14EAXU9vjV3TN6UTKFS2dv699X",
  CONTRACT_ABI: {
	  "source": {
		"hash": "0x04f71d7d1d24d825d32ae6b8941cfe35c9f76276a93fc3bd68121a7699383883",
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
				"type": 11
			  },
			  "selector": "0x7d97ec7b"
			},
			{
			  "args": [
				{
				  "label": "index",
				  "type": {
					"displayName": [
					  "u64"
					],
					"type": 5
				  }
				}
			  ],
			  "docs": [],
			  "label": "get_token_info",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Option"
				],
				"type": 13
			  },
			  "selector": "0x44bf925c"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "get_token_count",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "u64"
				],
				"type": 5
			  },
			  "selector": "0x744362af"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "get_creation_fee",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Balance"
				],
				"type": 6
			  },
			  "selector": "0xfd96b0ad"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "get_contract_hash",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Hash"
				],
				"type": 4
			  },
			  "selector": "0xe9232553"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "get_wal_contract",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "AccountId"
				],
				"type": 0
			  },
			  "selector": "0xec8bb683"
			},
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
				}
			  ],
			  "docs": [],
			  "label": "set_contract_hash",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 11
			  },
			  "selector": "0x01e49483"
			},
			{
			  "args": [
				{
				  "label": "wal_contract",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				}
			  ],
			  "docs": [],
			  "label": "set_wal_contract",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 11
			  },
			  "selector": "0x2456533d"
			},
			{
			  "args": [
				{
				  "label": "value",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 6
				  }
				}
			  ],
			  "docs": [
				" Withdraw Fees - only Owner"
			  ],
			  "label": "withdraw_fee",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 11
			  },
			  "selector": "0x07fdb555"
			},
			{
			  "args": [
				{
				  "label": "value",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 6
				  }
				}
			  ],
			  "docs": [],
			  "label": "withdraw_wal",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 11
			  },
			  "selector": "0xda1e1d15"
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
				"type": 14
			  },
			  "selector": "0x11f43efd"
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
				"type": 14
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
				  "struct": {
					"fields": [
					  {
						"layout": {
						  "cell": {
							"key": "0x2ab4d7df00000000000000000000000000000000000000000000000000000000",
							"ty": 4
						  }
						},
						"name": "standard_psp22_hash"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x2bb4d7df00000000000000000000000000000000000000000000000000000000",
							"ty": 0
						  }
						},
						"name": "admin_address"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x2cb4d7df00000000000000000000000000000000000000000000000000000000",
							"ty": 5
						  }
						},
						"name": "token_count"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x2db4d7df00000000000000000000000000000000000000000000000000000000",
							"ty": 0
						  }
						},
						"name": "wal_contract"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x2eb4d7df00000000000000000000000000000000000000000000000000000000",
							"ty": 6
						  }
						},
						"name": "creation_fee"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x2fb4d7df00000000000000000000000000000000000000000000000000000000",
							"ty": 7
						  }
						},
						"name": "token_list"
					  },
					  {
						"layout": {
						  "enum": {
							"dispatchKey": "0x30b4d7df00000000000000000000000000000000000000000000000000000000",
							"variants": {
							  "0": {
								"fields": [
								  {
									"layout": {
									  "cell": {
										"key": "0x31b4d7df00000000000000000000000000000000000000000000000000000000",
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
					  "name": "offset_key",
					  "type": 10,
					  "typeName": "Key"
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
				"ink_storage",
				"lazy",
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
				"token_generator",
				"token_generator",
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
			"id": 11,
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
			"id": 12,
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
					  "name": "CannotTransfer"
					}
				  ]
				}
			  },
			  "path": [
				"token_generator",
				"token_generator",
				"Error"
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
			"id": 14,
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
				  "type": 3
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
			"id": 15,
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

export default core_contract;