import React, { useEffect, useRef, useState } from 'react';
import movieApi from '../../../../../../../../api/movieApi';
import { useParams } from 'react-router';

const PosterMovie = ({ setListPoster }) => {
    const params = useParams();
    
    const [image1, setImage1] = useState({
        base64: '',
        path: '',
    });
    const [image2, setImage2] = useState({
        base64: '',
        path: '',
    });
    const [image3, setImage3] = useState({
        base64: '',
        path: '',
    });
    const [image4, setImage4] = useState({
        base64: '',
        path: '',
    });

    useEffect(() => {
        if(params.movieId) {
            async function getMovieById() {
                const result = await movieApi.getPosterById(params.movieId);
                if(result.status === 200)
                {
                    setImage1({
                        base64: result.data.poster1,
                        path: '',
                    })
                    setImage2({
                        base64: result.data.poster2,
                        path: '',
                    })
                    setImage3({
                        base64: result.data.poster3,
                        path: '',
                    })
                    setImage4({
                        base64: result.data.poster4,
                        path: '',
                    })
                }
                else {
                    alert('Failed fecth poster!');
                }
                
            }
            getMovieById();
        }
    }, [params]);

    const imageRef_1 = useRef(null);
    const imageRef_2 = useRef(null);
    const imageRef_3 = useRef(null);
    const imageRef_4 = useRef(null);


    const handleImage1 = () => {
        imageRef_1.current.click();
    }

    const handleImage2 = () => {
        imageRef_2.current.click();
    }

    const handleImage3 = () => {
        imageRef_3.current.click();
    }
    const handleImage4 = () => {
        imageRef_4.current.click();
    }


    const handleChangeInput = (e) => {
        var target = e.target;
        var name = target.name;
        switch (name) {
            case 'image1':
                var files = target.files;
                if(files.length !== 0)
                {
                    let reader = new FileReader();
                    reader.readAsDataURL(files[0]);
                    reader.onload = (e) => {
                        setImage1({
                            ...image1,
                            base64: e.target.result,
                        })
                    }
                    setImage1({
                        ...image1,
                        path: e.target.value,
                    })
                }   
                break;
            case 'image2':
                var files = target.files;
                if(files.length !== 0)
                {
                    let reader = new FileReader();
                    reader.readAsDataURL(files[0]);
                    reader.onload = (e) => {
                        setImage2({
                            ...image2,
                            base64: e.target.result,
                        })
                    }
                    setImage2({
                        ...image2,
                        path: e.target.value,
                    })
                }   
                break;
            case 'image3':
                var files = target.files;
                if(files.length !== 0)
                {
                    let reader = new FileReader();
                    reader.readAsDataURL(files[0]);
                    reader.onload = (e) => {
                        setImage3({
                            ...image3,
                            base64: e.target.result,
                        })
                    }
                    setImage3({
                        ...image3,
                        path: e.target.value,
                    })
                }   
                break;
            case 'image4':
                var files = target.files;
                if(files.length !== 0)
                {
                    let reader = new FileReader();
                    reader.readAsDataURL(files[0]);
                    reader.onload = (e) => {
                        setImage4({
                            ...image4,
                            base64: e.target.result,
                        })
                    }
                    setImage4({
                        ...image4,
                        path: e.target.value,
                    })
                }   
                break;
            default:
                break;
        }
    }
    
    useEffect(() => {
        var imageChange = {
            poster1: image1.base64,
            poster2: image2.base64,
            poster3: image3.base64,
            poster4: image4.base64,
        }
        setListPoster(imageChange);
    }, [image1, image2, image3, image4]);

    return (
        <ul className="poster mt-5">
            <li className="poster-item">
                <img src={image1.base64} alt="Not Poster" className={ image1.base64 ? 'poster-item-img show' : 'poster-item-img'} />
                <div className="item-btn" onClick={() => handleImage1()}>
                    <i className={image1.base64 ? 'fal fa-plus active' : 'fal fa-plus'}></i>
                </div>
                <input 
                    type="file" id="selectedFile" 
                    className="disp-none" accept=".png, .jpg, .jpeg ,svg"
                    name="image1"
                    ref={imageRef_1}
                    value={image1.path}
                    onChange={(e) => handleChangeInput(e)}
                />
                <div className="close-btn" onClick={() => setImage1({
                    base64: '',
                    path: '',
                })}
                    ><i className={image1.base64 ? 'fal fa-times' : 'fal fa-times active'} />
                </div>
            </li>
            <li className="poster-item">
                <img src={image2.base64} alt="Not Poster" className={ image2.base64 ? 'poster-item-img show' : 'poster-item-img'} />
                <div className="item-btn" onClick={() => handleImage2()}>
                    <i className={image2.base64 ? 'fal fa-plus active' : 'fal fa-plus'}></i>
                </div>
                <input 
                    type="file" id="selectedFile" 
                    className="disp-none" accept=".png, .jpg, .jpeg ,svg" 
                    name="image2"
                    ref={imageRef_2}
                    value={image2.path}
                    onChange={(e) => handleChangeInput(e)}
                />
                <div className="close-btn" onClick={() => setImage2({
                    base64: '',
                    path: '',
                })}><i className={image2.base64 ? 'fal fa-times' : 'fal fa-times active'} /></div>
            </li>
            <li className="poster-item">
                <img src={image3.base64} alt="Not Poster" className={ image3.base64 ? 'poster-item-img show' : 'poster-item-img'} />
                <div className="item-btn" onClick={() => handleImage3()}>
                    <i className={image3.base64 ? 'fal fa-plus active' : 'fal fa-plus'}></i>
                </div>
                <input 
                    type="file" id="selectedFile" 
                    className="disp-none" accept=".png, .jpg, .jpeg ,svg" 
                    name="image3"
                    ref={imageRef_3}
                    value={image3.path}
                    onChange={(e) => handleChangeInput(e)}
                />
                <div className="close-btn"  onClick={() => setImage3({
                    base64: '',
                    path: '',
                })}><i className={image3.base64 ? 'fal fa-times' : 'fal fa-times active'}  /></div>
            </li>
            <li className="poster-item">
                <img src={image4.base64} alt="Not Poster" className={ image4.base64 ? 'poster-item-img show' : 'poster-item-img'}/>
                <div className="item-btn" onClick={() => handleImage4()}>
                    <i className={image4.base64 ? 'fal fa-plus active' : 'fal fa-plus'}></i>
                </div>
                <input 
                    type="file" id="selectedFile" 
                    className="disp-none" accept=".png, .jpg, .jpeg ,svg" 
                    name="image4"
                    ref={imageRef_4}
                    value={image4.path}
                    onChange={(e) => handleChangeInput(e)}
                />
                <div className="close-btn"  onClick={() => setImage4({
                    base64: '',
                    path: '',
                })}><i className={image4.base64 ? 'fal fa-times' : 'fal fa-times active'}  /></div>
            </li>
        </ul>
    );
};


PosterMovie.propTypes = {

};


export default PosterMovie;
