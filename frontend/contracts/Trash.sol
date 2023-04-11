// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Trash {
    struct location_detail {
        uint id;
        uint frequency;
        string longitude;
        string latitude;
        string city;
        string day;
    }
    mapping(address => location_detail[]) public Data;
    location_detail[] all_loc_Unresolved;
    location_detail[] all_loc_resolved;
    location_detail[] all_loc;


    function Location_Add(
        uint id,
        string memory longitude,
        string memory latitude,
        string memory city,
        string memory day,
        uint frequency
    ) external {
        location_detail memory d;
        d.id = id;
        d.longitude = longitude;
        d.latitude = latitude;
        d.city = city;
        d.day = day;
        d.frequency = frequency;
        // Data[msg.sender].push(d);
        all_loc_Unresolved.push(d);
        all_loc.push(d);
    }

    function remove(uint256 index) public {
        require(index < all_loc_Unresolved.length, "Index out of Bound");
        for (uint256 i = index; i < all_loc_Unresolved.length - 1; i++) {
            all_loc_Unresolved[i] = all_loc_Unresolved[i + 1];
        }
        all_loc_Unresolved.pop();
    }

    function Update_Resolve(
        uint id,
        string memory long,
        string memory lat,
        string memory city,
        string memory day
    ) public {
        for (uint i = 0; i < all_loc_Unresolved.length; i++) {
            if (
                all_loc_Unresolved[i].id ==  id && 
                keccak256(abi.encodePacked((all_loc_Unresolved[i].longitude))) ==
                keccak256(abi.encodePacked((long))) &&
                keccak256(abi.encodePacked((all_loc_Unresolved[i].latitude))) ==
                keccak256(abi.encodePacked((lat))) &&
                keccak256(abi.encodePacked((all_loc_Unresolved[i].city))) ==
                keccak256(abi.encodePacked((city)))
            ) {
                location_detail memory d;
                d.id = id;
                d.longitude = long;
                d.latitude = lat;
                d.city = city;
                d.day = day;
                all_loc_resolved.push(d);
                remove(i);
            }
        }
    }

    function Get_locations_Unresolved() public view returns (location_detail[] memory) {
        return all_loc_Unresolved;
    }

     function Get_locations() public view returns (location_detail[] memory) {
        return all_loc;
    }

    function Get_locations_resolved() public view returns (location_detail[] memory) {
        return all_loc_resolved;
    }
}
