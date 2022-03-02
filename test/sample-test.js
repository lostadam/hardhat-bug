const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  let greeter;
  before("Deploy the Contract", async () => {
    const Greeter = await ethers.getContractFactory("Greeter");
    greeter = await Greeter.deploy();
    await greeter.deployed();
  });

  // Won't revert
  it("Should revert when argument is int", async () =>
    expect(greeter.greet(1)).to.be.reverted);

  // Won't revert
  it("Should revert when argument is an array", async () =>
    expect(greeter.greet([])).to.be.reverted);

  // Will revert
  it("Should revert when argument is string", async () =>
    expect(greeter.greet("")).to.be.reverted);

  // Will revert
  it("Should revert when argument is an object", async () =>
    expect(greeter.greet({})).to.be.reverted);

  // Will revert
  it("Should revert when argument is float", async () =>
    expect(greeter.greet(1.2)).to.be.reverted);

  it("Should return 0 when passed bytes", async () =>
    // Addresses are valid bytes
    expect(await greeter.greet(ethers.constants.AddressZero)).to.equal(0));
});
