import { useState, useMemo, useRef, useEffect } from 'react'
import products from '../../data/products.json'
import styles from './ComponentDemo.module.css'

const columns = [
    { key: 'model', label: 'Model' },
    { key: 'cpu', label: 'Processor' },
    { key: 'ram', label: 'Memory' },
    { key: 'tempRange', label: 'Temp Range' },
    { key: 'protocol', label: 'Interface' },
]

export default function SpecTable() {
    const [sortKey, setSortKey] = useState(null)
    const [sortAsc, setSortAsc] = useState(true)
    const [tempFilter, setTempFilter] = useState('all')
    const [protoFilter, setProtoFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [toast, setToast] = useState(null)
    const wrapRef = useRef(null)
    const [scrollable, setScrollable] = useState(false)

    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        const check = () => setScrollable(el.scrollWidth > el.clientWidth)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const showToast = (msg) => {
        setToast(msg)
        setTimeout(() => setToast(null), 2000)
    }

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortAsc(!sortAsc)
        } else {
            setSortKey(key)
            setSortAsc(true)
        }
    }

    const filtered = useMemo(() => {
        let data = [...products]

        if (search) {
            const q = search.toLowerCase()
            data = data.filter((p) => p.model.toLowerCase().includes(q))
        }

        if (tempFilter !== 'all') {
            if (tempFilter === '-40') {
                data = data.filter((p) => p.tempRange.includes('-40'))
            } else {
                data = data.filter((p) => !p.tempRange.includes('-40') && !p.tempRange.includes('-20'))
            }
        }

        if (protoFilter !== 'all') {
            data = data.filter((p) =>
                p.protocol.toLowerCase().includes(protoFilter.toLowerCase())
            )
        }

        if (sortKey) {
            data.sort((a, b) => {
                const va = a[sortKey] || ''
                const vb = b[sortKey] || ''
                const cmp = va.toString().localeCompare(vb.toString(), undefined, { numeric: true })
                return sortAsc ? cmp : -cmp
            })
        }

        return data
    }, [search, tempFilter, protoFilter, sortKey, sortAsc])

    return (
        <div>
            <p className={styles.caption}>
                {'클릭 한 번으로 정렬. 필터로 즉시 검색.\n고객사가 원하는 솔루션 스펙을 30초 안에 찾습니다.'}
            </p>

            <div className={styles.filters}>
                <select
                    className={styles.filterSelect}
                    value={tempFilter}
                    onChange={(e) => setTempFilter(e.target.value)}
                    aria-label="동작 온도 필터"
                >
                    <option value="all">동작 온도: 전체</option>
                    <option value="-40">-40°C 지원 (Automotive)</option>
                    <option value="0">일반 산업 환경용</option>
                </select>
                <select
                    className={styles.filterSelect}
                    value={protoFilter}
                    onChange={(e) => setProtoFilter(e.target.value)}
                    aria-label="통신 인터페이스 필터"
                >
                    <option value="all">통신 프로토콜: 전체</option>
                    <option value="CAN-FD">CAN-FD</option>
                    <option value="GMSL2">GMSL2</option>
                    <option value="Ethernet">Ethernet</option>
                    <option value="FPD-Link">FPD-Link III</option>
                </select>
                <input
                    className={styles.filterInput}
                    placeholder="🔍 모델 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="모델 검색"
                />
            </div>

            <div className={`${styles.tableWrap} ${scrollable ? styles.scrollable : ''}`} ref={wrapRef}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => handleSort(col.key)}
                                    className={sortKey === col.key ? styles.sorted : ''}
                                >
                                    {col.label}
                                    <span className={styles.sortIcon}>
                                        {sortKey === col.key ? (sortAsc ? '▲' : '▼') : '⇅'}
                                    </span>
                                </th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={styles.noResults}>
                                    검색 결과가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((p) => (
                                <tr key={p.model}>
                                    <td className={styles.modelCell}>{p.model}</td>
                                    <td>{p.cpu}</td>
                                    <td>{p.ram}</td>
                                    <td>{p.tempRange}</td>
                                    <td>{p.protocol}</td>
                                    <td>
                                        <button
                                            className={styles.downloadBtn}
                                            onClick={() => showToast(`📥 ${p.model} 데이터시트 다운로드 시작 (데모)`)}
                                            aria-label={`${p.model} 데이터시트 다운로드`}
                                        >
                                            📥
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {toast && <div className={styles.toast}>{toast}</div>}
        </div>
    )
}
