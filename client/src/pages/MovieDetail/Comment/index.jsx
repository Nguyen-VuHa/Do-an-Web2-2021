import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutComment, MainComment, ImageUser, CommentBox,  ContentBox, CommentContent, CommentContentText, DependentComment, LayoutFetchData } from './Comment.Style';
import InputComment from './InputComment';
import RaitingStar from './RaitingStar';
import { Divider } from 'src/style-common/Layout.Style';
import Images from 'src/contants/image';
import ActionComment from './ActionComment';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { AuthContext } from 'src/contexts/authContext';
import { useParams } from 'react-router-dom';
import { addComments, clearComments, defautlCreateStatus, getAllComments } from 'src/reducers/commentSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import socketIO from 'socket.io-client';
import { ClipLoader } from 'react-spinners';
import { Green } from 'src/contants/cssContants';
import variables from 'src/contants/variablesContants';

let socket = socketIO(variables.ENDPOINT, { transports:['websocket']});

const Comment = () => {

    const commentRef = useRef();
    const [commentLoading, setCommentLoading] = useState(false);
    const [dataLoadMore, setDataLoadMore] = useState(false);

    const [isFetchComment, setIsFetchComment] = useState(1);
    const [raitingStar, setRaitingStar] = useState(0);
    const [commentActive, setCommentActive] = useState(-1);

    const [listComment, setListComment] = useState([]);

    const { state } = useContext(AuthContext);
    const { id } = state;

    const params = useParams();
    const dispatch = useDispatch();

    const accessToken = localStorage.getItem('accessToken');

    const { comments, createStatus, totalPage } = useSelector(state => state.commentState);

    const handleSubmitComment = async (textCmt) => {
        if(params && params.movieId && createStatus === 0) {
            setListComment([]);
            const data = {
                comments: textCmt,
                pointRating: raitingStar,
                idUser: id,
                movieId: params.movieId,
            }
            const statusResult = await dispatch(addComments(data));
            const result = unwrapResult(statusResult);
            socket.emit('joinRoom', {idComments: params.movieId});
            
            if(result.status === 200)
            {
                setRaitingStar(0);
                setTimeout(() => {
                    dispatch(clearComments());
                    setIsFetchComment(1);
                    dispatch(getAllComments({movieId: params.movieId, currentPage: 1}));
                    dispatch(defautlCreateStatus());
                }, 800);
            }
            else
                toast.error('Failed add comment !!!');
        }
    }

    const onActive = (idComment) => {
        if(commentActive === idComment)
            setCommentActive(-1);
        else
            setCommentActive(idComment);
    }

    useEffect(() => {
        dispatch(getAllComments({movieId: params.movieId, currentPage: isFetchComment}));
    }, []);

    useEffect(() => {
        if(comments && comments.length > 0)
        {
            setDataLoadMore(true);
            setListComment(listComment.concat(comments));
        }
        else
            setListComment([]);
    }, [comments]);

    // useEffect(() => {
    //     if(commentLoading && dataLoadMore && isFetchComment <= totalPage && totalPage !== 1) {
    //         dispatch(getAllComments({movieId: params.movieId, currentPage: isFetchComment}));
    //         setIsFetchComment(isFetchComment + 1);
    //         setDataLoadMore(false);
    //     }
    // }, [commentLoading]);

    // useEffect(() => {
    //     window.addEventListener('scroll', () => {
    //         let commentView = document.getElementById('list-comment');
    //         let footerElement = document.querySelector('#footer-app');
            
    //         if (commentView && Math.ceil(parseInt(window.scrollY + window.innerHeight) - footerElement.offsetHeight) >= commentView.clientHeight + commentView.offsetTop - footerElement.offsetHeight) {
    //             setCommentLoading(true);
    //         }
    //         else
    //             setCommentLoading(false);
    //     });

    //     return () => window.removeEventListener('scroll', () => {});
    // }, []);

    return (
        <>
            <LayoutComment>
                <RaitingStar setRaitingStar={setRaitingStar} raitingStar={raitingStar}/>
                <InputComment 
                    placeholder="Cảm nghĩ của bạn về bộ phim này ?"
                    clearText={createStatus === 1 ? true : false} 
                    onSubmit={(comment) => {
                        if(accessToken && id) {
                            if(raitingStar) {
                                if(comment) {
                                    handleSubmitComment(comment);
                                }
                                else
                                    toast.warn('Bạn hãy viết gì đó?');
                            }
                            else
                                toast.warn('Bạn chưa đánh giá! Vui lòng đánh giá trước khi bình luận.');
                        }
                        else
                            toast.warn('Cần đăng nhập để bình luận.');
                    }}
                />
                <Divider />
                <div className="w-100 h-auto mt-3" id="list-comment">
                    <ul className="p-0">
                        {
                            listComment && listComment.length > 0
                            && listComment.map((item, idx) => {
                                const { Account, FeedbackComments } = item;
                                const momentTime =  moment(item.createdAt).fromNow();
                                return <li key={idx}>
                                            <MainComment>
                                                <ImageUser>
                                                    <img src={ Account && Account.avartar ? Account.avartar :  Images.DefaultAvatar } alt="Not User"/>
                                                </ImageUser>
                                                <CommentBox>
                                                    <div>
                                                        <ContentBox className="p-1">
                                                            <CommentContent>
                                                                <div className="d-flex justify-content-between mb-1">
                                                                    <span>{ Account && Account.fullname ? Account.fullname : 'No Name'}</span>
                                                                    <span className="ml-5">Đánh giá { item.pointRating } sao</span>
                                                                </div>
                                                                <CommentContentText>
                                                                    { item.comments }
                                                                </CommentContentText>
                                                            </CommentContent>
                                                        </ContentBox>
                                                    </div>
                                                    <ActionComment 
                                                        fullname={Account.fullname} 
                                                        createdAt={momentTime}
                                                        onActive={() => onActive(item.id)}
                                                        active={item.id === commentActive ? true : false}
                                                        commentParentId={item.id}
                                                        idRecipients={item.Comment_idUser}
                                                        isFetchComment={isFetchComment}
                                                        setListComment={() => setListComment([])}
                                                    />
                                                </CommentBox>
                                            </MainComment>
                                            <DependentComment>
                                                <ul>
                                                    {
                                                        FeedbackComments && FeedbackComments.length > 0
                                                        && FeedbackComments.map((feedback, index) => {
                                                            const { ChildrenComment, ParentComment } = feedback;
                                                            const momentTime =  moment(feedback.createdAt).fromNow();
                                                            return  <li key={index}>
                                                                        <MainComment>
                                                                            <ImageUser>
                                                                                <img src={ ParentComment && ParentComment.avartar ? ParentComment.avartar : Images.DefaultAvatar } alt="Not User"/>
                                                                            </ImageUser>
                                                                            <CommentBox>
                                                                                <div>
                                                                                    <ContentBox>
                                                                                        <CommentContent>
                                                                                            <div className="d-flex justify-content-between">
                                                                                                <span>{ ParentComment && ParentComment.fullname ? ParentComment.fullname : 'No Name' }</span>
                                                                                                <span></span>
                                                                                            </div>
                                                                                            <CommentContentText>
                                                                                               <span>{ChildrenComment && ChildrenComment.idUser === ParentComment.idUser ? '' : ChildrenComment.fullname}</span> { feedback.comments }
                                                                                            </CommentContentText>
                                                                                        </CommentContent>
                                                                                    </ContentBox>
                                                                                </div>
                                                                                <ActionComment 
                                                                                    fullname={ParentComment.fullname} 
                                                                                    createdAt={momentTime}
                                                                                    onActive={() => onActive(feedback.id)}
                                                                                    active={feedback.id === commentActive ? true : false}
                                                                                    commentParentId={item.id}
                                                                                    idRecipients={ParentComment.idUser}
                                                                                />
                                                                            </CommentBox>
                                                                        </MainComment>
                                                                    </li>
                                                        })
                                                    }
                                                    
                                                </ul>    
                                            </DependentComment>
                                        </li>
                            })
                        }
                    </ul>
                    {
                        isFetchComment < totalPage && totalPage !== 0 && totalPage !== 1 ? <LayoutFetchData ref={isFetchComment < totalPage && totalPage !== 0 && totalPage !== 1 ? commentRef : null}>
                            <ClipLoader size={30} color={Green}/>
                        </LayoutFetchData> : ''
                    }
                </div>
            </LayoutComment> 
        </>
     
    );
};

export default React.memo(Comment);
