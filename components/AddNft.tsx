import React from 'react';
import AddModal from './AddModal';
import RewardAmount from './RewardAmount';
import styles from '../styles/AddNft.module.css';
import Select, { ActionMeta, SingleValue } from 'react-select';
import Image from 'next/image';
import About from './About';
import { server } from '../config';

const AddNft = (props: {tokenDetails: {name: string, price: string}}) => {

    const [nftList, updateNftList] = React.useState([{
        id: 0,
        tier: '',
        size: '',
        prestige: '',
    }]);

    return (
        <div>
            <div className={styles.menu}>
                <NftSelection tokenPrice={props.tokenDetails.price} nftList={nftList} updateNftList={updateNftList}/>
                <NFTCalculate nftList={nftList} tokenDetails={props.tokenDetails} />
                <About />
            </div>
            {
                nftList.length === 1 ? null 
                : <ShowNftList nftList={nftList} updateNftList={updateNftList} inModal={false} />
            }
        </div>
    )
}

interface NftSelectionProps {
    tokenPrice: string
    nftList: {
        id: number
        tier: string
        size: string
        prestige: string
    }[]
    updateNftList: Function
}

const NftSelection = (props: NftSelectionProps) => {

    const nftList = props.nftList;
    const updateNftList = props.updateNftList;

    const [tier, setTier] = React.useState({value: 'Silver', label: 'Silver'});
    const [size, setSize] = React.useState({value: 'Small', label: 'Small'});
    const [prestige, setPrestige] = React.useState('0');

    const [isOpen, setIsOpen] = React.useState(false);

    const tierList = [
        {value: "Silver", label: "Silver"},
        {value: "Gold", label: "Gold"},
        {value: "Diamond", label:"Diamond"},
        {value: "Emerald", label:"Emerald"},
        {value: "Legendary", label: "Legendary"},
    ];

    const sizeList = [
        {value: "Small", label: "Small"},
        {value: "Medium", label: "Medium"},
        {value: "Large", label: "Large"},
        {value: "Giga", label: "Giga"},
    ];

    const handlePrestigeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!Number.isNaN(parseInt(e.target.value))) {
            const value = parseInt(e.target.value).toString();
            setPrestige(value);
        } else {
            setPrestige('0')
        }
    };

    const handleSubmit = (e: React.SyntheticEvent) => {

        updateNftList([
            ...nftList,
            {
                id: nftList.at(-1)!.id + 1,
                tier: tier.value,
                size: size.value,
                prestige,
            }
        ]);

        e.preventDefault();
    };

    const modalCss = {
        content: {
          top: '100px',
          left: '200px',
          right: '200px',
          bottom: '80px',
          overflow: 'auto',
          border: '20px',
          background: 'linear-gradient(90deg, rgba(208,207,214,1) 0%, rgba(249,230,138,1) 35%, rgba(255,217,0,1) 100%)',
          borderRadius: '20px',
          padding: '20px 30px'
        }
    }

  return (
    <AddModal text='Add NFT' css={modalCss} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={styles.modalpage}>
            <h2>Add your NFT</h2>
        <form onSubmit={handleSubmit}>
            <div className={styles.nftselectbox}>
            <NFTReactSelectBox
                name='tier'
                list={tierList}
                nftDetails={tier}
                updateNftDetails={setTier} />
            <NFTReactSelectBox
                name='size'
                list={sizeList}
                nftDetails={size}
                updateNftDetails={setSize} />
            <h4>Select your prestige</h4>
            <input type='number' value={prestige} onChange={handlePrestigeChange}/> <br/><br/>
            &nbsp; <button type='submit'>Add</button>
        </div>
        </form>
        <ShowNftList nftList={nftList} updateNftList={updateNftList} inModal={true}/>
        </div>
    </AddModal>
  )
};

interface NFTCalculateProps {
    tokenDetails: {
        name: string
        price: string
    }
    nftList: {
        id: number
        tier: string
        size: string
        prestige: string
    }[]
}

const NFTCalculate = (props: NFTCalculateProps) => {

    const [isCalculateOpen, setIsCalculateOpen] = React.useState(false);

    const modalCss = {
        content: {
          top: '100px',
          left: '200px',
          right: '200px',
          bottom: '80px',
          overflow: 'auto',
          border: '20px',
          background: 'linear-gradient(90deg, rgba(208,207,214,1) 0%, rgba(249,230,138,1) 35%, rgba(255,217,0,1) 100%)',
          borderRadius: '20px',
          padding: '20px 30px',
        }
    }

    return (
        <AddModal text='Calculate' css={modalCss} isOpen={isCalculateOpen} setIsOpen={setIsCalculateOpen}>
            <RewardAmount nftList={props.nftList} tokenDetails={props.tokenDetails} isCalculateOpen={isCalculateOpen} />
        </AddModal>
    )
}

interface NFTReactSelectBoxProps {
    name: string
    list: {
        value: string
    }[]
    nftDetails: {
        value: string
        label: string
    }
    updateNftDetails: Function
}

const NFTReactSelectBox = (props: NFTReactSelectBoxProps) => {

    type NftOptions = {
        value: string
    };

    const handleChange = (option: SingleValue<NftOptions>, actionMeta: ActionMeta<NftOptions>) => {
        props.updateNftDetails(option);
    };

    return (
        <div>
        <h4>Select your {props.name}</h4>
        <Select
            options={props.list}
            onChange={handleChange} />
        </div>
    );
}

interface ShowNftListProps {
    nftList: {
        id: number
        tier: string
        size: string
        prestige: string
    }[]
    updateNftList: Function
    inModal: boolean
};

const ShowNftList = (props: ShowNftListProps) => {
    const nftList = props.nftList;
    const updateNftList = props.updateNftList;

    const handleRemoveButton = (id: number) => {
        let removeIdNftList = nftList.filter((selected) => {
            return selected.id !== id
        });

        updateNftList(removeIdNftList);
    }

    return (
        <div>
            <ul>
            {
                props.inModal === true ?
                nftList.map(({id, tier, size, prestige}) => (
                    id >= 1 ?
                    <div key={id}>
                        <div key={'nftList_' + id}>
                            <li key={id}>
                                Id: {id}, {tier} ninja with {size} boobas and {prestige} prestige
                                &nbsp; <button key={'button_' + id}    onClick={() => {handleRemoveButton(id)}}>Remove</button> 
                            </li>
                        </div>
                    </div>
                    : null
                ))

                :
                <table className={styles.nftListTable}>
                    <thead>
                    <tr>
                        <th>Tier</th>
                        <th>Size</th>
                        <th>Prestige</th>
                    </tr>
                    </thead>
                    <tbody>
                    {nftList.map(({id, tier, size, prestige}) => (
                    id >= 1?
                    <tr key={id}>
                        <td>
                            <ShowTierImage tier={tier} />
                        </td>
                        <td>{size}</td>
                        <td>{prestige}</td>
                    </tr>
                    : null
                    
                    ))}
                    </tbody>
                </table> 
            }
            </ul>
        </div>
    )
}

const ShowTierImage = (props: {tier: string}) => {
    return (
        <Image
            src={`${server}/tierImage/${props.tier.toUpperCase()}.png`}
            alt="" 
            width="150"
            height="150" />
    )
}

export default AddNft;
