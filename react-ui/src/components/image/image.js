import {Image} from "react-bulma-components";
import React from "react";

const getImage = (url='', defImg="01.png", className="") => {
    if (url) return (<Image src={require('../../assets/images/' + url)} className={className}/>);
    return (<Image src={require('../../assets/images/'+defImg)} className={className}/>);
};

export default getImage;