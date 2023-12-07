# 🔮 Portals

Portals is a cross-chain marketplace for content NFTs with built-in access control. Imagine owning and trading exclusive content, from music and art to virtual land and access passes, while maintaining complete control over who can access it, even across different blockchains.

---

## How it's Works 🛠️

There are two contracts deployed Router and Portals

Router is a CCIP and ILogInterface Compatible Contract that performs upkeep and Cross chain transfer

Portals is a Function Capable ERC-721 Contract the holds the NFTs, here are the deployed Address and Chainlink Subscriptions

#### Avalanche Fuji

**Router** - 0x624A9104f594b943254620d19371212C7Aa2a3a8
**Portals** - 0x15A552010D8bba68034EC4E8Fcc2CfDaFc0DE8E9
**Functions Subscription** - https://functions.chain.link/fuji/1516
**Automation Subscription** - https://automation.chain.link/fuji/10013484446831437677184902378559614187621707955900795943372880151634859699701

#### Polygon Mumbai

**Router** - 0x67bd320CF5B75e04694F4c84Aa8898c6B9DeB30a
**Portals** - 0xF66fdE3208b0855EE97035bF28112d383CdAD86e
**Functions Subscription** - https://functions.chain.link/mumbai/979
**Automation Subscription** - https://automation.chain.link/mumbai/53852294395387212749523118815082309718236198448956367777703582160615461456762

### Minting Content NFTs

Content creators can mint NFTs on any Chainlink CCIP supported blockchain, including Polygon Mumbai, Avalanche Fuji and more. First they have to select the Content File they have to mint as NFT. That Content File will be encrypted using Lit Protocol using Access Control Conditions as the Owner of that Token, and then the Encrypted Content File will be uploaded to IPFS. Then the NFT will be minted on the selected blockchain.

### Cross Chain Transfer

Once the Owner of the NFT wants to transfer the NFT to another blockchain, they can initiate a Cross Chain Transfer. First the user NFT will be transferred to a Dump Address which can be burnt after the transfer is completed. Then the user will be asked to select the blockchain to which they want to transfer the NFT.

The transaction will trigger Chainlink CCIP and sent the data as the URI of the NFT and the address to transfer the NFT. A new NFT will be minted on the selected blockchain.

Once the NFT is Minted and event `CrossChainMintSuccess` will be Emitted with the details of the NFT and the blockchain to which it is transferred. This will trigger the Chainlink Upkeep which will start an Automation.

This Automation call will call a Chainlink Function which will call an API will the details of the newly minted NFT and the blockchain to which it is transferred. The API will update the Access Control Conditions for the NFT and return the new Hash. This hash will be updated as the Token URI for the new NFT, ensuring that the new NFT content is only accessible to the new owner on a new chain.

---

## Screenshots 📸

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/pzLkfZ9/SCR-20231208-cymw.png" alt="Homepage" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/zNWW81f/SCR-20231208-cysi.png" alt="Create NFT" >
    </td>
  </tr>
</table>

<table>
  <tr>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/TcK3qyH/SCR-20231208-cyyh.png" alt="SCR-20231208-cyyh" alt="Transfer NFT" >
    </td>
    <td valign="top" width="50%">
      <br>
      <img src="https://i.ibb.co/2MKQKyr/SCR-20231208-czao.png" alt="Cross Chain Transfer" >
    </td>
  </tr>
</table>

---

## Video Demo 🎥

![Portals](https://i.ibb.co/5xD7fXY/OG.png)

---

## Tech Stack 💻

- [Chainlink CCIP](https://dev.chain.link/products/ccip) - Cross Chain Interoperability
- [Chainlink Automation](https://dev.chain.link/products/automation) - Automation
- [Chainlink Functions](https://dev.chain.link/products/functions) - External API calls
- [Avalanche](https://www.avax.network/) - Smart Contracts
- [Lit Protocol](https://litprotocol.com/) - Content Encryption
- [thirdweb](https://thirdweb.com/) - Wallet Connection + Smart Contracts
- [antd](https://ant.design/) - UI Design
- [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) - Front-end

## Getting Started 🚀

### 📝 Smart Contract

To get started with Portals smart contracts, follow these steps:

1. Navigate to the `contracts` directory and locate the contracts under the `src` folder.
2. Install the necessary dependencies by running the following command:
   ```bash
   forge install && pnpm install
   ```
   Set the required Environment Variables
3. To run deploy script, you can run the following command

   ```bash
   # Avalanche
   forge script script/Portals.s.sol:PortalsScriptFuji --rpc-url $FUJI_RPC --broadcast --verify -vvvv

   # Polygon Mumbai
   forge script script/Portals.s.sol:PortalsScriptMumbai --rpc-url $MUMBAI_RPC --broadcast --verify -vvvv
   ```

4. You also need to set up Automation Upkeep and Functions Subscriptions for each chain before running the script and updating the Constructor Arguments.

---

### 📱 Axiom Frontend

To get started with the Frontend app, follow these steps:
Navigate to the `app` directory and install the necessary dependencies by running the following command:

```bash
pnpm install
```

Create a new file called `.env.local` in the root directory of the `app`. Fill out all the required environment variables as per the `.env.example` file.

Once you have filled in the environment variables in the `.env.local` file, you can start the development server by running the following command:

```bash
pnpm run dev
```

Open your web browser and navigate to http://localhost:3000 to access the Portals app.

By following these steps, you will be able to set up and run the Portals front-end app on your local development environment.

---
