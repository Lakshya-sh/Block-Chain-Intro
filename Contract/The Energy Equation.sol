// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Project {
    string public projectName = "The Energy Equation: Sustainable Consensus Mechanisms for Tomorrow's Blockchain";
    address public owner;
    uint public totalVotes;
    
    mapping(address => bool) public hasVoted;
    mapping(string => uint) public proposals;

    constructor() {
        owner = msg.sender;
        proposals["Proof of Stake"] = 0;
        proposals["Proof of Authority"] = 0;
        proposals["Proof of Green"] = 0;
    }

    // Function 1: Vote for a proposal
    function vote(string memory proposal) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(proposals[proposal] >= 0, "Proposal not valid");

        proposals[proposal]++;
        hasVoted[msg.sender] = true;
        totalVotes++;
    }

    // Function 2: Get vote count for a proposal
    function getVotes(string memory proposal) public view returns (uint) {
        return proposals[proposal];
    }

    // Function 3: Reset votes (owner only)
    function resetVotes() public {
        require(msg.sender == owner, "Only owner can reset votes");

        proposals["Proof of Stake"] = 0;
        proposals["Proof of Authority"] = 0;
        proposals["Proof of Green"] = 0;
        totalVotes = 0;
    }
}
