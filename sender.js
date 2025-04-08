
const { ethers } = require('ethers');
const fs = require('fs');

const RPC_URL = 'https://node.com'; // RPC 
const PRIVATE_KEY = 'f61169d87a6e3b4854bcf697'; // Sender Private key
const AMOUNT_TO_SEND = '0.075'; // amount to send

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// recipients list
const loadRecipients = (filename) => {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return data.split('\n').map(line => line.trim()).filter(line => line);
    } catch (error) {
        console.error('Read file ERROR:', error);
        return [];
    }
};

async function sendNativeTokens() {
    const recipients = loadRecipients('recipients.txt');
    
    if (recipients.length === 0) {
        console.log('No file or no recipients.');
        return;
    }

    console.log(`Sending ${AMOUNT_TO_SEND} COIN to ${recipients.length} addresses...`);

    for (let address of recipients) {
        try {
            const tx = await wallet.sendTransaction({
                to: address,
                value: ethers.parseEther(AMOUNT_TO_SEND) 
            });
            console.log(`✅ Sent ${AMOUNT_TO_SEND} COIN to ${address}. TX: ${tx.hash}`);
            await tx.wait();
        } catch (error) {
            console.error(`ERROR on sending to ${address}:`, error);
        }
    }

    console.log('...FIN.');
}

sendNativeTokens().catch(console.error);
