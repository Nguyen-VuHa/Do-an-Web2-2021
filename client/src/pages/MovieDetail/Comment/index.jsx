import React, { useState } from 'react';
import { LayoutComment, MainComment, ImageUser, CommentBox,  ContentBox, CommentContent, CommentContentText, DependentComment } from './Comment.Style';
import InputComment from './InputComment';
import RaitingStar from './RaitingStar';
import { Divider } from 'src/style-common/Layout.Style';
import Images from 'src/contants/image';
import ActionComment from './ActionComment';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';


const Comment = () => {
    const [raitingStar, setRaitingStar] = useState(0);
    const [commentActive, setCommentActive] = useState(-1);

    const { comments } = useSelector(state => state.commentState);

    return (
        <>
            <LayoutComment>
                <RaitingStar setRaitingStar={setRaitingStar} raitingStar={raitingStar}/>
                <InputComment 
                    placeholder="Cảm nghĩ của bạn về bộ phim này ?" 
                    onSubmit={(comment) => {
                        if(raitingStar) {
                            if(comment) {
                                
                            }
                            else
                                toast.warn('Bạn hãy viết gì đó?');
                        }
                        else
                            toast.warn('Bạn chưa đánh giá! Vui lòng đánh giá trước khi bình luận.');
                    }}
                />
                <Divider />
                <div className="d-flex w-100 h-auto mt-3">
                    <ul>
                        {
                            comments && comments.length > 0
                            && comments.map((item) => {
                                const { Account, FeedbackComments } = item;
                                const momentTime =  moment(item.createdAt).fromNow();

                                return <li>
                                            <MainComment>
                                                <ImageUser>
                                                    <img src={ Account && Account.avartar ? Account.avartar :  Images.DefaultAvatar } alt="Not User"/>
                                                </ImageUser>
                                                <CommentBox>
                                                    <div>
                                                        <ContentBox>
                                                            <CommentContent>
                                                                <div className="d-flex justify-content-between">
                                                                    <span>{ Account && Account.fullname ? Account.fullname : 'No Name'}</span>
                                                                    <span className="ml-5">Đánh giá { item.pointRating } sao</span>
                                                                </div>
                                                                <CommentContentText>
                                                                    { item.comments }
                                                                </CommentContentText>
                                                            </CommentContent>
                                                        </ContentBox>
                                                    </div>
                                                    <ActionComment createdAt={momentTime}/>
                                                </CommentBox>
                                            </MainComment>
                                            <DependentComment>
                                                <ul>
                                                    {
                                                        FeedbackComments && FeedbackComments.length > 0
                                                        && FeedbackComments.map((feedback) => {
                                                            console.log(feedback);
                                                            return  <li>
                                                                        <MainComment>
                                                                            <ImageUser>
                                                                                <img src={ Images.DefaultAvatar } alt="Not User"/>
                                                                            </ImageUser>
                                                                            <CommentBox>
                                                                                <div>
                                                                                    <ContentBox>
                                                                                        <CommentContent>
                                                                                            <div className="d-flex justify-content-between">
                                                                                                <span>Full Name User Raited</span>
                                                                                                <span></span>
                                                                                            </div>
                                                                                            <CommentContentText>
                                                                                            I have a Bootstrap button, in which I overrode the styling in my stylesheet because I wanted to make the button dark, now the button has a hover effect from Bootstrap on it, how can I get rid of it? See the snippet below for the result:
                                                                                            </CommentContentText>
                                                                                        </CommentContent>
                                                                                    </ContentBox>
                                                                                </div>
                                                                                <ActionComment />
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
                </div>
            </LayoutComment> 
        </>
     
    );
};

export default Comment;
