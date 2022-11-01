import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Table } from '@web3uikit/core';

const port = "https://walletdashboard.herokuapp.com" || 3000;

function Nfts({ wallet, chain, nfts, setNfts, filteredNfts, setFilteredNfts }) {

    const [isFetched, setIsFetched] = useState(false);
    const [nameFilter, setNameFilter] = useState("");

    async function getNftBalance() {
        const response = await axios.get(`${port}/nftBalance`, {
            params: {
                address: wallet,
                chain: chain
            }
        });
        if (response.data) {
            nftProcessing(response.data.result);
        }
        setIsFetched(true);
    }
    function nftProcessing(temp) {
        for (let i = 0; i < temp.length; i++) {
            let meta = JSON.parse(temp[i].metadata);
            if (meta && meta.image) {
                if (meta.image.includes(".")) {
                    temp[i].image = meta.image;
                }
                else {
                    temp[i].image = "https://ipfs.moralis.io:2053/ipfs/" + meta.image;
                }
            }
        }
        setNfts(temp);
        setFilteredNfts(temp);
    }

    useEffect(() => {
        if (nameFilter.length == 0) {
            return setFilteredNfts(nfts);
        } else {
            let filteredArr = [];
            for (let i = 0; i < nfts.length; i++) {
                console.log(nfts[i].name);
                if (nfts[i].name && nfts[i].name.toLowerCase().startsWith(nameFilter)) {
                    filteredArr.push(nfts[i]);
                }
                setFilteredNfts(filteredArr);
            }
        }
    }, [nameFilter]);

    return (
        <>
            <div className='tabHeading'>
                <Button text='Get NFTs' onClick={getNftBalance}></Button>
            </div>
            <div className='filters'>
                <Input
                    id='NameFilter'
                    label='Filter NFTs by name'
                    labelBgColor='rgb(33, 33, 38)'
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
            </div>
            <div className='nftList'>
                {isFetched ?
                    filteredNfts.map((e) => {
                        return (
                            <>
                                <div className='nftInfo'>
                                    <div>Name: {e.name} </div>
                                    <div>#{e.token_id.slice(0, 5)}</div>
                                    {e.image && <img src={e.image} width={200}></img>}
                                </div>
                            </>
                        )
                    })
                    :
                    <h2>No NFTs yet</h2>
                }
            </div>
        </>
    )
}

export default Nfts