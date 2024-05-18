// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CommunityTips {
    struct Tip {
        string content;
        address submitter;
        uint256 upvotes;
    }

    Tip[] public tips;
    mapping(address => uint256[]) public addressToTips;
    uint256 public votingFee = 0.069 ether;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function submitTip(string memory _content) public {
        tips.push(Tip({
            content: _content,
            submitter: msg.sender,
            upvotes: 0
        }));
        addressToTips[msg.sender].push(tips.length - 1);
    }

    function upvoteTip(uint256 _index) public payable {
        require(msg.value == votingFee, "Upvoting requires 0.069 AVAX");
        tips[_index].upvotes += 1;
    }

    function getTips() public view returns (Tip[] memory) {
        return tips;
    }

    function getTipsByAddress(address _address) public view returns (Tip[] memory) {
        uint256[] storage tipIndexes = addressToTips[_address];
        Tip[] memory userTips = new Tip[](tipIndexes.length);
        for (uint256 i = 0; i < tipIndexes.length; i++) {
            userTips[i] = tips[tipIndexes[i]];
        }
        return userTips;
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
