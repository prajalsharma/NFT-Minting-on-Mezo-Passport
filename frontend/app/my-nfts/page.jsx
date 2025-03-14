import UserNFTs from '../../components/UserNFTs';

export const metadata = {
  title: 'My NFTs | Bitcoin NFT Minting dApp',
  description: 'View your minted NFTs on our Bitcoin NFT platform',
};

export default function MyNFTsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <UserNFTs />
    </div>
  );
}