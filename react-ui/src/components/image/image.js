import {Image} from "react-bulma-components";
import React from "react";

const getImage = (url='', defImg="01.png") => {
    if (url) return (<Image src={require('../../assets/images/' + url)}/>);
    return (<Image src={require('../../assets/images/'+defImg)}/>);
};

export default getImage;