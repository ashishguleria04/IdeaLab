const RootLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full bg-red-400 text-white">
            {children}
        </div>
     );
}
 
export default RootLayout;