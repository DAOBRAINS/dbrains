
""" from brownie import DBRAINSNTT, accounts, network
from dotenv import load_dotenv
import os

load_dotenv()

def main():
    if network.show_active() != "development":
        pk = os.getenv('PRIVATE_KEY')
        accounts.add(pk)
    print("accounts[0] = ", accounts[0])
    print("balance accounts[0] = ", accounts[0].balance())
    print("chain =", network.chain)

    dbrtoken = DBRAINSNTT.deploy({"from": accounts[0]})
    print("DBR token deployed at ", dbrtoken)

    #brownie run deploy_DBR.py --network polygon-mumbai """

""" (base) bruno@gram:~/Documents/DBRAINS/dbrains$ brownie run deploy_DBR.py --network polygon-mumbai
Brownie v1.19.1 - Python development framework for Ethereum

DbrainsProject is the active project.

Running 'scripts/deploy_DBR.py::main'...
accounts[0] =  0xE60930Dd528485BA57F4a17b02209877C2A9bFaC
balance accounts[0] =  4167353387787454269
chain = <Chain object (chainid=80001, height=35266918)>
Transaction sent: 0xeb8d46b52a2cb55122bbed5fadd067407f29c5b85527bc65a791d2d2c1104003
  Gas price: 1.500000016 gwei   Gas limit: 820146   Nonce: 4
  DBRAINSNTT.constructor confirmed   Block: 35266921   Gas used: 745588 (90.91%)
  DBRAINSNTT deployed at: 0x8D60bA6B9F9e47C464F54C28744bD0ce5F180deF

DBR token deployed at  0x8D60bA6B9F9e47C464F54C28744bD0ce5F180deF """
