import AuthLayout from "@/components/layouts/AuthLayout";





export default async function AuthRootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return <AuthLayout>{children}</AuthLayout>;
}
