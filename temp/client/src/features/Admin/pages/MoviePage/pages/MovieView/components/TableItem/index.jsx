import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';

const TableItem = (props) => {
    const { data } = props;
    
    return (
        <tr>
            <th >{ data.movieName}</th>
            <th >{ data.time} phút</th>
            <th >{ data.directors}</th>
            <th >{ data.category}</th>
            <th > { moment.utc(data.premiereDate).format('L') } </th>
            <th > { moment.utc(data.endDate).format('L')} </th>
            <th >
                <Link to={`/admin/movie/${data.movieId}/update`} className="btn btn-primary btn-edit">
                    <i className="fal fa-edit mr-2"></i>
                    Edit
                </Link>
            </th>
        </tr>
    );
};


TableItem.propTypes = {

};


export default TableItem;
