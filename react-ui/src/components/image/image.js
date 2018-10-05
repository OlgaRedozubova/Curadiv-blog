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
            <Image src={url}/>
        )
    } else {
        const url = path + img;
        console.log('url => ', url);
        return (
            <Image src={url}/>
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