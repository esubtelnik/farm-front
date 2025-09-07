import MainLayout from "@/components/layouts/MainLayout";

export default async function MainRootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
 
   return <MainLayout>{children}</MainLayout>;
}
