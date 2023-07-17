/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'

import { useState } from 'react'


export function Comment({ content, onDeleComment }) {

    const [linkCount, setLikeCount] = useState(0);

    function handleDeleComment() {
        onDeleComment(content)
    }
    function handleLikeComment() {
        // setLikeCount(linkCount + 1)
        setLikeCount((value) => {
            return value + 1
        })
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src='https://github.com/allef-Reis.png' />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime} >
                            <strong> Allef Reis </strong>
                            <time title='Publicado em 6 de julho de 2022' dateTime='2022-07-06 18:21:00'>Cerca de 1h atrás</time>
                        </div>
                        <button title='Deletar Comentário'>
                            <Trash size={24} title='Deletar Comentário' onClick={handleDeleComment} />
                        </button>
                    </header>
                    <p> {content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp size={20} /> Aplaudir <span> {linkCount} </span>
                    </button>
                </footer>
            </div>
        </div>
    )
}