import Link from "next/link";

const NewArrival = () => {
  const products = [
    {
      id: "12345",
      title: "Half-Sleeve T-shirt",
      description:
        "A luxurious red evening dress made with silk fabric, perfect for parties and formal events.",
      image: "https://i.ibb.co.com/gZTksHqt/61a794e19d4b4-square.jpg",
      brand: "Eleganza",
      availableQuantity: 30,
      price: 129.99,
      discountPrice: 99.99,
      category: "Evening Wear",
      size: ["S", "M", "L", "XL"],
      color: ["Red"],
      rating: 4.8,
      reviewsCount: 120,
      material: "Silk",
      careInstructions: "Dry clean only.",
      productCode: "DRESS-RED-123",
      createdAt: "2025-04-08T10:00:00Z",
      updatedAt: "2025-04-08T10:00:00Z",
    },
    {
      id: "67890",
      title: "Designer Short Sleeve",
      description:
        "A comfortable and breezy blue dress, perfect for casual outings and summer days.",
      image: "https://i.ibb.co.com/Ps4Jgp37/638741f4b738e-square.jpg",
      brand: "Summer Breeze",
      availableQuantity: 50,
      price: 49.99,
      discountPrice: 39.99,
      category: "Casual Wear",
      size: ["S", "M", "L"],
      color: ["Blue"],
      rating: 4.5,
      reviewsCount: 75,
      material: "Cotton",
      careInstructions: "Machine wash cold. Tumble dry low.",
      productCode: "DRESS-BLUE-678",
      createdAt: "2025-04-09T10:00:00Z",
      updatedAt: "2025-04-09T10:00:00Z",
    },
    {
      id: "11223",
      title: "Sports T-shirt",
      description:
        "A sophisticated black dress made from high-quality velvet, designed for elegant evening events.",
      image: "https://i.ibb.co.com/W459ks1f/6388945749713-square.jpg",
      brand: "Velvet Couture",
      availableQuantity: 20,
      price: 199.99,
      discountPrice: 159.99,
      category: "Evening Wear",
      size: ["M", "L", "XL"],
      color: ["Black"],
      rating: 4.9,
      reviewsCount: 250,
      material: "Velvet",
      careInstructions: "Dry clean only.",
      productCode: "DRESS-BLACK-112",
      createdAt: "2025-04-09T10:30:00Z",
      updatedAt: "2025-04-09T10:30:00Z",
    },
    {
      id: "44556",
      title: "Polo",
      description:
        "A vibrant floral dress perfect for the summer season, made from lightweight fabric.",
      image: "https://i.ibb.co.com/fGM0NNxk/638741f4d642b-square.jpg",
      brand: "Floral Vibes",
      availableQuantity: 40,
      price: 59.99,
      discountPrice: 45.99,
      category: "Casual Wear",
      size: ["S", "M", "L"],
      color: ["Floral"],
      rating: 4.6,
      reviewsCount: 98,
      material: "Cotton Blend",
      careInstructions: "Machine wash cold.",
      productCode: "DRESS-FLORAL-445",
      createdAt: "2025-04-09T11:00:00Z",
      updatedAt: "2025-04-09T11:00:00Z",
    },
    {
      id: "22334",
      title: "Cut & Stitch Polo",
      description:
        "A timeless navy blue dress for both formal and semi-formal occasions.",
      image: "https://i.ibb.co.com/nMw6Pv26/638741f4d7304-square.jpg",
      brand: "Classic Elegance",
      availableQuantity: 15,
      price: 99.99,
      discountPrice: 79.99,
      category: "Formal Wear",
      size: ["S", "M", "L"],
      color: ["Navy Blue"],
      rating: 4.7,
      reviewsCount: 200,
      material: "Polyester",
      careInstructions: "Dry clean only.",
      productCode: "DRESS-NAVY-223",
      createdAt: "2025-04-09T11:15:00Z",
      updatedAt: "2025-04-09T11:15:00Z",
    },
    {
      id: "33445",
      title: "Half Sleeve Raglan",
      description:
        "A chic white lace dress with intricate detailing, perfect for weddings and formal events.",
      image: "https://i.ibb.co.com/5hV4pGFM/638894573d172-square.jpg",
      brand: "Lace Couture",
      availableQuantity: 25,
      price: 129.99,
      discountPrice: 109.99,
      category: "Evening Wear",
      size: ["S", "M", "L"],
      color: ["White"],
      rating: 4.8,
      reviewsCount: 140,
      material: "Lace",
      careInstructions: "Hand wash only.",
      productCode: "DRESS-WHITE-334",
      createdAt: "2025-04-09T11:30:00Z",
      updatedAt: "2025-04-09T11:30:00Z",
    },
    {
      id: "55667",
      title: "Half Sleeve Blanks",
      description:
        "A beautiful boho-inspired maxi dress perfect for casual wear and festivals.",
      image: "https://i.ibb.co.com/fhSxZwR/61a794e18818e-square.jpg",
      brand: "Boho Chic",
      availableQuantity: 60,
      price: 79.99,
      discountPrice: 59.99,
      category: "Casual Wear",
      size: ["S", "M", "L"],
      color: ["Multi-color"],
      rating: 4.4,
      reviewsCount: 180,
      material: "Chiffon",
      careInstructions: "Machine wash cold.",
      productCode: "DRESS-BOHO-556",
      createdAt: "2025-04-09T12:00:00Z",
      updatedAt: "2025-04-09T12:00:00Z",
    },
    {
      id: "66778",
      title: "Designer Full Sleeve",
      description:
        "A sleek black bodycon dress that hugs the body for a flattering fit.",
      image: "https://i.ibb.co.com/Wv35s14p/638741f4d360c-square.jpg",
      brand: "Bodycon Designs",
      availableQuantity: 30,
      price: 89.99,
      discountPrice: 69.99,
      category: "Evening Wear",
      size: ["S", "M", "L"],
      color: ["Black"],
      rating: 4.7,
      reviewsCount: 100,
      material: "Spandex",
      careInstructions: "Hand wash only.",
      productCode: "DRESS-BODYCON-667",
      createdAt: "2025-04-09T12:15:00Z",
      updatedAt: "2025-04-09T12:15:00Z",
    },
    {
      id: "77889",
      title: "Full Sleeve Raglan",
      description:
        "A playful pink dress that is perfect for a night out with friends.",
      image: "https://i.ibb.co.com/XryZgjBv/638894f4efd88-square.png",
      brand: "Pink Charm",
      availableQuantity: 55,
      price: 79.99,
      discountPrice: 69.99,
      category: "Casual Wear",
      size: ["S", "M", "L"],
      color: ["Pink"],
      rating: 4.5,
      reviewsCount: 110,
      material: "Polyester",
      careInstructions: "Machine wash cold.",
      productCode: "DRESS-PINK-778",
      createdAt: "2025-04-09T12:30:00Z",
      updatedAt: "2025-04-09T12:30:00Z",
    },
    {
      id: "88990",
      title: "Full Sleeve Blanks",
      description: "A vibrant yellow sundress perfect for hot summer days.",
      image: "https://i.ibb.co.com/XxvKDs3D/6388715fe282b-square.jpg",
      brand: "Sunshine Styles",
      availableQuantity: 45,
      price: 49.99,
      discountPrice: 39.99,
      category: "Casual Wear",
      size: ["S", "M", "L"],
      color: ["Yellow"],
      rating: 4.6,
      reviewsCount: 65,
      material: "Cotton",
      careInstructions: "Machine wash cold.",
      productCode: "DRESS-YELLOW-889",
      createdAt: "2025-04-09T12:45:00Z",
      updatedAt: "2025-04-09T12:45:00Z",
    },
    {
      id: "99001",
      title: "Football Jersey",
      description:
        "The perfect little black dress, a must-have for every woman's wardrobe.",
      image: "https://i.ibb.co.com/CSQmKGq/61a794e1aa1f4-square.jpg",
      brand: "Classique",
      availableQuantity: 40,
      price: 89.99,
      discountPrice: 69.99,
      category: "Formal Wear",
      size: ["S", "M", "L"],
      color: ["Black"],
      rating: 4.8,
      reviewsCount: 180,
      material: "Cotton Blend",
      careInstructions: "Dry clean only.",
      productCode: "DRESS-LBD-990",
      createdAt: "2025-04-09T13:00:00Z",
      updatedAt: "2025-04-09T13:00:00Z",
    },
    {
      id: "10111",
      title: "Hoddie",
      description:
        "A fun and retro-inspired polka dot dress that brings back classic vibes.",
      image: "https://i.ibb.co.com/Fb9pH6VV/638741f4b169a-square.jpg",
      brand: "Retro Style",
      availableQuantity: 35,
      price: 69.99,
      discountPrice: 59.99,
      category: "Casual Wear",
      size: ["S", "M", "L"],
      color: ["Black/White"],
      rating: 4.3,
      reviewsCount: 120,
      material: "Polyester",
      careInstructions: "Machine wash cold.",
      productCode: "DRESS-POLKA-101",
      createdAt: "2025-04-09T13:15:00Z",
      updatedAt: "2025-04-09T13:15:00Z",
    },
    {
      id: "11222",
      title: "Jacket",
      description:
        "A bohemian-style beach dress perfect for vacations and beach parties.",
      image: "https://i.ibb.co.com/CsXGGn88/638741f4b7222-square.jpg",
      brand: "Boho Vibes",
      availableQuantity: 60,
      price: 59.99,
      discountPrice: 49.99,
      category: "Casual Wear",
      size: ["S", "M", "L"],
      color: ["Multi-color"],
      rating: 4.5,
      reviewsCount: 140,
      material: "Cotton",
      careInstructions: "Machine wash cold.",
      productCode: "DRESS-BEACH-112",
      createdAt: "2025-04-09T13:30:00Z",
      updatedAt: "2025-04-09T13:30:00Z",
    },
    {
      id: "12321",
      title: "Mens Shorts",
      description:
        "A high-low evening dress with an elegant design for formal occasions.",
      image: "https://i.ibb.co.com/C3bp059q/638741f4ba04f-square.jpg",
      brand: "Evening Glam",
      availableQuantity: 20,
      price: 149.99,
      discountPrice: 129.99,
      category: "Evening Wear",
      size: ["S", "M", "L"],
      color: ["Red"],
      rating: 4.7,
      reviewsCount: 85,
      material: "Satin",
      careInstructions: "Dry clean only.",
      productCode: "DRESS-HIGHLow-123",
      createdAt: "2025-04-09T13:45:00Z",
      updatedAt: "2025-04-09T13:45:00Z",
    },
  ];
  return (
    <div>
      <h2 className="uppercase text-center p-4 bg-[#FCF4E9] text-[#f0920e] font-bold text-2xl md:text-4xl mt-3">
        New Arrival
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-3">
        {products?.map((product) => (
          <Link href={"/"} key={product.id} className="relative">
            <img
              src={product.image}
              alt="T-Shirt"
              className="object-cover pt-6 rounded w-full h-full"
            />
            <h2 className="absolute top-0 left-0 right-0 mx-auto text-black text-[12px] bg-white p-2 text-center rounded-b-2xl inline-block shadow-[0_-4px_8px_rgba(0,0,0,0.2)]">
              {product.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
