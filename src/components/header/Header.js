import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiMenu, BiX } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { navItemData, walletData } from '../../constants/data';
import { truncateStr } from '../../utils';

import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '../../wallets/extension-dapp';
import { keyring as Keyring } from '@polkadot/ui-keyring';

import { setCoreContract } from '../../contracts/core_calls';
import { setPoolGeneratorContract } from '../../contracts/pool_generator_calls';
import { setLPPoolGeneratorContract } from '../../contracts/lp_pool_generator_calls';
import { setNFTPoolGeneratorContract } from '../../contracts/nft_pool_generator_calls';

import lp_pool_generator_contract from '../../contracts/lp_pool_generator';
import pool_generator_contract from '../../contracts/pool_generator';
import nft_pool_generator_contract from '../../contracts/nft_pool_generator';
import core_contract from '../../contracts/core';
import azt_contract from '../../contracts/azt';
import { setAZTContract } from '../../contracts/azt_calls';
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
let socket = 'wss://ws.test.azero.dev';
let app_name = 'inkwhale';
let _api = null;

function Header() {
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const [active, setActive] = useState('home');

  const [selected, setWallet] = useState(null);
  const handleClick = () => setClick(!click);

  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [connected, setConnected] = useState(false);
  const asyncLoadAccounts = async (wallet) => {
    try {
      await web3Enable(app_name, [], wallet);

      let allAccounts = await web3Accounts();

      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name}` },
      }));

      try {
        Keyring.loadAll({ isDevelopment: false }, allAccounts);
      } catch (error) {
        allAccounts.forEach(({ address, meta }) => {
          Keyring.saveAddress(address, meta);
        });
      }
      //console.log(allAccounts);
      setAccounts(allAccounts);
      if (allAccounts.length > 0) {
        setSelectedAccount(allAccounts[0].address);
        dispatch({
          type: 'setSelectedAccount',
          payload: allAccounts[0].address,
        });
      } else {
        setSelectedAccount('');
        toast.error(
          'Wallet Extension not found or no accounts linked to this wallet'
        );
      }
      //dispatch({ type: "SET_KEYRING", payload: Keyring });
    } catch (e) {
      console.error(e);
      //dispatch({ type: "KEYRING_ERROR" });
      toast.error(
        'Wallet Extension not found or no accounts linked to this wallet'
      );
    }
  };

  useEffect(() => {
    if (connected) return;
    console.log(`Connected socket: ${socket}`);
    toast('Connecting to AZero network...');
    const provider = new WsProvider(socket);
    _api = new ApiPromise({
      provider,
      rpc: jsonrpc,
    });
    _api.on('connected', () => {
      _api.isReady.then((_api) => {
        toast('Connected to AZero network');
        //toast('Please select your wallet and account');
        selectWallet(walletData[0]);
      });
    });

    _api.on('ready', () => {
      dispatch({ type: 'setAPI', payload: _api });
      setCoreContract(_api, core_contract);
      setAZTContract(_api, azt_contract);
      setPoolGeneratorContract(_api, pool_generator_contract);
      setNFTPoolGeneratorContract(_api, nft_pool_generator_contract);
      setLPPoolGeneratorContract(_api, lp_pool_generator_contract);
    });

    _api.on('error', (err) => {
      console.log(err);
      toast.error('Something wrong while connecting to AZero network');
    });
  }, []);

  const getGameData = async () => {
    if (selectedAccount == '') return;
  };

  const selectWallet = (data) => {
    if (!_api) {
      toast.error('Not connected to Azero network yet.');
    }
    setConnected(true);
    //Connect to Wallet
    setSelectedWallet(data);
    asyncLoadAccounts(data.extensionName);
    dispatch({ type: 'setExtensionName', payload: data.extensionName });
  };

  const selectAccount = (account) => {
    // console.log(account);
    setSelectedAccount(account);
    handleClick();
    dispatch({ type: 'setSelectedAccount', payload: account });
    //console.log(selectedAccountRedux);
  };
  const onDisconnect = () => {
    setSelectedAccount('');
    setSelectedWallet(null);
    setConnected(false);
    setAccounts([]);
  };

  const [isBigScreen] = useMediaQuery('(min-width: 480px)');
  const navigate = useNavigate();

  return (
    <>
      <header className="header-section">
        <div className="header-container">
          <div className="brand__logo">
            <div>
              <Link to="/" className="header-brand-logo">
                <Heading fontSize="24px">INK WHALE</Heading>
              </Link>
            </div>
            <div className="mobile-navbar-trigger" onClick={handleClick}>
              <span>{click ? <BiX /> : <BiMenu />}</span>
            </div>
          </div>
          <div
            style={{ display: `${click ? 'flex' : ''}` }}
            className="header-wrapper"
          >
            <div className={click ? 'navbar-navbox open' : 'navbar-navbox'}>
              <nav className="navbar-nav" style={{ marginRight: '20px' }}>
                <ul className="navbar-navitems">
                  {navItemData.map((item) => (
                    item.name == "my-account" && selectedAccount !== "" ?
                    <li
                      onClick={() => {
                        setClick(!click);
                        setActive(item.name);
                      }}
                      key={item.id}
                    >
                      <Link
                        to={item.path}
                        className={`${
                          active === item.name && 'active'
                        } navbar-nava`}
                      >
                        <Text> {item.slug}</Text>
                      </Link>
                    </li>
                    :
                    item.name != "my-account" ?
                    <li
                      onClick={() => {
                        setClick(!click);
                        setActive(item.name);
                      }}
                      key={item.id}
                    >
                      <Link
                        to={item.path}
                        className={`${
                          active === item.name && 'active'
                        } navbar-nava`}
                      >
                        <Text> {item.slug}</Text>
                      </Link>
                    </li>
                    :
                    null
                  ))}

                  {isBigScreen ? (
                    NAV_ITEMS?.map((navItem) => (
                      selectedAccount === "" ?
                        navItem.label !== "My Account" ?
                          <Menu placement="bottom-end">
                            <MenuButton
                              variant=""
                              ml="24px"
                              as={Button}
                              color={active === navItem?.label ? "white" : "#fff6" }
                              fontSize="18px"
                              fontWeight="400"
                              rightIcon={<ChevronDownIcon />}
                            >
                              {navItem?.label}
                            </MenuButton>

                            <MenuList bg="#222" border="none">
                              {navItem?.children?.map(({ label, href }) => (
                                <Link
                                  to={href}
                                >
                                  <MenuItem
                                    bg="#222"
                                    key={label}
                                    color="#fff6"
                                    _hover={{ color: 'white' }}
                                    onClick={() => {
                                      setActive(navItem?.label);
                                    }}
                                  >
                                    {label}
                                  </MenuItem>
                                </Link>

                              ))}
                            </MenuList>
                          </Menu>
                          :
                          null
                      :
                      <Menu placement="bottom-end">
                        <MenuButton
                          variant=""
                          ml="24px"
                          as={Button}
                          color={active === navItem?.label ? "white" : "#fff6" }
                          fontSize="18px"
                          fontWeight="400"
                          rightIcon={<ChevronDownIcon />}
                        >
                          {navItem?.label}
                        </MenuButton>

                        <MenuList bg="#222" border="none">
                          {navItem?.children?.map(({ label, href }) => (
                            <Link
                              to={href}
                            >
                              <MenuItem
                                bg="#222"
                                key={label}
                                color="#fff6"
                                _hover={{ color: 'white' }}
                                onClick={() => {
                                  setActive(navItem?.label);
                                }}
                              >
                                {label}
                              </MenuItem>
                            </Link>

                          ))}
                        </MenuList>
                      </Menu>
                    ))
                  ) : (
                    NAV_ITEMS?.map((navItem) => (
                      selectedAccount === "" ?
                        navItem.label !== "My Account" ?
                          <DropdownNavItem
                            {...navItem}
                            key={navItem.label}
                            setClick={() => setClick(!click)}
                          />
                          :
                          null
                      :
                      <DropdownNavItem
                        {...navItem}
                        key={navItem.label}
                        setClick={() => setClick(!click)}
                      />
                    ))
                  )}
                </ul>
              </nav>

              <ul className="header-btnbox">
                <li className="header-walletbtnbox">
                  <div className="wallet__btn btn-styled selected__box">
                    {selectedAccount !== '' ? (
                      <div className="header-walletbtn selected__box">
                        <img
                          src={selectedWallet.icon}
                          alt={selectedWallet.name}
                          width="30"
                        />
                        <h4>{truncateStr(selectedAccount, 4)}</h4>
                      </div>
                    ) : (
                      <Box
                        h="50px"
                        w="full"
                        my="auto"
                        color="white"
                        borderRadius="5px"
                        bgGradient="linear(to-r, blue.500, green.500)"
                        _hover={{
                          bgGradient: 'linear(to-r, purple.300, yellow.500)',
                        }}
                        // className="btn-styled"
                      >
                        select wallet
                        {/* <h4></h4> */}
                      </Box>
                    )}
                  </div>
                  {!connected ? (
                    <ul className="drop__down__content">
                      {/* <h4>Select your wallet</h4> */}
                      {walletData.map((data) => (
                        <div
                          onClick={() => {
                            selectWallet(data);
                          }}
                          id={data.id}
                          className="drop__down_item"
                        >
                          <img src={data.icon} alt={data.name} width="30" />
                          <li className="drop__down_btn">{data.name}</li>
                        </div>
                      ))}
                      {/*<li className='limit__btn' onClick={() => value ? setValue(null) : setValue(walletData.length / 2)}>
                      {value ? "more option" : "less option"}
                      <span>
                        {value ?
                          <IoIosArrowDown /> :
                          <IoIosArrowUp />}
                      </span>
                    </li>*/}
                    </ul>
                  ) : (
                    <ul className="drop__down__content">
                      {/* <h4>Select your accounts</h4> */}
                      {accounts.map((data) => (
                        <div
                          onClick={() => {
                            selectAccount(data.address);
                          }}
                          id={data.address}
                          className="drop__down_item"
                        >
                          <li className="drop__down_btn">
                            {data.meta.name.length > 12
                              ? data.meta.name.substr(0, 12) + '...'
                              : data.meta.name}{' '}
                            {truncateStr(data.address)}
                          </li>
                        </div>
                      ))}
                      <div
                        onClick={() => onDisconnect()}
                        className="drop__down_item"
                      >
                        <li className="drop__down_btn">Disconnect</li>
                      </div>
                    </ul>
                  )}
                </li>
                {/*
                  selected &&
                  <li className='selected__balance'>
                    <h6>
                      {selected.balance}
                    </h6>
                  </li>
                */}
                {/*<li className='header-settingbtnbox'>
                  <Link to="/" className='header-settingsbtn' >
                    <img src={images.settings} alt="settingsImg" />
                  </Link>
                </li>*/}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

const DropdownNavItem = ({ label, children, setClick }) => {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex mt="20px" align={'center'} justify={'space-between'}>
        <Text
          ml="43px"
          mr="78px"
          fontSize="18px"
          fontWeight="400"
          color={isOpen ? '#fff' : '#fff6'}
        >
          {label}
        </Text>

        {children && (
          <Icon
            w={6}
            h={6}
            as={ChevronDownIcon}
            color={isOpen ? '#fff' : '#fff6'}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack ml="43px" align={'start'} color="#fff6" lineHeight="shorter">
          {children?.map((child) => (
            <Text
              py={'5px'}
              key={child.label}
              onClick={() => {
                setClick();
                navigate(child.href);
              }}
            >
              {child.label}
            </Text>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'My Account',
    children: [
      {
        label: 'My Pools',
        href: '/my-pools',
      },
      {
        label: 'My NFT Farms',
        href: '/my-nft-pools',
      },
      {
        label: 'My LP Farms',
        href: '/my-lp-pools',
      }
    ],
  },
  {
    label: 'Create',
    children: [
      {
        label: 'Token',
        href: '/token-creator',
      },
      {
        label: 'Staking Pool',
        href: '/pool-creator',
      },
      {
        label: 'NFT Yield Farm',
        href: '/nft-pool-creator',
      },
      {
        label: 'Yield Farm',
        href: '/lp-pool-creator',
      },
    ],
  }
];
