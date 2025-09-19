const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const abi = [
  {
    "inputs":[{"internalType":"string","name":"proposal","type":"string"}],
    "name":"vote",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"string","name":"proposal","type":"string"}],
    "name":"getVotes",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  }
];

let provider, signer, contract;

async function connectContract() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
    updateVotes();
  } else {
    alert("Please install MetaMask!");
  }
}

async function vote(proposal) {
  await contract.vote(proposal);
  alert("Vote submitted for " + proposal);
  updateVotes();
}

async function updateVotes() {
  document.getElementById("pos").innerText = (await contract.getVotes("Proof of Stake")).toString();
  document.getElementById("poa").innerText = (await contract.getVotes("Proof of Authority")).toString();
  document.getElementById("pog").innerText = (await contract.getVotes("Proof of Green")).toString();
}

connectContract();

