import { Slider } from 'antd';

import like from '../../assets/icons/like.svg';
import shuffle from '../../assets/icons/shuffle.svg';
import previous from '../../assets/icons/previous.svg';
import Play from '../../assets/icons/Play.svg';
import nextIcon from '../../assets/icons/next.svg';
import repeate from '../../assets/icons/repeate.svg';

import sound from '../../assets/icons/volume.svg';
import soundoff from '../../assets/icons/sound_off.png';
import lirik from '../../assets/icons/lirik.svg';
import { useEffect, useRef, useState } from 'react';

import YouTube from 'react-youtube';
import axios from 'axios';
import { CaretRightOutlined, YoutubeOutlined } from '@ant-design/icons';

import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { playerSongItemInformationSelector, updateStatus, updatevideoIsPlaying } from './slice';

let interval: any;


export interface IVideoInfoData {
    title: string;
    thumbnails: {
        default: {
            url: string;
        }
    }
    descriptions: string;
}

export function Player() {
    const dispatch = useDispatch();
    const [videoUrl, setVideoUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [videoInfo, setVideoInfo] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [player, setPlayer] = useState<any>();
    const [messageApi, contextHolder] = message.useMessage();
    const [openYoutube, setOpenYoutube] = useState<boolean>(true);

    const videoRef = useRef<any>(null);

    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState<number>(50);

    const playerSongItem = useSelector(playerSongItemInformationSelector);

    const [duration, setDuration] = useState();
    const [currentTime, setCurrentTime] = useState();


    const opts = {
        width: '100%',
        with: '360',
        playerVars: {
            autoplay: 1,
        },
    };

    const formatTime = (time: any) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const sec_num = Math.floor(time % 60);
        const formattedTime = `${minutes.toString().padStart(1, '0')}:${sec_num.toString().padStart(2, '0')}`;
        return formattedTime;
    };

    useEffect(() => {
        if (player) {
            setDuration(player.getDuration());
        }

    }, [player]);

    useEffect(() => {
        if (playerSongItem) {
            setVideoUrl(playerSongItem?.url);
        }
    }, [playerSongItem]);


    useEffect(() => { ///send url from dispatch
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
                })
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
    };


    const toggleSound = () => {
        const soundPlay = videoRef.current.getInternalPlayer();
        if (isMuted) {
            soundPlay.unMute();
        } else {
            soundPlay.mute();
        }
        setIsMuted(!isMuted);
    };


    const soundOff = () => {
        if (volume === 0) {
            setVolume(50);
        }
        else {
            return false;
        }

    }

    const handleVolumeChange = (newVolume: number) => {
        if (player) {
            setVolume(newVolume); // Update the state with the new volume
            player.setVolume(newVolume); // Set the volume on the player
            if (newVolume === 0) {
                setIsMuted(true);
            }
            else if (newVolume > 0) {
                setIsMuted(false);
            }
        }
    };

    const onStateChange = (event: any) => {
        const playerState = event.data;
        // Check for the YouTube player state
        if (playerState === 1) { ///Video is playing
            setIsPlaying(true);
            dispatch(updatevideoIsPlaying(true as any));
            setDuration(player.getDuration());
            if (interval) {
                clearInterval(interval);
            }
            interval = setInterval(() => {
                setCurrentTime(player.getCurrentTime());
            }, 1000);

            return () => {
                clearInterval(interval);
            }
        }
        else if (playerState === 2) { ///Video is stoped
            setIsPlaying(false);
            dispatch(updatevideoIsPlaying(false as any));
        }
        else if (playerState === 0) { ///Video has ended
            setIsPlaying(false);
            dispatch(updatevideoIsPlaying(false as any));
        }

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
                                    <img src={previous} className='previous_img' onClick={(() => {
                                        dispatch(updateStatus({ action: 'previous' } as any));
                                    })} />

                                    {
                                        !isPlaying ?
                                            <div className='play_img_content'>
                                                <CaretRightOutlined className='play_img' onClick={(() => {
                                                    player.playVideo()
                                                })} /> </div> :
                                            <div>
                                                <img src={Play} onClick={(() => {
                                                    player.pauseVideo()

                                                })} />
                                            </div>
                                    }

                                    <img src={nextIcon} className='next_img'
                                        onClick={(() => {
                                            dispatch(updateStatus({ action: 'next' } as any));
                                        })}
                                    />
                                    <img src={repeate} onClick={restartVideo} />
                                </div>
                                <div className='low_contet'>
                                    <p className='sound_time'>
                                        <>
                                            {
                                                currentTime ? <>{formatTime(currentTime)}</> : <>0:00</>
                                            }
                                            /
                                            {
                                                duration ? <>{formatTime(duration)}</> : <></>
                                            }
                                        </>

                                    </p>

                                    <div onClick={toggleSound}>
                                        {isMuted ? <p onClick={soundOff}><img src={soundoff} /></p> : <img src={sound} />}
                                    </div>
                                    <input
                                        className="slider"
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                                    />
                                    <img src={lirik} onClick={handleCopyText} />
                                    <YoutubeOutlined className='youtube_icon'
                                        onClick={(() => {
                                            setOpenYoutube(!openYoutube)
                                        })} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <YouTube
                                videoId={videoId}
                                opts={opts}
                                onReady={onPlayerReady}
                                onStateChange={onStateChange}
                                ref={videoRef}
                                style={{ display: openYoutube ? 'block' : 'none' }}
                            />
                        </div>
                    </>
                )}
            </div>

        </>
    )
}

