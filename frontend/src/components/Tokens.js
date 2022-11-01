import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Table, Button } from '@web3uikit/core';

const port = "https://walletdashboard.herokuapp.com" || 3000;

function Tokens({ wallet, chain, tokens, setTokens }) {

    const [isFetched, setIsFetched] = useState(false);

    async function gettokenBalances() {
        const response = await axios.get(`${port}/tokenBalances`, {
            params: {
                address: wallet,
                chain: chain
            }
        });

        if (response.data) {
            let t = response.data;

            for (let i = 0; i < t.length; i++) {
                t[i].bal = (Number(t[i].balance) / Number(`1E${t[i].decimals}`)).toFixed(3);
                t[i].val = ((Number(t[i].balance) / Number(`1E${t[i].decimals}`)) * Number(t[i].usd)).toFixed(2);
            }
            setTokens(t);
        }
        setIsFetched(true);
    }

    return (
        <>
            <div className='tabHeading'><Button text='Check ERC20 Tokens' onClick={gettokenBalances}></Button></div>
            {isFetched &&
                <Table
                    pageSize={5}
                    noPagination={true}
                    style={{ width: "900px" }}
                    columnsConfig="300px 300px 250px"
                    data={tokens.map((e)=> [e.symbol, e.bal, `$${e.val}`])}
                    header={[
                        <span>Currency</span>,
                        <span>Balance</span>,
                        <span>Value</span>
                    ]}
                >
                </Table>
            }
        </>
    )
}

export default Tokens