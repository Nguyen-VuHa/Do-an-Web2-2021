import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Divider } from 'src/style-common/Layout.Style';
import FormEdit from '../components/AdminShowTime/FormEdit';
import Header from '../components/AdminShowTime/Header';
import { useDispatch } from 'react-redux';
import { fetchSystemCinema } from 'src/reducers/systemCinemaSlice';
import { getMovieCurrent } from 'src/reducers/movieSlice';
import { fetchAllShowTimes } from 'src/reducers/showtimeSlice';
import DataTable from '../components/AdminShowTime/DataTable';

const AdminShowTimePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const waitDispatch = (ms) => {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            })
        }

        dispatch(fetchSystemCinema());
        
        waitDispatch(300)
        .then(() => {
            dispatch(fetchAllShowTimes());
        })
        .then(() => {
            dispatch(getMovieCurrent());
        });
    }, []);

    return (
       <>
            <HelmetProvider>
                <Helmet>
                    <title>Admin - Quản lý suất chiếu</title>
                </Helmet>
            </HelmetProvider>
        
            <div className="container mt-4">
                <Header />
                <Divider className='my-4'/>
                <FormEdit />
                <DataTable />
            </div>
       </>
    );
};

export default AdminShowTimePage;
