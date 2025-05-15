import Header from "components/Header";
import ProjectOverview from "components/projectOverview";
import "styles/globals.css";

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
        <ProjectOverview />
        <Header />
        {children}
      </body>
    </html>
  );
}
