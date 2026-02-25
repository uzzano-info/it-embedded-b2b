import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import styles from './Header.module.css'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 100)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [mobileOpen])

    const handleNavClick = (e, href) => {
        e.preventDefault()
        setMobileOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    const links = [
        { href: '#features', label: '핵심 기능' },
        { href: '#process', label: '진행 방식' },
        { href: '#demo', label: '데모' },
    ]

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.inner}`}>
                <a
                    href="#"
                    className={styles.logo}
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    aria-label="페이지 상단으로"
                >
                    ▲ IT-B2B
                </a>

                <nav className={styles.nav} aria-label="메인 내비게이션">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
                            {l.label}
                        </a>
                    ))}
                </nav>

                <a href="#contact" className={`accent-btn ${styles.cta}`} onClick={(e) => handleNavClick(e, '#contact')}>
                    무료 진단 요청 →
                </a>

                <button
                    className={styles.hamburger}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile overlay */}
            <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ''}`}>
                <nav className={styles.mobileNav} aria-label="모바일 내비게이션">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
                            {l.label}
                        </a>
                    ))}
                    <a href="#contact" className="accent-btn" style={{ marginTop: '16px', width: '100%', textAlign: 'center' }} onClick={(e) => handleNavClick(e, '#contact')}>
                        무료 진단 요청 →
                    </a>
                </nav>
            </div>
        </header>
    )
}
