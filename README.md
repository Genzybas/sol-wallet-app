# Solana Wallet & Token Interaction

This project enables users to interact with the Solana blockchain, allowing them to:

- Fetch their **SOL balance** and **SPL token balances**.
- Send **SPL tokens** from their wallet to another address.
- Integrate these functionalities into a **Next.js app** using Solana's Web3 tools.

## Features

### 1. Fetch SOL Balance

- Retrieves and displays the user's **SOL balance** in their wallet.
- Converts lamports to SOL for easy readability.
- Uses `useEffect` to update balance upon connection.

### 2. Fetch SPL Token Balances

- Retrieves the list of **SPL tokens** owned by the wallet.
- Uses `getParsedTokenAccountsByOwner` to get token details.
- Displays each token's **mint address** and **balance**.

### 3. Send SPL Tokens (`sendToken.ts`)

- Transfers **SPL tokens** from the connected wallet to another address.
- Uses `getOrCreateAssociatedTokenAccount` to ensure recipient can receive tokens.
- Uses `transfer` from `@solana/spl-token` to send tokens.
- Handles transaction confirmation using `sendAndConfirmTransaction`.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js & npm/yarn
- Next.js
- Solana CLI (optional for testing)
- Wallet Adapter Dependencies

### Installation Steps

```sh
# Clone the repository
git clone https://github.com/genzybas/sol-wallet-dapp.git
cd solana-wallet-app

# Install dependencies
yarn install  # or npm install
```

## Usage

### Running the App

```sh
yarn dev  # or npm run dev
```

### Connecting Wallet

1. Click **Connect Wallet**.
2. Approve the connection in your Solana wallet (e.g., Phantom).
3. View your wallet address and balances.

### Sending Tokens

1. Enter the **recipient's wallet address**.
2. Specify the **amount** to send.
3. Click **Send Token** and approve the transaction.

## File Structure

```
/src
 ├── app
 │   ├── page.tsx  # Home page with wallet & balance display
 │   ├── components
 │   │   ├── Wallet.tsx  # Wallet connection logic
 │   │   ├── TokenList.tsx  # Token balances display
 ├── utils
 │   ├── sendToken.ts  # Token transfer function
```

## Tech Stack

- **Next.js** (React Framework)
- **Solana Web3.js** (`@solana/web3.js`)
- **Solana Wallet Adapter** (`@solana/wallet-adapter-react`)
- **Tailwind CSS** (UI Styling)

## Future Enhancements

- UI improvements with **Tailwind**.
- Add **transaction history** display.
- Implement **error handling** & notifications.

## License

MIT License

---

🚀 **Developed by Genzy Bassey**

