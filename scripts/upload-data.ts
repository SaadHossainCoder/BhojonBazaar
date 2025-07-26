
import { initializeApp } from "firebase/app";
import { getFirestore, collection, writeBatch, doc } from "firebase/firestore";

// IMPORTANT: This is a sample script. You will need to replace the configuration
// with your own Firebase project configuration. You can find it in the
// Firebase console: https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "AIzaSyCA_rGJSWFJpBNsTpCV2q97SDK0y20OaA0",
  authDomain: "bhojonbazaar-3e31d.firebaseapp.com",
  projectId: "bhojonbazaar-3e31d",
  storageBucket: "bhojonbazaar-3e31d.firebasestorage.app",
  messagingSenderId: "654346275257",
  appId: "1:654346275257:web:b508e366eaaa9241cd4e68",
  measurementId: "G-JD92CS0NVS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  // Vegetables
  {
    id: "prod-1",
    name: "Organic Carrots",
    price: 2.5,
    originalPrice: 3.0,
    rating: 4.8,
    imageUrl: "https://placehold.co/300x300.png",
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
    imageUrl: "https://placehold.co/300x300.png",
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
    imageUrl: "https://placehold.co/300x300.png",
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
    imageUrl: "https://placehold.co/300x300.png",
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
    imageUrl: "https://placehold.co/300x300.png",
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
    imageUrl: "https://placehold.co/300x300.png",
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
    imageUrl: "https://placehold.co/300x300.png",
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
    imageUrl: "https://placehold.co/300x300.png",
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
    imageUrl: "https://placehold.co/300x300.png",
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
    imageUrl: "https://placehold.co/300x300.png",
    category: "Pantry",
    hint: "olive oil",
    vendor: "Mediterranean Gold",
    date: "2025-01-01",
  },
];


async function uploadProducts() {
  const productsCollection = collection(db, "products");
  const batch = writeBatch(db);

  products.forEach((product) => {
    const docRef = doc(productsCollection, product.id);
    batch.set(docRef, product);
  });

  try {
    await batch.commit();
    console.log("Successfully uploaded products!");
  } catch (error) {
    console.error("Error uploading products: ", error);
  }
}

uploadProducts().then(() => {
    console.log("Upload script finished.");
    process.exit(0);
}).catch((error) => {
    console.error("Upload script failed:", error);
    process.exit(1);
});
