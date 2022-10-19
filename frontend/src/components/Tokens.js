import React from 'react'
import axios from 'axios';
import { Table, Button } from '@web3uikit/core';

function Tokens({ wallet, chain, tokens, setTokens }) {

    async function gettokenBalances() {
        const response = await axios.get("http://localhost:8080/tokenBalances", {
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
    }

    return (
        <>
            <div className='tabHeading'><Button text='Check ERC20 Tokens' onClick={gettokenBalances}></Button></div>
            {tokens.length > 0 &&
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