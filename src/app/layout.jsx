import "./globals.css";

export const metadata = {
  title: "Delta — data vs. the story they tell you",
  description:
    "Sports narratives are built on repetition, not evidence. Delta tests the claims everyone repeats against what the data actually shows.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
