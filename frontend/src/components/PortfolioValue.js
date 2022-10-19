import React, { useEffect } from 'react'
import { useState } from 'react';
import "../App.css";

function PortfolioValue({ nativeValue, tokens }) {
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        let tval = 0;
        for (let i = 0; i < tokens.length; i++) {
            tval += Number(tokens[i].val)
        }
        tval = tval + Number(nativeValue);
        setTotalValue(tval.toFixed(2));
    }, [nativeValue,tokens]); //dependency array: useEffect renders the page only when the values in dependency array change

    return (
        <>
            <div className='totalValue'>
                <h3>Portfolio Token Value</h3>
                <h2>
                    ${totalValue}
                </h2>
            </div>
        </>
    )
}

export default PortfolioValue