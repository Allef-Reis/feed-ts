import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

interface Author {
    name: string,
    role: string,
    avatarURL: string
}
interface Content {
    type: 'paragraph' | 'link',
    content: string
}
export interface PostType {
    id: string,
    author: Author,
    publishedAt: Date,
    content: Content[]
}
interface PostProps {
    post: PostType
}

export function Post({ post }: PostProps) {

    const [comments, setComments] = useState(['first post, tá ok?!!'])
    const [newComments, setNewComments] = useState('')

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH'h'mm", { locale: ptBR });
    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, { locale: ptBR, addSuffix: true });
    const isNewCommentEmpty = newComments.length === 0;

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        setComments([...comments, newComments])
        setNewComments('')
    }
    function handleNewCommentInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Campo obrigatório')
    }
    function handleDeleCommentNewCommentChange(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewComments(event.target.value)
    }
    function deleComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete
        })

        setComments(commentsWithoutDeletedOne)
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarURL} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow} </time>
            </header>
            <div className={styles.content}>
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}> {line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}> <a href='#'>{line.content} </a></p>
                    }
                })}
            </div>
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
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
                        type='submit'
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
                            onDeleteComment={deleComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}