import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { addComments, addFeedbackComments, getAllComments } from '../commentSlice';
import Images from '../../../../../contants/image';
import socketIO from 'socket.io-client';
import { useParams } from 'react-router';

// const ENDPOINT='ws://localhost:8900';
const ENDPOINT='/';
let socket =  socketIO(ENDPOINT, { transports:['websocket']});


const Usercomment = ({ textPlaceholder, maxWidth, movieId, ratingStar, setRatngStar, parentCommentId, setisComment, idRecipients }) => {
    const [textComment, settextComment] = useState('');
    const [statusFocus, setStatusFocus] = useState(false);
    const stateImage = useSelector((state) => state.avartar);
    const dispatch = useDispatch();
    const params = useParams();
    const textCommentRef = useRef();
    const infoUser = JSON.parse(localStorage.getItem('user-info'));
    
    const removeText = () => {
        if(textCommentRef.current)
            textCommentRef.current.textContent = "";
    }

    const handleSubmitComments = async () => {
            if(infoUser) {
                if(ratingStar !== 0) {
                    if(textComment) { 
                        if(parentCommentId)
                        {
                            const data = {
                                comments: textComment,
                                idUser: infoUser.id,
                                idComment:parentCommentId,
                                idChidrenUser: idRecipients,
                            }
                            settextComment('');
                            removeText();
                            setStatusFocus(false);
                            setisComment(-1);
                            const res = await dispatch(addFeedbackComments(data));
                            const result = unwrapResult(res);
                            socket.emit('joinRoom', {idComments: params.movieId});
                            if(result.status === 200)
                                dispatch(getAllComments(movieId));
                            else
                                toast.error('Comment Error!!!');
                        }
                        else {
                            const data = {
                                comments: textComment,
                                pointRating: ratingStar,
                                idUser: infoUser.id,
                                movieId: movieId,
                            }
                            settextComment('');
                            removeText();
                            setStatusFocus(false);
                            setRatngStar(0);
                            const res = await dispatch(addComments(data));
                            const result = unwrapResult(res);
                            socket.emit('joinRoom', {idComments: params.movieId});
                            if(result.status === 200)
                                dispatch(getAllComments(movieId));
                            else
                                toast.error('Comment Error!!!');
                        }
                    }
                    else
                        toast.info('Bạn cần nhập gì đó!!!');
                }
                else
                    toast.info('Bạn cần đánh giá trước khi bình luận!');
            }
            else
                toast.info('Bạn cần đăng nhập để bình luận!');
    }

    return (
        <>
            <div className="user-comment">
                <img className="user-avartar" src={ stateImage.imageUrl ? stateImage.imageUrl : Images.DefaultAvatar } alt="Not Avartar" />
                <div 
                    ref={textCommentRef}
                    id="text-comment" className="text-comment" contentEditable="true" 
                    placeholder={ textComment ? '' : textPlaceholder } role="textbox" 
                    aria-multiline="true" spellcheck="false"
                    onInput={(e) => settextComment(e.currentTarget.textContent)}
                    onFocus={() => setStatusFocus(true)}
                    style={maxWidth ? { maxWidth: `${maxWidth}px`,content: '' } : {content: '' }}
                >
                </div>
                {
                    statusFocus ? 
                    <div className="comment-action">
                        <button className="btn btn-danger mr-2" onClick={() => {
                            settextComment('');
                            setStatusFocus(false);
                            removeText();
                            
                        }}>Hủy</button>
                        <button 
                            className="btn btn-info"
                            onClick={() => handleSubmitComments()}
                        >Bình luận</button>
                    </div>
                    : ''
                }
            </div>
        </>
    );
};


Usercomment.propTypes = {

};


export default Usercomment;
