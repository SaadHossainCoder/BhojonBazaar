
"use client";

import Header from "@/components/Header";

export default function BestDealsPage() {
  const firebaseConfig = `
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "dhojanbazaar.firebaseapp.com",
  databaseURL: "https://dhojanbazaar.firebaseio.com",
  projectId: "dhojanbazaar",
  storageBucket: "dhojanbazaar.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
  `;

  const securityRules = `
{
  "rules": {
    "prices": {
      ".read": true,
      ".write": "auth != null && auth.uid === 'admin123'"
    },
    "subscribers": {
      ".read": false,
      "$uid": {
        ".write": true,
        ".validate": "newData.hasChildren(['phone', 'timestamp'])"
      }
    }
  }
}
  `;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="prose lg:prose-xl max-w-none">
          <h1 className="text-4xl font-bold mb-4">
            Firebase Realtime Database Setup for DhojanBazaar
          </h1>
          <p>
            Here is the setup for a web app named "DhojanBazaar" that helps
            Indian street food vendors access daily raw material prices and
            subscribe for alerts.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-2">
            🔸 Data Structure
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">1. /prices</h3>
              <p className="ml-4">
                <strong>Type:</strong> Key-value object
              </p>
              <p className="ml-4">
                <strong>Example:</strong>
              </p>
              <pre className="bg-muted p-4 rounded-md text-sm">
                <code>
                  {`{ "Onion": 25, "Tomato": 40, "Potato": 30 }`}
                </code>
              </pre>
            </div>
            <div>
              <h3 className="font-semibold">2. /subscribers</h3>
              <p className="ml-4">
                <strong>Type:</strong> List of objects
              </p>
              <p className="ml-4">
                <strong>Each object:</strong>
              </p>
              <pre className="bg-muted p-4 rounded-md text-sm">
                <code>
                  {`{ phone: "9876543210", timestamp: serverTimestamp }`}
                </code>
              </pre>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-2">🔸 Security Rules</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Allow public <strong>read</strong> access to <code>/prices</code>.</li>
            <li>Allow only <strong>authenticated user with UID == "admin123"</strong> to <strong>write</strong> to <code>/prices</code>.</li>
            <li>Allow anyone (no auth) to <strong>push</strong> to <code>/subscribers</code>, but no one can <strong>read</strong> it.</li>
          </ol>
          <pre className="bg-muted p-4 rounded-md text-sm mt-4">
            <code>{securityRules.trim()}</code>
          </pre>

          <h2 className="text-2xl font-bold mt-8 mb-2">
            🔸 Output Required
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Firebase Security Rules</h3>
               <p>See above.</p>
            </div>
             <div>
              <h3 className="font-semibold">Firebase Config Object for Frontend Integration</h3>
               <pre className="bg-muted p-4 rounded-md text-sm mt-2">
                <code>{firebaseConfig.trim()}</code>
              </pre>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full py-6 mt-auto text-center text-muted-foreground text-sm bg-muted">
        <p>© {new Date().getFullYear()} bazar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
