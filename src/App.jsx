import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'

// Lazy-load below-the-fold sections
const PainPoints = lazy(() => import('./components/PainPoints'))
const Features = lazy(() => import('./components/Features'))
const Process = lazy(() => import('./components/Process'))
const ComponentDemo = lazy(() => import('./components/ComponentDemo'))
const ConversionForm = lazy(() => import('./components/ConversionForm'))
const Footer = lazy(() => import('./components/Footer'))
const ChatWidget = lazy(() => import('./components/ChatWidget'))

function SectionFallback() {
    return <div style={{ minHeight: '200px' }} aria-busy="true" />
}

function App() {
    return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <Header />
            <main id="main-content">
                <Hero />
                <Suspense fallback={<SectionFallback />}>
                    <PainPoints />
                    <Features />
                    <Process />
                    <ComponentDemo />
                    <ConversionForm />
                </Suspense>
            </main>
            <Suspense fallback={null}>
                <Footer />
                <ChatWidget />
            </Suspense>
        </>
    )
}

export default App
