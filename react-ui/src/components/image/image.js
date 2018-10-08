import React  from "react";

import Image from "react-bulma-components/lib/components/image";
const path = process.env.REACT_URL_IMG || 'https://curadiv-test.s3.amazonaws.com/';

export const getImage = (img = '', slot = 0) => {

    const imagesDef = [
        'podcast.png',
        '01.png',
        '02.png',
        '02.png',
        '02.png',
        '05.png',
        '05.png',
        '05.png',
        '05.png',
        '05.png',
        '05.png',
        '05.png',
        '05.png',
        '05.png'];
    if (!img) {
        const url = path + imagesDef[+slot];
        return (
            <div className="responsive-img">
                <img src={url}/>
            </div>
        )
    } else {
        const url = path + img;
        console.log('url => ', url);
        return (
            <div className="responsive-img">
                <img src={url}/>
            </div>
        )
    }
};

export const getImagePodcast = (img = '', slot = 0) => {

    const imagesDef = [
        'podcast.png'];
    if (!img) {
        const url = path + imagesDef[+slot];
        return (
            <div className="responsive-img podcast">
                <img src={url}/>
            </div>
        )
    } else {
        const url = path + img;
        console.log('url => ', url);
        return (
            <div className="responsive-img podcast">
                <img src={url}/>
            </div>
        )
    }
};

export const getImageArticle = (img = '', imgDef='', className) => {
    if (!img) {
        const url = path + imgDef;
        return (
            <Image src={url} className={className}/>
        )
    } else {
        const url = path + img;
        return (
            <Image src={url} className={className}/>
        )
    }
};