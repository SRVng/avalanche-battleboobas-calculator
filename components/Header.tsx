import React from 'react';
import Head from 'next/head';

const Header = ({ title, keywords, description}: any) => {
    return (
        <Head>
            <meta 
                name='viewport'
                content='width=device-width' />
            <meta
                name='keywords'
                content={keywords} />
            <meta
                name='description'
                content={description} />
            <meta charSet='utf-8' />
            <link rel='icon' href='/favicon.ico' />
            <title>{title}</title>
        </Head>
    )
}

Header.defaultProps = {
    title: 'BattleBoobas Calculator',
    keywords: 'BattleBoobas, BattleBooties, BattlePussies, battleboobas, battlebooties, battlepussies, nft, avalanche, avax',
    description: 'Calculator for BattleBoobas NFT project on Avalanche'
}

export default Header
