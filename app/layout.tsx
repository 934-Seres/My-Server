import '@app/ui/global.css';
import AcmeLogo from '@/app/ui/acme-logo';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
 
     
      <body className={`${inter.className} antialiased`}>
           {/*   <AcmeLogo /> */}
        {children}
        </body>
    </html>
  );
}
