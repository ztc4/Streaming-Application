import LayoutFooter from "@/app/Components/layoutFooter";


export const metadata = {
  title: "Landing",
  description:
    "Landing Page of the Streaming Application",
};

export default function Layout({
  children,
}) {
  return (
    <>
      
      {children}
      <LayoutFooter />
    </>
  );
}
