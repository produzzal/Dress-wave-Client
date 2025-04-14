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
  stockAvailability: number;
  thumbnail: string;
  images: { url: string }[];
};
