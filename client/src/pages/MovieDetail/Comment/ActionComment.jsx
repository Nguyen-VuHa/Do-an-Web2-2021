import React, { useState } from 'react';
import { ActionCommentLayout, ButtonAction } from './Comment.Style';
import InputComment from './InputComment';

const ActionComment = ({ createdAt }) => {
  
    const [activeComment, setActiveComment] = useState(false);

    return (
        <>
            <ActionCommentLayout>
                <ButtonAction>Thích</ButtonAction>
                <span> · </span>
                <ButtonAction
                    onClick={() => setActiveComment(!activeComment)}
                >
                    Phản hồi
                </ButtonAction>
                <span> · </span>
                <ButtonAction className="no-hover">{ createdAt }</ButtonAction>
            </ActionCommentLayout>
            {
                activeComment && <InputComment placeholder="Phản hồi về bình luận này..."/>
            }
        </>
    );
};


export default ActionComment;
