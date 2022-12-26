// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Funder {
    address[] public numOforg;
    mapping(address => uint256) private funders;
    uint256 public total_fund;
    uint256 public num = 1;
    mapping(uint256 => address) public organizations;
    uint256[] public org_id;

    function transfer() external payable {}

    function Add_Fund(address payable _addr) external payable {
        // require(msg.value >= 1 ether);
        _addr.transfer(msg.value);
    }

    function get_org() public view returns (uint256) {
        return num;
    }

    function Add_Project(uint256 id) external {
        bool check = true;
        for (uint256 i = 0; i < numOforg.length; i++) {
            if (msg.sender == numOforg[i]) {
                check = false;
            }
        }
        require(check == true, "Project already exists");
        numOforg.push(msg.sender);
        org_id.push(num);
        organizations[id] = msg.sender;
        num += 1;
    }

    function get_fund() public view returns (uint256) {
        return address(msg.sender).balance;
    }
    
    function get_organ() public view returns(uint256[] memory){
        return org_id;
    }
    
    function withdraw(uint256 withdrawAmount) external {
        require(
            withdrawAmount <= 11000000000000000000,
            "Cannot withdraw more than 3 ether"
        );
        payable(msg.sender).transfer(withdrawAmount);
    }
}
