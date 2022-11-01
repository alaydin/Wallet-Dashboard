import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Table, Button } from '@web3uikit/core';

const port = "https://walletdashboard.herokuapp.com" || 3000;

function TransferHistory({ wallet, chain, transfers, setTransfers }) {

    const [isFetched, setIsFetched] = useState(false);

    async function getTokenTransfers() {
        const response = await axios.get(`${port}/tokenTransfers`, {
            params: {
                address: wallet,
                chain: chain
            }
        });

        if (response.data) {
            setTransfers(response.data);
        } else if (axios.isAxiosError()) {
            console.log(axios.AxiosError);
        } else {
            console.log("No transfer data found.");
        }
        setIsFetched(true);
    }
    return (
        <>
            <div className='tabHeading'>
                <Button text="Get Token Transfer History" onClick={getTokenTransfers}></Button>
            </div>
            <div>
                {transfers.length > 0 &&
                    <Table
                        pageSize={8}
                        noPagination={false}
                        style={{ width: "90vw" }}
                        columnsConfig="16vw 18vw 18vw 18vw 16vw"
                        data={transfers.map((e) => [
                            e.symbol,
                            (Number(e.value) / Number(`1e${e.decimals}`)).toFixed(2),
                            `${e.from_address.slice(0, 4)}...${e.from_address.slice(38)}`,
                            `${e.to_address.slice(0, 4)}...${e.to_address.slice(38)}`,
                            e.block_timestamp.slice(0, 10)
                        ])}
                        header={[
                            <span>Token</span>,
                            <span>Amount</span>,
                            <span>From</span>,
                            <span>To</span>,
                            <span>Date</span>
                        ]}
                    >
                    </Table>
                }
            </div>
        </>
    )
}

export default TransferHistory