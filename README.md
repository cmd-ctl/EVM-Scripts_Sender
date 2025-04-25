# Native Token Sender - Documentation

## Overview
This Node.js script allows you to send native tokens (ETH, BNB, MATIC, etc.) to multiple addresses from a single wallet. It reads recipient addresses from a text file and sends the specified amount to each address sequentially.

## Requirements
- Node.js (v16 or higher)
- ethers.js library (v6)
- An RPC endpoint for your blockchain network
- Sufficient funds in the sender wallet

## Installation
1. Clone or download the repository
2. Install dependencies:
```bash
npm install ethers
```

## Configuration
Edit the following constants at the top of the script:

```javascript
const RPC_URL = 'https://node.com'; // Replace with your RPC endpoint
const PRIVATE_KEY = 'f61169d87a6e3b4854bcf697'; // Replace with your wallet private key
const AMOUNT_TO_SEND = '0.075'; // Amount to send to each recipient (in native token)
```

## Usage

### 1. Prepare recipient file
Create a file named `recipients.txt` in the same directory as the script, with one Ethereum-compatible address per line:

```
0xAddress1
0xAddress2
0xAddress3
```

### 2. Run the script
```bash
node sendTokens.js
```

### 3. Output
The script will:
- Display sending progress in the console
- Show transaction hashes for successful sends
- Report any errors encountered
- Output "FIN" when complete

## Functions

### `loadRecipients(filename)`
Loads and parses the recipient addresses file.

**Parameters:**
- `filename`: Path to the text file containing recipient addresses

**Returns:**
- Array of trimmed, non-empty addresses

### `sendNativeTokens()`
Main function that:
1. Loads recipients from file
2. Iterates through each address
3. Sends the specified amount of native token
4. Waits for transaction confirmation
5. Logs results to console

## Example Output
```
Sending 0.075 COIN to 3 addresses...
✅ Sent 0.075 COIN to 0xAddress1. TX: 0x123...abc
✅ Sent 0.075 COIN to 0xAddress2. TX: 0x456...def
ERROR on sending to 0xAddress3: Error: insufficient funds...
...FIN.
```

## ---
This script is provided as-is without warranty. Use at your own risk.
