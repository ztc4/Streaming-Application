import Nav from "../Components/dashboardNav";

function Layout({children}) {
    return ( 

        <>
            <Nav/>
            {children}
        </>
     );
}

export default Layout;