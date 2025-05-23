import "styles/globals.css";

export const metadata = {
  title: "Mini blog studio",
  description: "Your devosphere studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
