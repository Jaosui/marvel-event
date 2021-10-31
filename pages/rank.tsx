import React, { ReactElement } from 'react'
import HeadTag from '../component/Header'
import Theme from '../styles/Theme.module.css'
// import { test3 } from '../utils/handleFirebase';

interface Props {
    
}

export default function rank({}: Props): ReactElement {
    const commentsData = [
        {
          userId: "001",
          displayName: "Slyfer2812",
          pictureUrl: `https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/avatar%2F2624893_avengers_iron%20man_marvel_super%20hero_icon.png?alt=media&token=b32f1bff-5d2a-4ba0-8248-80c120fba985`,
          comment:
            "The first time I have seen this Green Goblin grenade I was 5 years old. 21 now.",
          date: "Jan 13, 2021",
        },{
            userId: "002",
            displayName: "Faiz Patel",
            pictureUrl: `https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/avatar%2F2624896_avengers_captain_captain%20america_super%20hero_icon.png?alt=media&token=78e9073a-5e69-495f-8a4f-4683a3c59b74`,
            comment: `If you've grown with all the 3 Spider-Men, then you're something of a legend yourselves 😁`,
            date: "Oct 12, 2021",
          }
      ];
    const testFn = () => {
        // test3()
    }
    return (
        <div >
            <HeadTag/> 
            rank
            <button
                  key="1"
                  className={Theme.btnLogin}
                  onClick={testFn}
                >
                  TEST
                </button>
        </div>
    )
}
