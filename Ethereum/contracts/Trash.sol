// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Trash {
    struct location_detail {
        string longitude;
        string latitude;
        string time;
    }
    mapping(address => location_detail[]) public Data;
    location_detail[] all_loc;

    function Location_Add(
        string memory longitude,
        string memory latitude,
        string memory time
    ) external {
        location_detail memory d;
        d.longitude = longitude;
        d.latitude = latitude;
        d.time = time;
        Data[msg.sender].push(d);
        all_loc.push(d);
    }

    function Get_locations() public view returns (location_detail[] memory){
        return all_loc;
    }
   
}
