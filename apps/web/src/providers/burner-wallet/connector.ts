/*

Inspired/copied from previous work: 
https://github.com/scaffold-eth/se-2/blob/main/packages/nextjs/services/web3/wagmi-burner
 
*/

import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { Address, Chain, Connector } from "wagmi";
import { hardhat } from "wagmi/chains";

import { ConnectorData } from "wagmi";
import { loadWallet } from "./utils";
import { BurnerConnectorError, BurnerConnectorErrorList } from "./errors";

type BurnerConnectorOptions = {
  defaultChainId: number;
};

type BurnerConnectorData = ConnectorData<StaticJsonRpcProvider>;

export const burnerWalletId = "burner-wallet";
export const burnerWalletName = "Burner Wallet";
export const defaultBurnerChainId = hardhat.id;

export class BurnerConnector extends Connector<
  StaticJsonRpcProvider,
  BurnerConnectorOptions
> {
  readonly id = burnerWalletId;
  readonly name = burnerWalletName;
  readonly ready = true;

  private provider?: StaticJsonRpcProvider;

  private burnerWallet: Wallet | undefined;

  constructor(config: { chains?: Chain[]; options: BurnerConnectorOptions }) {
    super(config);
    this.burnerWallet = undefined;
  }

  async getProvider() {
    if (!this.provider) {
      const chain = this.getChainFromId();
      this.provider = new StaticJsonRpcProvider(chain.rpcUrls.default.http[0]);
    }
    return this.provider;
  }

  async connect(
    config?: { chainId?: number | undefined } | undefined
  ): Promise<Required<BurnerConnectorData>> {
    const chain = this.getChainFromId(config?.chainId);

    this.provider = new StaticJsonRpcProvider(chain.rpcUrls.default.http[0]);
    const account = await this.getAccount();
    const chainId = await this.getChainId();

    if (this.provider == null || account == null || chainId == null) {
      throw new BurnerConnectorError(BurnerConnectorErrorList.couldNotConnect);
    }

    if (!account) {
      throw new BurnerConnectorError(BurnerConnectorErrorList.accountNotFound);
    }

    return {
      account,
      chain: { id: chainId, unsupported: false },
      provider: this.provider,
    };
  }
  private getChainFromId(chainId?: number) {
    const resolveChainId = chainId ?? this.options.defaultChainId;
    const chain = this.chains.find((f) => f.id === resolveChainId);
    if (chain == null) {
      throw new BurnerConnectorError(
        BurnerConnectorErrorList.chainNotSupported
      );
    }
    return chain;
  }

  disconnect(): Promise<void> {
    return Promise.resolve();
  }

  async getAccount(): Promise<Address> {
    const wallet = this.getWallet();
    const account = wallet.address as Address;
    return account;
  }

  async getChainId(): Promise<number> {
    const network = await this.provider?.getNetwork();
    const chainId = network?.chainId ?? this.options.defaultChainId;
    if (chainId == null) {
      throw new BurnerConnectorError(
        BurnerConnectorErrorList.chainIdNotResolved
      );
    }

    return Promise.resolve(chainId);
  }

  async getSigner(): Promise<any> {
    const account = await this.getAccount();
    const signer = this.getWallet();

    if (signer == null || (await signer.getAddress()) !== account) {
      throw new BurnerConnectorError(
        BurnerConnectorErrorList.signerNotResolved
      );
    }

    return Promise.resolve(signer);
  }
  async isAuthorized() {
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }

  private getWallet(): Wallet {
    if (this.burnerWallet == null) {
      this.burnerWallet = new Wallet(loadWallet(), this.provider);
    }
    return this.burnerWallet;
  }

  protected onAccountsChanged = this.getWallet;
  protected onChainChanged = this.getWallet;
  protected onDisconnect(error: Error): void {
    if (error) console.warn(error);
  }
}
