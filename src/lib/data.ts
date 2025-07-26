
import {
  Carrot,
  Apple,
  Milk,
  Cookie,
  Beef,
  Flame,
  ComponentType,
} from "lucide-react";
import {FC} from 'react'

export interface Feedback {
  author: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  imageUrl: string;
  category: string;
  hint: string;
  vendor: string;
  date: string;
  feedback?: Feedback[];
}

export interface Category {
  id: string;
  name: string;
  icon: FC<{ className?: string }>;
}

export interface Vendor {
  name: string;
  location: {
    lat: number;
    lon: number;
  };
}

export const products: Product[] = [
  // Vegetables
  {
    id: "prod-1",
    name: "Organic Carrots",
    price: 2.5,
    originalPrice: 3.0,
    rating: 4.8,
    imageUrl: "https://www.greendna.in/cdn/shop/products/basket-carrots-close-up-37641_1024x1024@2x.jpg?v=1632668896",
    category: "Vegetables",
    hint: "fresh carrots",
    vendor: "FarmFresh Co.",
    date: "2024-07-20",
    feedback: [
      { author: "Jane D.", rating: 5, comment: "So fresh and crunchy!" },
      { author: "John S.", rating: 4, comment: "Great quality for the price." },
    ],
  },
  {
    id: "prod-2",
    name: "Fresh Tomatoes",
    price: 3.0,
    rating: 4.7,
    imageUrl: "https://media.istockphoto.com/id/140453734/photo/fresh-tomatoes.jpg?s=612x612&w=0&k=20&c=b6XySPuRKF6opBf0bexh9AhkWck-c7TaoJvRdVNBgT0=",
    category: "Vegetables",
    hint: "red tomatoes",
    vendor: "Green Grocers",
    date: "2024-07-21",
    feedback: [
      { author: "Alice", rating: 5, comment: "Perfect for salads." },
    ],
  },
  {
    id: "prod-3",
    name: "Spinach Bunch",
    price: 2.0,
    originalPrice: 2.5,
    rating: 4.9,
    imageUrl: "https://www.jiomart.com/images/product/original/590000488/spinach-bunch-approx-90-g-100-g-product-images-o590000488-p592342847-0-202409171907.jpg?im=Resize=(1000,1000)",
    category: "Vegetables",
    hint: "green spinach",
    vendor: "FarmFresh Co.",
    date: "2024-07-22",
  },
  // Fruits
  {
    id: "prod-4",
    name: "Red Apples",
    price: 4.0,
    rating: 4.9,
    imageUrl: "https://ichef.bbci.co.uk/images/ic/480xn/p07v2wjn.jpg.webp",
    category: "Fruits",
    hint: "juicy apples",
    vendor: "Orchard Direct",
    date: "2024-07-19",
    feedback: [
      { author: "Bob", rating: 5, comment: "My kids love these apples." },
      { author: "Charlie", rating: 5, comment: "Sweet and crisp, just perfect." },
    ],
  },
  {
    id: "prod-5",
    name: "Bananas",
    price: 1.5,
    rating: 4.6,
    imageUrl: "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg",
    category: "Fruits",
    hint: "ripe bananas",
    vendor: "Tropical Fruits",
    date: "2024-07-18",
  },
  // Dairy
  {
    id: "prod-6",
    name: "Organic Milk",
    price: 3.5,
    rating: 4.8,
    imageUrl: "https://www.health.com/thmb/G92Sp4jbV89vreXlXXVg0oGLayk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-IsOrganicMilkBetterForYou-7e90f834800447ddb43ddbd499260095.jpg",
    category: "Dairy",
    hint: "fresh milk",
    vendor: "Happy Cow Dairy",
    date: "2024-07-25",
  },
  {
    id: "prod-7",
    name: "Cheddar Cheese",
    price: 5.0,
    originalPrice: 6.0,
    rating: 4.7,
    imageUrl: "https://homesteadersofamerica.com/wp-content/uploads/2022/01/How-to-Make-Cheddar-Cheese-17.jpg",
    category: "Dairy",
    hint: "block cheese",
    vendor: "The Cheese Makers",
    date: "2024-08-10",
  },
  // Bakery
  {
    id: "prod-8",
    name: "Sourdough Bread",
    price: 4.5,
    rating: 4.9,
    imageUrl: "https://www.allrecipes.com/thmb/GPqr9kEn84Kj00QL56aObbv1ci0=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/260540-Chef-Johns-Sourdough-Bread-DDMFS-004-4x3-6791a75a5d804ec28424d04756054c5b.jpg",
    category: "Bakery",
    hint: "artisan bread",
    vendor: "The Bread Kiln",
    date: "2024-07-22",
  },
  // Meat
  {
    id: "prod-9",
    name: "Chicken Breast",
    price: 8.0,
    rating: 4.8,
    imageUrl: "https://www.foodcoachforme.com/wp-content/uploads/2020/03/chicken-with-garlic-and-rosemary-scaled.jpg",
    category: "Meat",
    hint: "raw chicken",
    vendor: "Free-Range Farms",
    date: "2024-07-23",
  },
  // Pantry
  {
    id: "prod-10",
    name: "Olive Oil",
    price: 10.0,
    rating: 4.9,
    imageUrl: "https://images.healthshots.com/healthshots/en/uploads/2024/07/08154320/olive-oil.jpg",
    category: "Pantry",
    hint: "olive oil",
    vendor: "Mediterranean Gold",
    date: "2025-01-01",
  },
];


export const categories: Category[] = [
  { id: "cat-1", name: "Vegetables", icon: Carrot },
  { id: "cat-2", name: "Fruits", icon: Apple },
  { id: "cat-3", name: "Dairy", icon: Milk },
  { id: "cat-4", name: "Bakery", icon: Cookie },
  { id: "cat-5", name: "Meat", icon: Beef },
  { id: "cat-6", name: "Pantry", icon: Flame },
];

export const vendors: Vendor[] = [
  { name: "FarmFresh Co.", location: { lat: 34.0522, lon: -118.2437 } }, // LA
  { name: "Green Grocers", location: { lat: 40.7128, lon: -74.0060 } }, // NYC
  { name: "Orchard Direct", location: { lat: 41.8781, lon: -87.6298 } }, // Chicago
  { name: "Tropical Fruits", location: { lat: 25.7617, lon: -80.1918 } }, // Miami
  { name: "Happy Cow Dairy", location: { lat: 43.0731, lon: -89.4012 } }, // Madison, WI
  { name: "The Cheese Makers", location: { lat: 45.5152, lon: -122.6784 } }, // Portland
  { name: "The Bread Kiln", location: { lat: 37.7749, lon: -122.4194 } }, // San Francisco
  { name: "Free-Range Farms", location: { lat: 30.2672, lon: -97.7431 } }, // Austin
  { name: "Mediterranean Gold", location: { lat: 38.9072, lon: -77.0369 } }, // Washington D.C.
];
