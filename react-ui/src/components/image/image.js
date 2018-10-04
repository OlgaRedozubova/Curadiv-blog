import React  from "react";
import env from 'dotenv';

//require('dotenv').config();

import {Image} from "react-bulma-components";
const path = process.env.REACT_URL_IMG || 'https://curadiv-test.s3.amazonaws.com/';

const getImage = (img = '', slot = 0) => {
    console.log('getImage => ', img, slot);
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
    //const path = process.env.REACT_URL_IMG || '/static/media/';
    console.log('ENV => ', path);
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

export default getImage;