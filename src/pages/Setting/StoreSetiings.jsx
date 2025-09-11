// StoreSettings.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Step components
import ItemStoreSetting from "./ItemStoreSetting"; // step 1
import ItemStoreHeroSetting from "./ItemStoreHeroSetting"; // step 3
import ItemStoreBrandSetting from "./ItemStoreBrandSetting";
// import ItemStoreBrand from "./ItemStoreBrand";           // (step 2 placeholder if you have it)
// import ItemStoreSocial from "./ItemStoreSocial";         // (step 4 placeholder if you have it)

function StoreSettings() {
  // Start on Info tab so something renders immediately
  const [storeSetting, setStoreSetting] = useState(1);

  return (
    <div>
      <div className="mb-5 flex justify-center gap-1">
        <Button
          className={`text-gray-900 ${storeSetting === 1 ? "bg-primary-200" : "bg-gray-200"}`}
          variant="secondary"
          onClick={() => setStoreSetting(1)}
        >
          Info
        </Button>
        <Button
          className={`text-gray-900 ${storeSetting === 2 ? "bg-primary-200" : "bg-gray-200"}`}
          variant="secondary"
          onClick={() => setStoreSetting(2)}
        >
          Brand
        </Button>
        <Button
          className={`text-gray-900 ${storeSetting === 3 ? "bg-primary-200" : "bg-gray-200"}`}
          variant="secondary"
          onClick={() => setStoreSetting(3)}
        >
          Hero Area
        </Button>
        <Button
          className={`text-gray-900 ${storeSetting === 4 ? "bg-primary-200" : "bg-gray-200"}`}
          variant="secondary"
          onClick={() => setStoreSetting(4)}
        >
          Social Media
        </Button>
      </div>

      {/* Render the correct step */}
      {storeSetting === 1 && <ItemStoreSetting />}
      {storeSetting === 2 && <ItemStoreBrandSetting />}
      {storeSetting === 3 && <ItemStoreHeroSetting />}
      {storeSetting === 4 && (
        <div className="text-muted-foreground p-6 text-sm">
          Social step coming soon…
        </div>
      )}
    </div>
  );
}

export default StoreSettings;
