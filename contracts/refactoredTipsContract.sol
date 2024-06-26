// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TipsContract {
    struct Tip {
        uint id;
        address payable author;
        string content;
        uint upvotes;
        uint downvotes;
    }

    mapping(uint => Tip) public tips;
    mapping(address => uint) public votes;
    uint public tipsCount;
    uint public constant UPLOAD_COST = 0.69 ether;
    uint public constant VOTE_COST = 0.069 ether;

    address public owner;

     modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    event TipUploaded(uint id, address author, string content);
    event Voted(uint id, bool upvote);

    function uploadTip(string memory content) public payable {
        

        tipsCount++;
        tips[tipsCount] = Tip(tipsCount, payable(msg.sender), content, 0, 0);
        
        emit TipUploaded(tipsCount, msg.sender, content);
    }

    function vote(uint id, bool upvote) public payable {
        require(msg.value == VOTE_COST, "Send More");
        require(votes[msg.sender] < 3, "Exceeded daily vote limit, come back tomorrow or `${add time stamp}`");


        //add off chain option here
        Tip storage tip = tips[id];
        require(tip.id != 0, "Tip does not exist");

        votes[msg.sender]++;
        if (upvote) {
            tip.upvotes++;
        } else {
            tip.downvotes++;
        }

        emit Voted(id, upvote);
    }

    function getTopTips() public view returns (Tip[] memory) {
        Tip[] memory topTips = new Tip[](10);
        for (uint i = 1; i <= tipsCount && i <= 10; i++) {
            topTips[i - 1] = tips[i];
        }
        return topTips;
    }
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
}
}