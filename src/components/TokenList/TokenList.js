import React, { useEffect, useState, useCallback } from 'react';
import images from '../../constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { truncateStr, numberWithCommas } from '../../utils';
import './TokenList.css';
import { clientAPI } from '../../api/client';
import useInterval from '../../hooks/useInterval';
import toast from 'react-hot-toast';
import core_contract from '../../contracts/core_calls';

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import AddressCopier from '../AddressCopier/AddressCopier';
let currentPage = 1;
const TokenList = () => {
  const selectedAccount = useSelector((s) => s.substrate.selectedAccount);
  const [uiPage, setUIPage] = useState(1);
  const [active, setActive] = useState('newTokens');
  const [data, setdata] = useState([]);
  const api = useSelector((s) => s.substrate.api);

  const getData = async () => {
    if (!api) return;
    let tokenCount = await core_contract.getTokenCount(selectedAccount);
    // console.log(tokenCount);
    let tokens = [];
    for (let index = tokenCount; index > 0 ; index--) {
      //console.log(index);
      let tokenInfo = await core_contract.getTokenInfo(selectedAccount, index);
      if (tokenInfo) tokens.push(tokenInfo);
    }

    setdata(tokens);
  };
  useInterval(() => getData(), 10000);

  useEffect(() => {
    getData();
  }, [api]);

  return (
    <Box textAlign="center" px="8px">
      <section className="Update--table-box">
        <Heading py="30px" fontSize="32px" fontWeight="normal">
          Recent Tokens
        </Heading>
        <div className="update--table-boxWrapper">
          <div className="update---table--content-box">
            <table
              style={{ fontSize: '18px' }}
              className="update--ROI--table-box"
            >
              <tr>
                <th>Contract Address</th>
                <th>Creator</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Decimal</th>
                <th>Initial Mint</th>
                <th>Minted to</th>
              </tr>

              {data.map(
                (
                  {
                    name,
                    symbol,
                    decimal,
                    contractAddress,
                    creator,
                    mintTo,
                    totalSupply,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{<AddressCopier address={contractAddress} />}</td>
                    <td>{<AddressCopier address={creator} />}</td>
                    <td>{name}</td>
                    <td>{symbol}</td>
                    <td>{decimal}</td>
                    <td>
                      {numberWithCommas(
                        totalSupply.replace(/\,/g, '') / 10 ** 12
                      )}
                    </td>
                    <td>{<AddressCopier address={mintTo} />}</td>
                  </tr>
                )
              )}
            </table>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default TokenList;
