import React from 'react';
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
                <button className="btn btn-primary btn-edit">
                    <i className="fal fa-edit mr-2"></i>
                    Edit
                </button>
            </th>
        </tr>
    );
};


TableItem.propTypes = {

};


export default TableItem;
