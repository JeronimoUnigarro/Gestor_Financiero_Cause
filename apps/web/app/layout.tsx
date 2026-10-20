import './style.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'CAUCE | Finanzas personales',description:'Organiza tus finanzas, presupuestos y metas de ahorro.'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body>{children}</body></html>; }
