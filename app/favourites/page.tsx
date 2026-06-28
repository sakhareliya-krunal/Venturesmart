import { FavouritesContent } from "@/components/FavouritesContent";
import { InnerHero } from "@/components/InnerHero";

export const metadata = {
  title: "Favourites | Ventures Mart"
};

export default function FavouritesPage() {
  return (
    <main>
      <InnerHero
        eyebrow="Saved for later"
        title="Your favourites"
        description="Products you have saved appear here so you can compare and buy when you are ready."
        variant="default"
        stats={[
          { value: "Quick access", label: "Saved products" },
          { value: "Synced", label: "On this device" },
          { value: "Easy", label: "Tap heart to save" }
        ]}
      />
      <FavouritesContent />
    </main>
  );
}
