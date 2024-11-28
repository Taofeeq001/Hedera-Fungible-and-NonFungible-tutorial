const {
    Client,
    PrivateKey,
    Hbar,
    AccountId,
    AccountCreateTransaction,
} = require("@hashgraph/sdk");

async function main() {

    //Create your local client
    const node = { "127.0.0.1:50200": new AccountId(3) }
    const client = Client.forNetwork(node).setMirrorNetwork("127.0.0.1:5600");

    //Set the transaction fee paying account
    client.setOperator(AccountId.fromString("0.0.2"), PrivateKey.fromString("302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137"));

    //Submit a transaction to your local node
    const newAccount = await new AccountCreateTransaction()
        .setKey(PrivateKey.fromString("302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137"))
        .setInitialBalance(new Hbar(1))
        .execute(client);

    //Get receipt
    const receipt = await newAccount.getReceipt(client);

    //Get the account ID
    const newAccountId = receipt.accountId;
    console.log(newAccountId);
}
void main();