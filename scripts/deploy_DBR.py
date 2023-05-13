
from brownie import DBrainsToken, accounts, network
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

    dbrtoken = DBrainsToken.deploy({"from": accounts[0]},publish_source=True)
    print("DBR token deployed at ", dbrtoken)

    #brownie run deploy_DBR.py --network polygon-mumbai








""" 
last deployment:

(base) bruno@gram:~/Documents/DBRAINS/dbrains$ brownie run deploy_DBR.py --network polygon-mumbai
Brownie v1.19.1 - Python development framework for Ethereum

DbrainsProject is the active project.

Running 'scripts/deploy_DBR.py::main'...
accounts[0] =  0xE60930Dd528485BA57F4a17b02209877C2A9bFaC
balance accounts[0] =  4163483896246179693
chain = <Chain object (chainid=80001, height=35512056)>
Transaction sent: 0xcf28affb28d3cedebebfaa404795c5315f12a7ea5ea1c655e40b5050496fd288
  Gas price: 1.500000016 gwei   Gas limit: 2129740   Nonce: 6
  DBrainsToken.constructor confirmed   Block: 35512059   Gas used: 1936128 (90.91%)
  DBrainsToken deployed at: 0x80F40EceD8Aa7aF5b3b92DDb5C6CCC68C5A0b5BF

DBR token deployed at  0x80F40EceD8Aa7aF5b3b92DDb5C6CCC68C5A0b5BF




(base) bruno@gram:~/Documents/DBRAINS/dbrains$ brownie run deploy_DBR.py --network polygon-mumbai
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
