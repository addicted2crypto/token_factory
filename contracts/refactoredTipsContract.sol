// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TipsContract {
    struct Tip {
        uint id;
        address payable author;
        string content;
        uint upvotes;
        uint downvotes;
        // add delete
        // uint deleteVotes;
    }

    mapping(uint => Tip) public tips;
    mapping(address => uint) public votes;
    uint public tipsCount;
    uint public  UPLOAD_COST = 0.69 ether;
    uint public  VOTE_COST = 0.069 ether;

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
  
  function sortTipsByUpvotes(Tip[] memory tipsArray) internal pure {
    uint256 n = tipsArray.length;
    for(uint256 i = 0; i < n; i++) {
        for(uint256 j = i + 1; j < n; j++) {
            if(tipsArray[i].upvotes < tipsArray[j].upvotes) {
                Tip memory temp = tipsArray[i];
                tipsArray[i] = tipsArray[j];
                tipsArray[j] = temp;
            }
        }
    }
}

    function getTopTips() public view returns (Tip[] memory) {
        Tip[] memory allTips = new Tip[](tipsCount);
        for (uint i = 0; i < tipsCount; i++) {
            allTips[i] = tips[i + 1];
        }
        sortTipsByUpvotes(allTips);
    
        Tip[] memory top10Tips = new Tip[](tipsCount > 10 ? 10 : tipsCount);
        for (uint i = 0; i < top10Tips.length; i++) {
            top10Tips[i] = allTips[i];
        }
        return top10Tips;
    }

     function getTop90Tips() public view returns (Tip[] memory) {
        Tip[] memory allTips = new Tip[](tipsCount);
        for(uint i = 0; i < tipsCount; i++){
            allTips[i] = tips[i + 1];
        }

        sortTipsByUpvotes(allTips);

        uint next90Length = tipsCount > 10 ? 90 : (tipsCount > 10 ? tipsCount - 10 : 0);
        Tip[] memory next90Tips = new Tip[](next90Length);
        for (uint i = 0; i < next90Tips.length; i++) {
            next90Tips[i] = allTips[i + 10];
        }
        return next90Tips;
     }
    // add setCost to contract abi
    function setCost(uint256 newCost) public onlyOwner {
        UPLOAD_COST = newCost;
        VOTE_COST = newCost;
    }
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
}


}