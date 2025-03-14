import Gallery from '../../components/Gallery';

export const metadata = {
  title: 'NFT Gallery | Bitcoin NFT Minting dApp',
  description: 'Browse all minted NFTs on our Bitcoin NFT platform',
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Gallery />
    </div>
  );
}
