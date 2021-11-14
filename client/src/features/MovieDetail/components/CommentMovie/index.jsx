import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './comment_movie.scss';
import Ratingstar from './components/RatingStar';
import Usercomment from './components/UserComment';
import moment from 'moment';

const CommentMovie = () => {
    const [ratingStar, setRatngStar] = useState(0);
    const params = useParams();
    const comments = useSelector((state) => state.comments);
    const { data } = comments;
    
    return (
        <>
            <div className="container">
                <div className="comment-movie">
                    <Ratingstar setRatngStar={setRatngStar}/>
                    <Usercomment 
                        ratingStar={ratingStar} movieId={params.movieId} 
                        setRatngStar={setRatngStar}
                        textPlaceholder="Cảm nghĩ của bạn về bộ phim này?"
                    />
                    <div className="wrapper-comment">
                        <ul>
                            {
                                data.length > 0 ? 
                                data.map((item ) => {
                                    moment.locale('vi');
                                    const momentTime =  moment(item.createdAt).fromNow();
                                    return <li key={item.id}>
                                                <div>
                                                    <div className="main-comment">
                                                        <div className="img-user">
                                                            <img src="https://graph.facebook.com/1669001479976443/picture?width=400&height=400" alt="Not User"/>
                                                        </div>
                                                        <div className="comment-box">
                                                            <div>
                                                                <div className="box">
                                                                    <div className="content-comment">
                                                                        <div className="header-content">
                                                                            <span>Chưa xử lý</span>
                                                                            <span>Đánh giá {item.pointRating} sao</span>
                                                                        </div>
                                                                        <div className="text">
                                                                            {item.comments}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="control-comment">
                                                                <div className="btn-like">Thích</div>
                                                                <span> · </span>
                                                                <div className="btn-comment">Phản hồi</div>
                                                                <span> · </span>
                                                                <span className="moment-time">{momentTime}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                }) 
                                : <div>Không có comments nào!</div> 
                            }
                            {/* <li>
                                <div>
                                    <div className="main-comment">
                                        <div className="img-user">
                                            <img src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.6435-1/cp0/p48x48/163850079_1377620642585916_755443308252141825_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=0Oa5ZvEwNlkAX9q1Dej&_nc_ht=scontent.fsgn5-11.fna&oh=81be5e87782ae81ea7c8347ffac18da9&oe=61A2E0A2" alt="Not User"/>
                                        </div>
                                        <div className="comment-box">
                                            <div>
                                                <div className="box">
                                                    <div className="content-comment">
                                                        <div className="header-content">
                                                            <span>Ánh Tuyết</span>
                                                            <span>Đánh giá 5 sao</span>
                                                        </div>
                                                        <div className="text">
                                                            Nền hơi nổi 😆😆😆 nhưng mà vẫn xấu trai
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="control-comment">
                                                <div className="btn-like">Thích</div>
                                                <span> · </span>
                                                <div className="btn-comment">Phản hồi</div>
                                                <span> · </span>
                                                <span className="moment-time">20 giờ trước</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="dependent-comment">
                                        <div className="img-user">
                                            <img src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t1.6435-1/cp0/p40x40/197356349_1664333703776554_5774747963175226297_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=7206a8&_nc_ohc=t9_JDPG5kPMAX-pz2jO&tn=Vrba0JpY6dLRS4oo&_nc_ht=scontent.fsgn5-8.fna&oh=235800840f677e659a926f2abc24cb17&oe=61A3C0EE" alt="Not User"/>
                                        </div>
                                        <div className="comment-box">
                                            <div>
                                                <div className="box">
                                                    <div className="content-comment">
                                                        <div className="header-content">
                                                            <span>Nguyễn Vũ Hạ</span>
                                                        </div>
                                                        <div className="text">
                                                            <span>Ánh Tuyết</span>
                                                             xấu xưa giờ ồi :))
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="control-comment">
                                                <div className="btn-like">Thích</div>
                                                <span> · </span>
                                                <div className="btn-comment">Phản hồi</div>
                                                <span> · </span>
                                                <span className="moment-time">20 giờ trước</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dependent-comment">
                                        <div className="img-user">
                                            <img src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/cp0/p40x40/239469064_2901660860050060_1270716633943421248_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=7206a8&_nc_ohc=N8d4HRJVcb0AX_dP1F7&_nc_ht=scontent.fsgn5-6.fna&oh=064a223ca43a00d4e9dac702e5eee10b&oe=6184624F" alt="Not User"/>
                                        </div>
                                        <div className="comment-box">
                                            <div>
                                                <div className="box">
                                                    <div className="content-comment">
                                                        <div className="header-content">
                                                            <span>Như Thùy</span>
                                                        </div>
                                                        <div className="text">
                                                            <span>Ánh Tuyết</span>
                                                            môi hơi đỏ nữa kakaa
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="control-comment">
                                                <div className="btn-like">Thích</div>
                                                <span> · </span>
                                                <div className="btn-comment">Phản hồi</div>
                                                <span> · </span>
                                                <span className="moment-time">20 giờ trước</span>
                                            </div>
                                            <Usercomment textPlaceholder="Viết phản hồi..." maxWidth={600}/>
                                        </div>
                                    </div>
                                    <div className="dependent-comment">
                                        <div className="img-user">
                                            <img src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t1.6435-1/cp0/p48x48/163850079_1377620642585916_755443308252141825_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=0Oa5ZvEwNlkAX9q1Dej&_nc_ht=scontent.fsgn5-11.fna&oh=81be5e87782ae81ea7c8347ffac18da9&oe=61A2E0A2" alt="Not User"/>
                                        </div>
                                        <div className="comment-box">
                                            <div>
                                                <div className="box">
                                                    <div className="content-comment">
                                                        <div className="header-content">
                                                            <span>Ánh Tuyết</span>
                                                        </div>
                                                        <div className="text">
                                                            <span>Như Thùy</span>
                                                            uýnh son á haha
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="control-comment">
                                                <div className="btn-like">Thích</div>
                                                <span> · </span>
                                                <div className="btn-comment">Phản hồi</div>
                                                <span> · </span>
                                                <span className="moment-time">20 giờ trước</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
      
    );
};


CommentMovie.propTypes = {

};


export default CommentMovie;
