import { Slider } from 'antd';

import song_img from '../../assets/images/song_item.svg';
import like from '../../assets/icons/like.svg';
import shuffle from '../../assets/icons/shuffle.svg';
import previous from '../../assets/icons/previous.svg';
import Play from '../../assets/icons/Play.svg';
import next from '../../assets/icons/next.svg';
import repeate from '../../assets/icons/repeate.svg';

import volume from '../../assets/icons/volume.svg';
import lirik from '../../assets/icons/lirik.svg';
import { useEffect, useState } from 'react';

import YouTube, { YouTubeProps } from 'react-youtube';
import { ISongsData } from '../../models/songs';


export interface IPlayerProps {
    songItem: ISongsData;
}



export function Player({ songItem }: IPlayerProps) {
    const [disabled, setDisabled] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [openYoutube,setOpenYoutube] = useState<boolean>();
    
    const [thumbnailUrl, setThumbnailUrl] = useState('');


    const opts = {
        height: '390',
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

    useEffect(() => {
        if (videoUrl) {
            const videoIdRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))(.*?)(?=\?|&| #|$)/;
            const match = videoUrl.match(videoIdRegex);
            if (match) {
                setVideoId(match[1]);
            }
        }

    }, [videoUrl]);


    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    return (
        <>
            <div className="player">

                <div className="player_content">
                    <div className="song_info">
                        <img src={song_img} className="song_img" />
                        <div className='song_title_info'>
                            <p className='song_name'>{songItem?.name}</p>
                            <p className='songer'>Lana Del Rey</p>
                        </div>
                        <button className='like'><img src={like} /></button>
                    </div>
                    <div className='play_content'>
                        <img src={shuffle} />
                        <img src={previous} className='previous_img' />
                        <img src={Play}/>
                        <img src={next} className='next_img' />
                        <img src={repeate} />
                    </div>
                    <div className='low_contet'>
                        <p className='sound_time'>1:45 / 4:42</p>
                        <img src={volume} />
                        <Slider className="slider" defaultValue={30} disabled={disabled} />
                        <img src={lirik} />
                    </div>
                </div>
            </div>
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
        </>
    )
}

