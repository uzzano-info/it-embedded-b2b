import styles from './Footer.module.css'

const navLinks = [
    { label: 'Bottleneck', href: '#pain-points' },
    { label: 'Core Tech', href: '#features' },
    { label: 'Process', href: '#process' },
    { label: 'Demo', href: '#demo' },
    { label: 'Contact', href: '#contact' },
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
                            Next-gen software-defined ADAS solutions.{'\n'}
                            Multi-sensor fusion & real-time edge AI.
                        </p>
                    </div>

                    <nav className={styles.nav} aria-label="Footer Navigation">
                        <h4 className={styles.colTitle}>Quick Links</h4>
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
                        <h4 className={styles.colTitle}>Tech Stack</h4>
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
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
