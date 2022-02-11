import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis';

export interface PriceProps {
    symbol: string
    address: string
    tokenDetails: {
        name: string
        price: string
    }
    updateTokenDetails: Function
}

const Price = (props: PriceProps) => {

    const tokenDetails = props.tokenDetails;
    const updateTokenDetails = props.updateTokenDetails;

    return (
        <div>
            <FetchPrice
                symbol={props.symbol}
                address={props.address}
                tokenDetails={tokenDetails}
                updateTokenDetails={updateTokenDetails} />           
        </div>
    )
}

type fetchPriceProps = {
    symbol: string,
    address: string,
    tokenDetails: {name: string, price: string},
    updateTokenDetails: Function
};

const FetchPrice = (props: fetchPriceProps) => {

    const Web3API = useMoralisWeb3Api();

    React.useEffect(() => {
        fetchPrice(props.address, Web3API).then((res) => {
            props.updateTokenDetails({
                name: props.symbol,
                price: res.price
            })
        })
        console.log("Price fetched")
    }, [])

    return (<></>);
}

const fetchPrice = async (address: string, Web3API: any) => {

    const options = {
        chain: "avalanche",
        date: (Date.now() / 1000).toFixed(0)
    };

    const block = await Web3API.native.getDateToBlock(options).block;

    const req = await Web3API.token.getTokenPrice({
        address: address,
        chain: "avalanche",
        exchange: "TraderJoe",
        to_block: block
    }); 

    return JSON.parse(
            JSON.stringify({
                price: req.usdPrice!
            })
        );
}

export default Price
