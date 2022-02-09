import React, { useRef, useState } from 'react';
import { LayoutInputComment, AvatarComment, CommentText, CommentAction } from './Comment.Style';
import Images from 'src/contants/image';

const InputComment = ({ placeholder, onSubmit }) => {
    const textCommentRef = useRef();

    const [statusFocus, setStatusFocus] = useState(false);
    const [textComment, setTextComment] = useState('');

    const removeText = () => {
        if(textCommentRef.current)
            textCommentRef.current.textContent = "";
    }

    return (
        <LayoutInputComment>
            <AvatarComment 
                src={ Images.DefaultAvatar } 
                alt="Not Avartar"
            />
            <CommentText 
                ref={textCommentRef}
                contentEditable="true" 
                placeholder={ textComment ? '' : placeholder ? placeholder : "Nhập bình luận" } role="textbox" 
                aria-multiline="true" spellcheck="false"
                onInput={(e) => {
                    setTextComment(e.currentTarget.textContent);
                }}
                onFocus={() => setStatusFocus(true)}
            />
            {
                statusFocus 
                ? <CommentAction>
                    <button 
                        className="btn btn-danger mr-2" 
                        onClick={() => {
                            setTextComment('');
                            setStatusFocus(false);
                            removeText();
                        }}
                    >
                        Hủy
                    </button>
                    <button 
                        className="btn btn-info"
                        onClick={() => {
                            onSubmit && onSubmit(textComment);
                            // setTextComment('');
                            // setStatusFocus(false);
                            // removeText();
                        }}
                    >Bình luận</button>
                </CommentAction>
                : ''
            }
          
        </LayoutInputComment>
    );
};

export default InputComment;
