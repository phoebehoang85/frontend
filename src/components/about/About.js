import React from 'react'
import { images } from '../../constants'
import './About.css'
// <p className='top--description'>
//    Join our Telegram Group: <span><a  style={{color: "#00E5ED"}} href="https://t.me/" target="_blank">https://t.me/</a></span>
//    <br/>Follow our Twitter: <span><a style={{color: "#00E5ED"}} href="https://twitter.com/" target="_blank">https://twitter.com/</a></span>
//  </p>
const About = () => {
    return (
        <>
            <section className='about--section'>
                <div className='custom--container'>
                    <div className='about--wrapperbox'>
                        <div className='section--titlebox'>
                            <h2 className='section--title'><span className='colorText'>About us</span></h2>
                        </div>
                        <div className='about--contentbox'>
                            <p className='top--description'>
                                One of the most powerful feature of ink! Smart Contract in Substrate-based blockchains such as Aleph Zero is the ability to deploy
                                the contract code once and then unlimited number of smart contracts can be initialized at very low cost.
                                <br/><br/>
                                To demostrate the idea, we create a set of pre-deployed contract code and allow anyone to create smart contracts on
                                Aleph Zero with a few clicks.
                                <br/><br/>
                                We currently have:<br/>
                                - <strong>PSP22 (ERC20) Token Creator</strong><br />
                                - <strong>Free AZT Token Minting</strong><br />
                                - <strong>Token Tool: allow you to check token information, check balance of any account, transfer and burn tokens</strong>
                                <br/><br/>
                                We are working on:<br/>
                                - <strong>Farming Pool: allow token creators to create staking pool and token owners to earn more tokens</strong><br/>
                            </p>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About
