import React from 'react';
import AZT_Mint from '../../components/AZT_Mint';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AZT = () => {
  //const selectedAccount = useSelector((s) => s.substrate.selectedAccount);

  useEffect(() => {
    //console.log(selectedAccount);
    //core_contract.getOverRates(selectedAccount);
  }, []);

  return (
    <>
     <div className='main--content-box'>
        <AZT_Mint />
      </div>
    </>
  )
}

export default AZT;
