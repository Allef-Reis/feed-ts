import { Avatar } from './Avatar';
import styles from './Sidebar.module.css'
import { PencilLine } from 'phosphor-react'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src='https://images.unsplash.com/photo-1538991383142-36c4edeaffde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=40'></img>
            <div className={styles.profile}>
                <Avatar src='https://github.com/allef-Reis.png' />
                <strong> Allef Reis</strong>
                <span> Consult react</span>
            </div>
            <footer>
                <a href='#'> <PencilLine size={20} /> Editar seu perfil</a>
            </footer>
        </aside>
    );
}