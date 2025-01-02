import React, { ReactNode } from 'react'
import Header from '../Header/Header.Main';
import Footer from '../Footer/Footer.Main';

interface PublicLayoutProps {
    children?: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({
    children
}) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default PublicLayout