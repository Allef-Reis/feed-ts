/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import uuid from 'react-uuid';

import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
// import { Post } from "./components/Post"

import './global.css'
import styles from './App.module.css'
import { Post } from './components/Post';

const posts = [
  {
    id: uuid(),
    author: {
      avatarURL: 'https://github.com/maykbrito.png',
      name: 'Allef santos',
      role: 'Consult SharePoint'
    },
    content: [
      { type: 'paragraph', content: 'Fala galera!' },
      { type: 'paragraph', content: 'commmit de mais um post ' },
      { type: 'link', content: 'github.allef' },
    ],
    publishedAt: new Date('2023-07-15 09:43:00')
  },
  {
    id: uuid(),
    author: {
      avatarURL: 'https://github.com/allef-reis.png',
      name: 'Allef Reis',
      role: 'Consult React'
    },
    content: [
      { type: 'paragraph', content: 'Fala galera!' },
      { type: 'paragraph', content: 'commmit de mais um post ' },
      { type: 'link', content: 'github.allef' },
    ],
    publishedAt: new Date('2023-07-12 09:43:00')
  }
]

function App() {

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (<Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />)
          })}
        </main>
      </div>
    </>
  )
}

export default App
