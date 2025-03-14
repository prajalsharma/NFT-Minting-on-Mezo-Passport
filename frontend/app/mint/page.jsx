import MintForm from '../../components/MintForm';

export const metadata = {
  title: 'Mint NFT | Bitcoin NFT Minting dApp',
  description: 'Mint your NFT on Bitcoin using Mezo Passport',
};

export default function MintPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MintForm />
    </div>
  );
}
