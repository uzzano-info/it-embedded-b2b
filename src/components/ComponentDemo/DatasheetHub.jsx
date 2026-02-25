import { useState } from 'react'
import products from '../../data/products.json'
import styles from './ComponentDemo.module.css'

const versions = ['v3.2', 'v2.8', 'v4.0', 'v1.5', 'v3.0']
const sizes = ['2.4MB', '3.1MB', '5.8MB', '1.2MB', '4.5MB']

export default function DatasheetHub() {
    const [toast, setToast] = useState(null)

    const showToast = () => {
        setToast('Demo version. Available in production.')
        setTimeout(() => setToast(null), 2000)
    }

    return (
        <div>
            <p className={styles.caption}>
                {"The most common buyer request: 'Send me the datasheet.'\nNow buyers download directly. 24/7."}
            </p>

            <div className={styles.cardGrid}>
                {products.map((p, i) => (
                    <div key={p.model} className={styles.dsCard}>
                        <div className={styles.dsIcon}>📄</div>
                        <div className={styles.dsModel}>{p.model}</div>
                        <div className={styles.dsMeta}>
                            {versions[i]} · PDF · {sizes[i]}
                        </div>
                        <div className={styles.dsDownloads}>
                            📥 {p.downloads} downloads
                        </div>
                        <div className={styles.dsActions}>
                            <button
                                className={`${styles.dsBtn} ${styles.dsBtnPrimary}`}
                                onClick={showToast}
                            >
                                Download
                            </button>
                            <button
                                className={`${styles.dsBtn} ${styles.dsBtnGhost}`}
                                onClick={showToast}
                            >
                                Preview
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {toast && <div className={styles.toast}>{toast}</div>}
        </div>
    )
}
