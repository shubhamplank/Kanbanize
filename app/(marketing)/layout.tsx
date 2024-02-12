import type { FC } from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout: FC<MarketingLayoutProps> = ({
  children,
}) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
