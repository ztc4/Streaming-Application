import LayoutFooter from "@/app/Components/layoutFooter";



function Layout({children}) {
    return ( 
        <>
            
            {children}
            <LayoutFooter/>
        </>
     );
}

export default Layout;