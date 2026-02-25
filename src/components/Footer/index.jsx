import styles from './Footer.module.css'

const navLinks = [
    { label: '현실 진단', href: '#pain-points' },
    { label: '핵심 기능', href: '#features' },
    { label: '진행 방식', href: '#process' },
    { label: '데모', href: '#demo' },
    { label: '무료 진단', href: '#contact' },
]

const techStack = [
    'React 19', 'Vite 7', 'Vercel Edge',
    'n8n', 'Google Sheets API', 'Framer Motion',
]

export default function Footer() {
    const year = new Date().getFullYear()

    const handleNav = (e, href) => {
        e.preventDefault()
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <a href="#" className={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                            ▲ AUTO-ADAS
                        </a>
                        <p className={styles.brandDesc}>
                            차세대 모빌리티를 위한 초정밀 ADAS 솔루션.{'\n'}
                            멀티 센서 퓨전과 실시간 엣지 AI.
                        </p>
                    </div>

                    <nav className={styles.nav} aria-label="푸터 네비게이션">
                        <h4 className={styles.colTitle}>바로가기</h4>
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} onClick={(e) => handleNav(e, link.href)}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className={styles.tech}>
                        <h4 className={styles.colTitle}>기술 스택</h4>
                        <div className={styles.techTags}>
                            {techStack.map((t) => (
                                <span key={t} className={styles.tag}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.bottom}>
                    <p className={styles.copy}>© {year} AUTO-ADAS. Powered by Edge AI.</p>
                    <div className={styles.links}>
                        <a href="#">개인정보처리방침</a>
                        <a href="#">이용약관</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
