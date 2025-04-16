export type TProduct = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  discountPrice?: number;
  material: string;
  brand: string;
  category: string;
  subcategory: string;
  color: string[];
  size: string[];
  stockAvailability: number;
  thumbnail: string;
  images: { url: string }[];
};
