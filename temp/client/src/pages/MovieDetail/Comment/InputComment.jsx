import React, { useRef, useState, useEffect, useContext } from 'react';
import { LayoutInputComment, AvatarComment, CommentText, CommentAction } from './Comment.Style';
import Images from 'src/contants/image';
import { AuthContext } from 'src/contexts/authContext';

const InputComment = ({ placeholder, onSubmit, clearText }) => {
    const textCommentRef = useRef();

    const [statusFocus, setStatusFocus] = useState(false);
    const [textComment, setTextComment] = useState('');

    const { state } = useContext(AuthContext);
    const { avartar } = state;
    
    const removeText = () => {
        if(textCommentRef.current)
            textCommentRef.current.textContent = "";
    }

    useEffect(() => {
        if(clearText === true) {
            removeText();
        }
    }, [clearText]);

    return (
        <LayoutInputComment>
            <AvatarComment 
                src={ avartar ? avartar : Images.DefaultAvatar } 
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
