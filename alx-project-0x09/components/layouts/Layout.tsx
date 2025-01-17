import { ReactComponentProps } from '@/interfaces';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<ReactComponentProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;