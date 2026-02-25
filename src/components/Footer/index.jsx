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
                            ▲ IT-B2B
                        </a>
                        <p className={styles.brandDesc}>
                            B2B 임베디드 기업을 위한 자동화 웹 인프라.{'\n'}
                            디자인 미팅 0회. 5일 완성.
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
                    <p className={styles.copy}>© {year} IT Embedded. Built with React + Vercel.</p>
                    <div className={styles.links}>
                        <a href="#">개인정보처리방침</a>
                        <a href="#">이용약관</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
