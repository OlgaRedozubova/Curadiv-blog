import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';

import { getImageArticle } from "../image/image";

class ArticleBody extends Component {
    render() {
        const { body, image1='01.png', image2='02.png' } = this.props;

        const Image1 = () => (
            getImageArticle(image1)
        );
        const Image2 = () => (
            getImageArticle(image2)
        );

        return(
            <div>
                <Markdown
                    className='article__body'
                    children={body}
                    options={{
                        overrides: {
                            Image1: {
                                component: Image1,
                            },
                            Image2: {
                                component: Image2,
                            },
                        },
                    }}
                />

            </div>
        )
    }

}

export default ArticleBody;