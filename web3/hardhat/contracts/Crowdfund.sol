//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

error NotEnoughETHDonation();
error NotEnoughBalance();
error FailedToSendNativeToken();

contract Crowdfund is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public token;
    uint256 public startsAt;
    uint256 public endsAt;
    uint256 public goal;
    bytes public metaPtr;

    bool public canRefund;

    mapping(address => uint256) userFunds;

    event Donated(address sender, uint256 amount);
    event Funded(address to, uint256 amount);
    event RefundActive(bool refunding);
    event UserBalanceWithdrawn(address user, uint256 balance);

    modifier crowfundingEnded() {
        require(!hasCrowdfundingEnded(), "Crowd funding hasn't ended");
        _;
    }

    constructor(bytes memory meta) {
        // pass data to constructor for new matchingPool
        (
            address safe,
            address _token,
            uint256 _startsAt,
            uint256 _endsAt,
            uint256 _goal,
            bytes memory _metaPtr
        ) = abi.decode(
                meta,
                (address, address, uint256, uint256, uint256, bytes)
            );

        _transferOwnership(safe);
        if (_token != address(0)) {
            token = IERC20(_token);
        }
        startsAt = _startsAt;
        endsAt = _endsAt;
        goal = _goal;
        metaPtr = _metaPtr;
    }

    // editCrowdfund

    function donate(uint256 amount) public payable {
        uint256 _donatedAmount = msg.value;
        if (tokenIsNative()) {
            // it's an ETH donation
            if (msg.value == 0) {
                revert NotEnoughETHDonation();
            }
        } else {
            // it's ERC20 donation
            // transfer amount to this contract
            token.safeTransferFrom(msg.sender, address(this), amount);
            _donatedAmount = amount;
        }

        // increase user balance
        userFunds[msg.sender] += _donatedAmount;

        emit Donated(msg.sender, _donatedAmount);
    }

    // enableRefund
    function enableRefund() public onlyOwner crowfundingEnded {
        canRefund = true;

        emit RefundActive(true);
    }

    // fund
    function fund() public onlyOwner nonReentrant {
        uint256 amount = address(this).balance;
        address to = owner();
        if (tokenIsNative()) {
            // withdraw native
            (bool sent, ) = to.call{value: amount}("");
            require(sent, "Failed to send Ether");
        } else {
            amount = token.balanceOf(address(this));
            token.safeTransferFrom(address(this), to, amount);
        }

        emit Funded(to, amount);
    }

    // withdraw
    function withdraw() public nonReentrant {
        uint256 amount = userFunds[msg.sender];

        userFunds[msg.sender] = 0;

        if (amount == 0) {
            revert NotEnoughBalance();
        }

        if (tokenIsNative()) {
            (bool sent, ) = msg.sender.call{value: amount}("");
            if (!sent) {
                revert FailedToSendNativeToken();
            }
        } else {
            token.safeTransferFrom(address(this), msg.sender, amount);
        }

        emit UserBalanceWithdrawn(msg.sender, amount);
    }

    function tokenIsNative() public view returns (bool) {
        return address(token) == address(0);
    }

    function hasCrowdfundingEnded() public view returns (bool) {
        return block.timestamp < endsAt;
    }
}
