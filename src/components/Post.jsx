/* eslint-disable react/prop-types */
import { useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

export function Post({ author, publishedAt, content }) {

    const [comments, setComments] = useState(['first post, tá ok?!!'])
    const [newComments, setNewComments] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH'h'mm", { locale: ptBR });
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true });
    const isNewCommentEmpty = newComments.length === 0;

    function handleDeleCommentNewCommentChange() {
        event.target.setCustomValidity('')
        setNewComments(event.target.value)
    }
    function handleNewCommentInvalid() {
        event.target.setCustomValidity('Campo obrigatório')
    }
    function createNewComment() {
        event.preventDefault()

        setComments([...comments, newComments])
        setNewComments('')
    }
    function deleComment(commentToDelete) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete
        })

        setComments(commentsWithoutDeletedOne)
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarURL} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow} </time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}> {line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}> <a href='#'>{line.content} </a></p>
                    }
                })}
            </div>
            <form onSubmit={createNewComment} className={styles.commentForm}>
                <strong> Deixe seu feedback!</strong>
                <textarea
                    name='comment'
                    placeholder='Deixe um comentário!'
                    value={newComments}
                    onChange={handleDeleCommentNewCommentChange}
                    required
                    onInvalid={handleNewCommentInvalid}
                />
                <footer>
                    <button
                        type='submite'
                        disabled={isNewCommentEmpty}
                    > Publicar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleComment={deleComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}