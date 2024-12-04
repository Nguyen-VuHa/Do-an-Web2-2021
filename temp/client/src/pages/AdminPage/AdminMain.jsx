import React from 'react';
import { EditShowTimeContextProvider } from './contexts/EditShowTimeContext';
import AdminShowTimePage from './pages/AdminShowTimePage';

const AdminPage = () => {
    return (
        <>
            <EditShowTimeContextProvider>
                <AdminShowTimePage />
            </EditShowTimeContextProvider>
        </>
    );
};

export default AdminPage;
