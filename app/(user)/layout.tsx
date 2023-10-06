import Header from "../../components/Header";
import Modal from "../../components/Modal";
import "../../styles/globals.css";

export const metadata = {
  title: "Mini blog",
  description: "Your favorite devosphere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-white max-w-7xl mx-auto">
        <Modal />
        <Header />
        {children}
      </body>
    </html>
  );
}
