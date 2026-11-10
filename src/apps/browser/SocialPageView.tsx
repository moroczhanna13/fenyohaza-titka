import { useEffect, type Dispatch } from 'react'
import type { SocialPage } from '../../story/types'
import type { GameAction } from '../../state/gameState'
import { photoUrl } from '../gallery/format'
import styles from './Social.module.css'

/** "Vidor Ilona" → "VI" */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => /^\p{Lu}/u.test(word))
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
}

/** A social profile: header with name and details, then the posts with their comments. */
export default function SocialPageView({ page, dispatch }: Readonly<{ page: SocialPage; dispatch: Dispatch<GameAction> }>) {
  useEffect(() => dispatch({ type: 'visitPage', page: page.id }), [dispatch, page.id])

  return (
    <div className={styles.social}>
      <p className={styles.brand}>{page.title.split(' – ')[0]}</p>
      <header className={styles.profile}>
        <div className={styles.cover} aria-hidden="true" />
        <span className={styles.avatar} data-type={page.profileType} aria-hidden="true">
          {initials(page.name)}
        </span>
        <h2 className={styles.name}>{page.name}</h2>
        {page.about && <p className={styles.about}>{page.about}</p>}
        {page.details && page.details.length > 0 && (
          <ul className={styles.details}>
            {page.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        )}
      </header>
      <ol className={styles.feed} aria-label="Bejegyzések">
        {page.posts.map((post) => (
          <li key={`${post.time}-${post.text}`} className={styles.post}>
            <p className={styles.postMeta}>
              <span className={styles.postAuthor}>{post.author}</span>
              <span className={styles.postTime}>{post.time}</span>
            </p>
            <p className={styles.postText}>{post.text}</p>
            {post.image && <img className={styles.postImage} src={photoUrl(post.image.src)} alt={post.image.alt} />}
            {post.likes !== undefined && (
              <p className={styles.likes}>
                <span aria-hidden="true">♥ </span>
                {post.likes} kedvelés
              </p>
            )}
            {post.comments && post.comments.length > 0 && (
              <ul className={styles.comments} aria-label="Hozzászólások">
                {post.comments.map((comment) => (
                  <li key={`${comment.author}-${comment.text}`} className={styles.comment}>
                    <span className={styles.commentAuthor}>{comment.author}</span> {comment.text}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
