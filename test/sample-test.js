const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  let greeter;
  let minter;
  before("Deploy the Contract", async () => {
    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy();
    await greeter.deployed();

    const [owner] = await ethers.getSigners();
    minter = owner.address;
  });

  // Won't revert
  it("Should revert when first argument is int", async () =>
    expect(greeter.greet(1, minter)).to.be.reverted);

  // Won't revert
  it("Should revert when first argument is an array", async () =>
    expect(greeter.greet([], minter)).to.be.reverted);

  // Will revert
  it("Should revert when first argument is string", async () =>
    expect(greeter.greet("", minter)).to.be.reverted);

  // Will revert
  it("Should revert when first argument is an object", async () =>
    expect(greeter.greet({}, minter)).to.be.reverted);

  // Will revert
  it("Should revert when first argument is float", async () =>
    expect(greeter.greet(1.2, minter)).to.be.reverted);

  it("Should return the second address when arguments are valid", async () =>
    // Addresses are valid byteCode
    expect(await greeter.greet(minter, minter)).to.equal(minter));
});
