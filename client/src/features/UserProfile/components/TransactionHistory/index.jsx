import React from 'react';
import './transaction_history.scss';
import Images from '../../../../contants/image';

const TransactionHistory = () => {
    return (
        <>
            <div className="content">
                <span />
                <span />
                <span />
                <span />

                <div className="title">
                    <h3>Lịch Sử Giao Dịch</h3>
                </div>
                <div className="table-history">
                    <div className="table-responsive">
                        <table className="table table-striped custom-table">
                            <thead>
                                <tr>
                                    <th scope="col">Mã thẻ</th>
                                    <th scope="col">Số tiền nạp</th>
                                    <th scope="col">Số dư hiện tại</th>
                                    <th scope="col">Ngày nạp</th>
                                    <th scope="col">Giờ nạp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr scope="row" >
                                    <td colspan="5">
                                        <div className="empty-col">
                                                <div className="empty-image">
                                                    <img src={ Images.NOTITEM } alt="Not Emty"/>
                                                </div>
                                                <div className="text-empty">
                                                    Không có Lịch sử Giao dịch
                                                </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>FG6sHoaf6BVm94jF</td>
                                    <td>5.000.000 eCoin</td>
                                    <td>0 eCoin</td>
                                    <td>2021-07-03 </td>
                                    <td>15:47</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* ------ */}
                </div>
            </div>
        </>
    );
};


TransactionHistory.propTypes = {

};


export default TransactionHistory;
