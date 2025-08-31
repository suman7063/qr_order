export interface MenuItem {
  section: string;
  category: string;
  itemName: string;
  description: string;
  priceRegular?: number;
  priceSmall?: number;
  priceMedium?: number;
  priceLarge?: number;
  status: string;
  isActive: boolean;
  bestSeller: boolean;
  chefSpecial: boolean;
}

export interface MenuData {
  [section: string]: {
    [category: string]: MenuItem[];
  };
}

export interface SearchItem {
  item: string;
  category: string;
  section: string;
  fullItem: MenuItem;
}
