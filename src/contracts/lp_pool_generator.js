const lp_pool_generator_contract = {
  CONTRACT_ADDRESS: "5EVGKZ3Syy8uBEtG1fEFfvFGxArZeSwQ72AMdvw4MtN4Biv2",
  CONTRACT_ABI: {
	  "source": {
		"hash": "0xc3f7b9ca35c3a6c70984f0d4b1925a9447f394106b0a53a62b2eb0c1a07b6d8a",
		"language": "ink! 3.4.0",
		"compiler": "rustc 1.68.0-nightly"
	  },
	  "contract": {
		"name": "lp_pool_generator",
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
				  "label": "pool_hash",
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
				  "label": "unstake_fee",
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
				  "label": "contract_owner",
				  "type": {
					"displayName": [
					  "AccountId"
					],
					"type": 0
				  }
				},
				{
				  "label": "lp_contract_address",
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
					  "u64"
					],
					"type": 5
				  }
				},
				{
				  "label": "duration",
				  "type": {
					"displayName": [
					  "u64"
					],
					"type": 5
				  }
				},
				{
				  "label": "start_time",
				  "type": {
					"displayName": [
					  "u64"
					],
					"type": 5
				  }
				}
			  ],
			  "docs": [],
			  "label": "new_pool",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 13
			  },
			  "selector": "0x2393fe3a"
			},
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
			  "label": "get_pool_by_owner",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "u64"
				],
				"type": 5
			  },
			  "selector": "0x37249b63"
			},
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
				}
			  ],
			  "docs": [],
			  "label": "get_pool_count_by_owner",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "u64"
				],
				"type": 5
			  },
			  "selector": "0x15bfde27"
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
			  "label": "get_pool",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Option"
				],
				"type": 11
			  },
			  "selector": "0x1a8beae4"
			},
			{
			  "args": [],
			  "docs": [],
			  "label": "get_pool_count",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "u64"
				],
				"type": 5
			  },
			  "selector": "0x198be031"
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
			  "label": "get_unstake_fee",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Balance"
				],
				"type": 6
			  },
			  "selector": "0x42b36257"
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
			  "args": [],
			  "docs": [],
			  "label": "get_pool_hash",
			  "mutates": false,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Hash"
				],
				"type": 4
			  },
			  "selector": "0xf65315b7"
			},
			{
			  "args": [
				{
				  "label": "pool_hash",
				  "type": {
					"displayName": [
					  "Hash"
					],
					"type": 4
				  }
				}
			  ],
			  "docs": [],
			  "label": "set_pool_hash",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 13
			  },
			  "selector": "0x6ab80000"
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
				"type": 13
			  },
			  "selector": "0x2456533d"
			},
			{
			  "args": [
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
			  "label": "set_creation_fee",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 13
			  },
			  "selector": "0x78bc642f"
			},
			{
			  "args": [
				{
				  "label": "unstake_fee",
				  "type": {
					"displayName": [
					  "Balance"
					],
					"type": 6
				  }
				}
			  ],
			  "docs": [],
			  "label": "set_unstake_fee",
			  "mutates": true,
			  "payable": false,
			  "returnType": {
				"displayName": [
				  "Result"
				],
				"type": 13
			  },
			  "selector": "0x01456dca"
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
				"type": 13
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
				"type": 13
			  },
			  "selector": "0xda1e1d15"
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
							"key": "0x888febed00000000000000000000000000000000000000000000000000000000",
							"ty": 4
						  }
						},
						"name": "pool_hash"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x898febed00000000000000000000000000000000000000000000000000000000",
							"ty": 0
						  }
						},
						"name": "admin_address"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x8a8febed00000000000000000000000000000000000000000000000000000000",
							"ty": 5
						  }
						},
						"name": "pool_count"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x8b8febed00000000000000000000000000000000000000000000000000000000",
							"ty": 0
						  }
						},
						"name": "wal_contract"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x8c8febed00000000000000000000000000000000000000000000000000000000",
							"ty": 6
						  }
						},
						"name": "creation_fee"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x8d8febed00000000000000000000000000000000000000000000000000000000",
							"ty": 6
						  }
						},
						"name": "unstake_fee"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x8e8febed00000000000000000000000000000000000000000000000000000000",
							"ty": 7
						  }
						},
						"name": "pool_list"
					  },
					  {
						"layout": {
						  "struct": {
							"fields": [
							  {
								"layout": {
								  "cell": {
									"key": "0x8f8febed00000000000000000000000000000000000000000000000000000000",
									"ty": 9
								  }
								},
								"name": "id_to_index"
							  },
							  {
								"layout": {
								  "cell": {
									"key": "0x908febed00000000000000000000000000000000000000000000000000000000",
									"ty": 9
								  }
								},
								"name": "index_to_id"
							  }
							]
						  }
						},
						"name": "pool_ids"
					  },
					  {
						"layout": {
						  "cell": {
							"key": "0x918febed00000000000000000000000000000000000000000000000000000000",
							"ty": 12
						  }
						},
						"name": "pool_ids_last_index"
					  },
					  {
						"layout": {
						  "enum": {
							"dispatchKey": "0x928febed00000000000000000000000000000000000000000000000000000000",
							"variants": {
							  "0": {
								"fields": [
								  {
									"layout": {
									  "cell": {
										"key": "0x938febed00000000000000000000000000000000000000000000000000000000",
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
					  "type": 8,
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
				  "type": 0
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
				  "type": 10
				},
				{
				  "name": "V",
				  "type": 5
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
			"id": 10,
			"type": {
			  "def": {
				"tuple": [
				  11,
				  5
				]
			  }
			}
		  },
		  {
			"id": 11,
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
						  "type": 0
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
				  "type": 0
				}
			  ],
			  "path": [
				"Option"
			  ]
			}
		  },
		  {
			"id": 12,
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
				  "type": 11
				},
				{
				  "name": "V",
				  "type": 5
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
						  "type": 15,
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
				"lp_pool_generator",
				"lp_pool_generator",
				"Error"
			  ]
			}
		  },
		  {
			"id": 15,
			"type": {
			  "def": {
				"sequence": {
				  "type": 2
				}
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

export default lp_pool_generator_contract;