import { useState } from 'react'
import products from '../../data/products.json'
import styles from './ComponentDemo.module.css'

const versions = ['v3.2', 'v2.8', 'v4.0', 'v1.5', 'v3.0']
const sizes = ['2.4MB', '3.1MB', '5.8MB', '1.2MB', '4.5MB']

export default function DatasheetHub() {
    const [toast, setToast] = useState(null)

    const showToast = () => {
        setToast('데모 버전입니다. 실제 서비스에서 제공됩니다.')
        setTimeout(() => setToast(null), 2000)
    }

    return (
        <div>
            <p className={styles.caption}>
                {"바이어가 가장 많이 하는 요청: '데이터시트 보내주세요.'\n이제 바이어가 직접 다운로드합니다. 24시간."}
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
                            📥 {p.downloads}회 다운로드
                        </div>
                        <div className={styles.dsActions}>
                            <button
                                className={`${styles.dsBtn} ${styles.dsBtnPrimary}`}
                                onClick={showToast}
                            >
                                다운로드
                            </button>
                            <button
                                className={`${styles.dsBtn} ${styles.dsBtnGhost}`}
                                onClick={showToast}
                            >
                                미리보기
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {toast && <div className={styles.toast}>{toast}</div>}
        </div>
    )
}
