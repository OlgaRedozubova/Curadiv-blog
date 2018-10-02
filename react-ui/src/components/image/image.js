import {Image} from "react-bulma-components";
import React from "react";

const getImage = (url='') => {
    if (url) return (<Image src={require('../../assets/images/' + url)}/>);

    // return (<Image src={require('../../assets/images/'+defImg)} className={className}/>);
};

export default getImage;