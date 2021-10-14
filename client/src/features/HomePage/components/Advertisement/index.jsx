import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Advertisement = () => {
    const backgoundRef = useRef(null);

    useEffect(() => {
        const style = `
            background: url(https://cdnb.artstation.com/p/assets/images/images/017/317/689/large/toan-juno-final.jpg?1555483923) 0% 0% / cover no-repeat;
            width: 100%;
            height: 100%;
            position: relative;
            transition: all 0.5s ease 0s;
        `;

        backgoundRef.current.style = style;
    }, []);
    return (
        <section className="advertisement">
            <div>
                <div className="advertisement-bg">
                    <div className="bg-home" />
                    <div className="bg-advertisement" ref={backgoundRef}/>
                </div>
                <div className="warapper">
                    <div className="content container">
                        <h3>Top Phim Trong Tuần</h3>
                        <div className="content__movie">
                            <div className="card-top">
                                <div className="card-img">
                                    <img src="https://cdnb.artstation.com/p/assets/images/images/017/317/689/large/toan-juno-final.jpg?1555483923" alt="" />
                                </div>
                            </div>
                            <div className="content__info">
                                <h4>Hai Phượng</h4>
                                <ul className="list-info-movie">
                                    <li className="group-film"> 
                                        <label className="group__title" htmlFor>Đạo diễn</label>
                                        <span>Lê Văn Kiệt</span>
                                    </li>
                                        <li className="group-film"> 
                                        <label className="group__title" htmlFor>Diễn viên</label>
                                        <span>Ngô Thanh Vân, Mai Cát Vy, Phan Thanh Nhiên</span>
                                    </li>
                                    <li className="group-film"> 
                                        <label className="group__title" htmlFor>Thể loại</label>
                                        <span>Action</span>
                                    </li>
                                    <li className="group-film"> 
                                        <label className="group__title" htmlFor>Thời lượng</label>
                                        <span>98 phút</span>
                                    </li>
                                        <li className="group-film"> 
                                        <label className="group__title" htmlFor>Đánh giá</label>
                                        <span><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" /><i className="far fa-star" /></span>
                                    </li>
                                    <li className="group-button">
                                        <Link to="/" className="btn btn-success">Mua vé ngay</Link>
                                        <button className="btn btn-success btn-modal ml-2">Xem trailer</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="description-movie">
                <div className="container">
                    <h5 className="title">Chi Tiết</h5>
                    <div id="text_describe">
                        Venom (2018) là bộ phim siêu anh hùng của Hoa Kỳ được phát triển dựa trên nhân vật cùng tên của Marvel Comics, phim được sản xuất bởi hãng Columbia Pictures và Sony Pictures Releasing phát hành. Đây cũng là bộ phim đầu tiên lấy nhân vật từ vũ trụ Marvel của Sony, phim được hỗ trợ từ Marvel nhưng tách biệt khỏi MCU.

                        Ruben Fleischer được mời vào ghế đạo diễn, với kịch bản được chắp bút bởi Scott Rosenberg, Jeff Pinker, Kelly Marcel và Will Beall. Diễn viên chính của phim là Tom Hardy trong vai Eddie Brock (Venom) cùng Michelle Williams và Riz Ahmed.

                        Rosenberg và Pinkner đã được giao việc viết kịch bản với Fleischer và Hardy được bổ sung vào đội ngũ vào tháng 5 năm 2017. Phim bắt đầu bấm máy vào tháng 10 năm 2017 tại Atlanta và kết thúc tại San Francisco.
                    </div>
                </div>
            </div>
        </section>
    );
};


Advertisement.propTypes = {

};


export default Advertisement;
