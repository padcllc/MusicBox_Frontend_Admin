import { Slider } from 'antd';

import like from '../../assets/icons/like.svg';
import shuffle from '../../assets/icons/shuffle.svg';
import previous from '../../assets/icons/previous.svg';
import Play from '../../assets/icons/Play.svg';
import next from '../../assets/icons/next.svg';
import repeate from '../../assets/icons/repeate.svg';

import volume from '../../assets/icons/volume.svg';
import lirik from '../../assets/icons/lirik.svg';
import { useEffect, useRef, useState } from 'react';

import YouTube from 'react-youtube';
import { ISongsData } from '../../models/songs';
import axios from 'axios';
import { CaretRightOutlined, YoutubeOutlined } from '@ant-design/icons';

import { message } from 'antd';


export interface IPlayerProps {
    songItem: ISongsData;
}


export interface IVideoInfoData {
    title: string;
    thumbnails: {
        default: {
            url: string;
        }
    }
    descriptions: string;
}

export function Player({ songItem }: IPlayerProps) {
    const [disabled, setDisabled] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [videoInfo, setVideoInfo] = useState<any>(null);

    const [player, setPlayer] = useState<any>(null);
    const [pause, setPause] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [openYoutube,setOpenYoutube] =useState<boolean>(false);

    const videoRef = useRef<any>(null);



    const opts = {
        width: '100%',
        playerVars: {
            autoplay: 0, // Set to 1 if you want the video to auto-play
        },
    };

    useEffect(() => {
        if (songItem) {
            setVideoUrl(songItem?.url);
        }
    }, [songItem]);

    useEffect(() => { ///send url from props
        if (videoUrl) {
            const videoIdRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))(.*?)(?=\?|&| #|$)/;
            const match = videoUrl.match(videoIdRegex);
            if (match) {
                setVideoId(match[1]);
            }
        }

    }, [videoUrl]);

    useEffect(() => { /////get youtube video information
        const apiKey = 'AIzaSyBZh9VXDvRtB-as5RTcovwJzwiPZbRhA2U';
        if (videoId) {
            axios
                .get(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=snippet`)
                .then((response) => {
                    const video = response.data.items[0];
                    setVideoInfo(video.snippet);
                })
                .catch((error) => {
                    console.error('Error fetching video information', error);
                });
        }
    }, [videoId]);

    const handleCopyText = () => { ////copy link function 
        navigator.clipboard.writeText(videoUrl)
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Text copied to clipboard:' + videoUrl,
                });
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: 'Copy failed:' + error,
                });
            });
    };

    const onPlayerReady = (event: any) => { ///play video
        setPlayer(event.target);
    };


    const restartVideo = () => {///restart video function
        const player = videoRef.current.getInternalPlayer();
        player.seekTo(0);
        player.playVideo();
        setPause(true);
    };

    return (
        <>
            <div>
                {videoInfo && (
                    <>
                        {contextHolder}
                        <div className="player">
                            <div className="player_content">
                                <div className="song_info">
                                    <img src={videoInfo?.thumbnails?.default?.url} alt="Video Thumbnail" className="song_img" />
                                    <div className='song_title_info'>
                                        <p className='song_name'>{videoInfo?.title}</p>
                                    </div>
                                    <button className='like'><img src={like} /></button>
                                </div>
                                <div className='play_content'>
                                    <img src={shuffle} />
                                    <img src={previous} className='previous_img' />
                                    {
                                        !pause ?
                                            <div className='play_img_content'>
                                                <CaretRightOutlined className='play_img' onClick={(() => {
                                                    player.playVideo()
                                                    setPause(true)
                                                })} /> </div> :
                                            <div>
                                                <img src={Play} onClick={(() => {
                                                    player.pauseVideo()
                                                    setPause(false)

                                                })} />
                                            </div>

                                    }
                                    <img src={next} className='next_img' />
                                    <img src={repeate} onClick={restartVideo} />
                                </div>
                                <div className='low_contet'>
                                    <p className='sound_time'>1:45 / 4:42</p>
                                    <img src={volume} />
                                    <Slider className="slider" defaultValue={30} disabled={disabled} />
                                    <img src={lirik} onClick={handleCopyText} />
                                    <YoutubeOutlined  className='youtube_icon' onClick={(()=>{
                                        setOpenYoutube(!openYoutube)
                                    })}/>
                                </div>
                            </div>

                        </div>
                        <div>
                        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} ref={videoRef}    style={ {opacity: openYoutube ? '1' : '0' } } />
                        </div>

                        
                    </>
                )}

            </div>

        </>
    )
}

