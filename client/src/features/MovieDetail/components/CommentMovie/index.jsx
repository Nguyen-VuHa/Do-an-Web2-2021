import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './comment_movie.scss';
import Ratingstar from './components/RatingStar';
import Usercomment from './components/UserComment';
import moment from 'moment';
import Images from '../../../../contants/image';

const CommentMovie = () => {
    const [isComment, setisComment] = useState(-1);
    const [ratingStar, setRatngStar] = useState(0);
    const params = useParams();
    const comments = useSelector((state) => state.comments);
    
    const { data } = comments;
    
    return (
        <>
            <div className="container">
                <div className="comment-movie">
                    <Ratingstar setRatngStar={setRatngStar} ratingStar={ratingStar}/>
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
                                                            <img src={item.Account.avartar ? item.Account.avartar : Images.DefaultAvatar } alt="Not User"/>
                                                        </div>
                                                        <div className="comment-box">
                                                            <div>
                                                                <div className="box">
                                                                    <div className="content-comment">
                                                                        <div className="header-content">
                                                                            <span>{ item.Account.fullname }</span>
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
                                                                <div 
                                                                    className={isComment === item.id ? "btn-comment active" : "btn-comment"}
                                                                    onClick={() => {
                                                                        if(isComment === item.id)
                                                                            setisComment(-1);
                                                                        else
                                                                            setisComment(item.id);
                                                                    }}
                                                                >Phản hồi</div>
                                                                <span> · </span>
                                                                <span className="moment-time">{momentTime}</span>
                                                            </div>
                                                            <div style={isComment === item.id ? {display: 'block'} :  {display: 'none'}}>
                                                                <Usercomment 
                                                                    textPlaceholder="Viết phản hồi..." maxWidth={600}
                                                                    parentCommentId={item.id}
                                                                    setisComment={setisComment}
                                                                    movieId={params.movieId}
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div>
                                                        { item.FeedbackComments 
                                                            && item.FeedbackComments.map((data) => {
                                                                moment.locale('vi');
                                                                const momentTime =  moment(data.createdAt).fromNow();
                                                                return  <div className="dependent-comment" key={data.id}>
                                                                                <div className="img-user">
                                                                                    <img src={data.ParentComment.avartar ? data.ParentComment.avartar : Images.DefaultAvatar } alt="Not User"/>
                                                                                </div>
                                                                                <div className="comment-box">
                                                                                    <div>
                                                                                        <div className="box">
                                                                                            <div className="content-comment">
                                                                                                <div className="header-content">
                                                                                                    <span>{ data.ParentComment.fullname}</span>
                                                                                                </div>
                                                                                                <div className="text">
                                                                                                    <span>{item.Account.fullname === data.ParentComment.fullname && data.ChildrenComment?.idUser === data.ParentComment.idUser ? '' : data.ChildrenComment && data.ChildrenComment.idUser === data.ParentComment.idUser ? '' : data.ChildrenComment ? data.ChildrenComment.fullname : item.Account.fullname}</span>
                                                                                                    {data.comments}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="control-comment">
                                                                                        <div className="btn-like">Thích</div>
                                                                                        <span> · </span>
                                                                                        <div className="btn-comment" onClick={() => {
                                                                                            if(isComment === data.id)
                                                                                                setisComment(-1);
                                                                                            else
                                                                                                setisComment(data.id);
                                                                                        }}>Phản hồi</div>
                                                                                        <span> · </span>
                                                                                        <span className="moment-time">{ momentTime }</span>
                                                                                    </div>
                                                                                    <div style={isComment === data.id ? {display: 'block'} :  {display: 'none'}}>
                                                                                        <Usercomment 
                                                                                            textPlaceholder="Viết phản hồi..." maxWidth={600}
                                                                                            parentCommentId={item.id}
                                                                                            setisComment={setisComment}
                                                                                            movieId={params.movieId}
                                                                                            idRecipients={data.ParentComment.idUser}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                }) 
                                : ''
                            }
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
