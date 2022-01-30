import React from 'react';
import { server } from '../config';
import styles from '../styles/RewardAmount.module.css';

interface RewardAmountProps {
  nftList: {
    id: number,
    tier: string
    size: string,
    prestige: string,
  }[]
  tokenDetails: {
    name: string
    price: string
  }
  isCalculateOpen: boolean
}

const RewardAmount = (props: RewardAmountProps) => {

  const [reward, setReward] = React.useState(0);

  const handleOnOpen = () => {

    setReward(0);

    props.nftList.map(({id, tier, size, prestige}) => {

      const getReward = async () => {
        const calculatedReward = await fetchReward(id, tier, size, prestige)
        if (id !== 0 && calculatedReward !== undefined) {
          setReward((prevReward) => prevReward + calculatedReward)
        }
      }

      getReward();
    })
  }

  React.useEffect(() => {
    if (props.isCalculateOpen) {
      handleOnOpen();
    }
  }, [])

  return (
    <div className={styles.container}>
      <h2>Your Reward</h2>
      <div className={styles.rewardResult}>
      &nbsp; 
        <table>
          <thead>
          <tr className={styles.rewardResultTopic}>
            <th>Time Horizon</th>
            <th>MILK</th>
            <th>USD</th>
          </tr>
          </thead>
          <tbody>
          <ShowReward header='Hourly' horizon='h' reward={reward} tokenPrice={props.tokenDetails.price} />
          <ShowReward header='Daily' horizon='d' reward={reward} tokenPrice={props.tokenDetails.price} />
          <ShowReward header='Weekly' horizon='w' reward={reward} tokenPrice={props.tokenDetails.price} />
          <ShowReward header='Monthly' horizon='M' reward={reward} tokenPrice={props.tokenDetails.price} />
          </tbody>
        </table> 
        <p>Today ${props.tokenDetails.name} Price: ${parseFloat(props.tokenDetails.price).toFixed(6)}</p>
      </div>
    </div>
  );
};

interface ShowRewardProps {
  header: string
  horizon: string
  reward: number
  tokenPrice: string
}

const ShowReward = (props: ShowRewardProps) => {
  return (
    <tr>
      <td>{props.header}</td>
      <td>{timeHorizonReward(props.horizon, props.reward, props.tokenPrice, false)}</td>
      <td>{timeHorizonReward(props.horizon, props.reward, props.tokenPrice, true)}</td>
    </tr>
  )
}

const fetchReward = async (id: number, tier: string, size: string, prestige: string) => {

  const apiList = ['tier', 'size'];
  const propList = [tier, size];

  if (id >= 1) {

    let reward = {
      milk: 0,
      sizeMultiplier: 0,
      prestigeMultiplier: 0
    };

    for (let i in propList) {
      const res = await fetch(`${server}/api/${apiList[i]}/${propList[i]}`);
      const val = await res.json();

      apiList[i] == 'tier' 
        ? reward.milk = val.at(0).milk 
        : reward.sizeMultiplier = val.at(0).multiplier
      
      reward.prestigeMultiplier = parseInt(prestige) + 1
    }

    return calculateReward(reward)
  }
}

const calculateReward = async (
  reward: {
    milk: number,
    sizeMultiplier: number,
    prestigeMultiplier: number
  }
) => {
  const result = reward.milk * reward.sizeMultiplier * reward.prestigeMultiplier
  return result;
}

const timeHorizonReward = (
  horizon: string,
  reward: number,
  tokenPrice: string,
  inUSD: boolean
  ) => {

    let timeHorizon;

    switch (horizon) {
      case 'h': {
        timeHorizon = 24;

        if (inUSD) {
          return "$" + ((reward / timeHorizon) * parseFloat(tokenPrice)).toFixed(4)
        } else {
          return (reward / timeHorizon)
        }
      }
      case 'd': {
        if (inUSD) {
          return "$" + (reward * parseFloat(tokenPrice)).toFixed(4)
        } else {
          return reward
        }
      }
      case 'w': {
        timeHorizon = 7;

        if (inUSD) {
          return "$" + ((reward * timeHorizon) * parseFloat(tokenPrice)).toFixed(4)
        } else {
          return (reward * timeHorizon)
        }
      }
      case 'M': {
        timeHorizon = 30;

        if (inUSD) {
          return "$" + ((reward * timeHorizon) * parseFloat(tokenPrice)).toFixed(4)
        } else {
          return (reward * timeHorizon)
        }
      }
    }
}

export default RewardAmount;
