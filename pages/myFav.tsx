import React, { ReactElement } from 'react'
import HeadTag from '../component/Header'

interface Props {
    
}

export default function myFav({}: Props): ReactElement {
    return (
        <div>
            <HeadTag/>
            fav
        </div>
    )
}
