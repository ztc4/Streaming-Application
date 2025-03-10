function WatchVidoe(query) {
    console.log(1,query.searchParams)
    const id = query.searchParams.v

    return ( 
        <main className="w-screen pl-12 md:pl-56 min-h-screen  pt-12 pb-12 pr-8 md:pt-20 bg-[#F8F8F8]">
            <div className="w-3w/5 aspect-video bg-black/10">

            </div>
        </main>
     );
}

export default WatchVidoe;