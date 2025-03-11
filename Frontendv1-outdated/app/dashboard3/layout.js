

import Nav from '@/app/Components/dashboardNav';
import "../globals.css"

export const metadata = {
    title: "Dashboard",
    description: "Landing Page of the Streaming Application",
  };

function Layout({children}) {
    return (
        <div className="flex overflow-hidden   bg-[#F8F8F8]  flex-row duration-1000">
            <Nav/>
            {children}
        </div>

     );
}

export default Layout;