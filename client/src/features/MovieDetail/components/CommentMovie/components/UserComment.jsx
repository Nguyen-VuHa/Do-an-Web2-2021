import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { addComments, getAllComments } from '../commentSlice';

const Usercomment = ({ textPlaceholder, maxWidth, movieId, ratingStar, setRatngStar }) => {
    const [textComment, settextComment] = useState('');
    const [statusFocus, setStatusFocus] = useState(false);
    const dispatch = useDispatch();
    const infoUser = JSON.parse(localStorage.getItem('user-info'));

    const removeText = () => {
        let textComment = document.getElementById("text-comment");
        textComment.textContent = "";
    }

    const handleSubmitComments = async () => {
            if(infoUser) {
                if(ratingStar !== 0) {
                    if(textComment) { 
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
                        if(result.status === 200)
                            dispatch(getAllComments(movieId));
                        else
                            toast.error('Comment Error!!!');
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
                <img className="user-avartar" src="https://graph.facebook.com/1669001479976443/picture?width=400&amp;height=400" alt="Nguyễn Vũ Hạ" />
                <div 
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
