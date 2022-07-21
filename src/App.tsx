import { useEffect, useState } from "react";
import { getNfts } from "./main";
import { Nft } from "@ankr.com/ankr.js/dist/types";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNfts] = useState<Nft[]>([]);

  useEffect(() => {
    (async () => {
      const { nfts } = await getNfts(walletAddress);
      console.log({ nfts });
      setNfts(nfts);
    })();
  }, [walletAddress]);
  return (
    <div className="flex flex-col justify-center bg-zinc-900 py-10 px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-44 min-h-screen text-white">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pb-10 font-bold text-center">
          Ankr.js NFT Viewer
        </h1>
        <div className="flex flex-col mt-4 items-center">
          <label className="text-zinc-100 pb-3" htmlFor="wallet-address">
            Wallet address, ENS, or Unstoppable Domain
          </label>
          <input
            id="wallet-address"
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="rounded p-2 w-[400px] border text-zinc-700 text-center"
            placeholder="Enter a wallet address here"
          />
        </div>
        <div className="grid grid-cols-3 mt-8 gap-4">
          {nfts.map((nft) => {
            return (
              <div
                key={`${nft.contractAddress}/${nft.tokenId}`}
                className="flex flex-col rounded border p-4"
              >
                <img
                  className="w-[200px] rounded shadow"
                  src={nft.imageUrl}
                  alt={nft.name}
                />
                <span className="font-bold mt-4">{nft.name}</span>
                <span>{nft.collectionName}</span>
                <span>{nft.blockchain}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
