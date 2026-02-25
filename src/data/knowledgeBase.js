/**
 * Knowledge base for the AI chatbot.
 * Maps keywords/patterns to structured responses.
 */

const products = [
    {
        id: 'mcu-x200',
        name: 'MCU-X200',
        keywords: ['x200', 'mcu-x200', 'cortex-m7', 'm7'],
        specs: {
            cpu: 'ARM Cortex-M7 @ 480MHz',
            ram: '512KB SRAM',
            flash: '2MB Internal Flash',
            temp: '-40 ~ 85°C (Industrial Grade)',
            protocol: 'UART, SPI, I2C, USB 2.0',
            power: '3.3V / 최대 150mA',
            package: 'LQFP-144',
        },
        description: '산업용 임베디드 컨트롤러. 고속 실시간 처리에 최적화.',
        datasheet: 'MCU-X200_Datasheet_v3.2.pdf',
    },
    {
        id: 'mcu-x300',
        name: 'MCU-X300',
        keywords: ['x300', 'mcu-x300', 'cortex-m33', 'm33', 'trustzone'],
        specs: {
            cpu: 'ARM Cortex-M33 @ 200MHz (TrustZone)',
            ram: '1MB SRAM',
            flash: '4MB Internal Flash',
            temp: '-40 ~ 85°C',
            protocol: 'SPI, I2C, SDIO, BLE 5.2',
            power: '1.8V~3.6V / 최대 80mA',
            package: 'QFN-64',
        },
        description: '보안 IoT 디바이스용 MCU. TrustZone 기반 하드웨어 보안.',
        datasheet: 'MCU-X300_Datasheet_v2.8.pdf',
    },
    {
        id: 'mcu-x500',
        name: 'MCU-X500',
        keywords: ['x500', 'mcu-x500', 'cortex-a53', 'a53', 'linux'],
        specs: {
            cpu: 'ARM Cortex-A53 Quad-Core @ 1.5GHz',
            ram: '2GB DDR4',
            flash: '32GB eMMC',
            temp: '-20 ~ 70°C',
            protocol: 'Ethernet (Gigabit), CAN FD, USB 3.0',
            power: '5V / 최대 2A',
            package: 'Custom SOM Module',
        },
        description: 'Linux 기반 엣지 컴퓨팅 모듈. AI 추론 및 데이터 전처리.',
        datasheet: 'MCU-X500_Datasheet_v4.0.pdf',
    },
    {
        id: 'sen-t100',
        name: 'SEN-T100',
        keywords: ['t100', 'sen-t100', '온도', '습도', '센서', 'sensor', 'temperature'],
        specs: {
            type: '온도/습도 복합 센서',
            accuracy: '±0.3°C / ±2% RH',
            range: '-40 ~ 125°C / 0~100% RH',
            protocol: 'I2C (7-bit address)',
            power: '2.4V~5.5V / 최대 0.5mA',
            response: '< 8초 (63%)',
        },
        description: '산업용 고정밀 온습도 센서. IP67 방수.',
        datasheet: 'SEN-T100_Datasheet_v1.5.pdf',
    },
    {
        id: 'gw-e400',
        name: 'GW-E400',
        keywords: ['e400', 'gw-e400', '게이트웨이', 'gateway', 'edge'],
        specs: {
            cpu: 'ARM Cortex-A72 Quad-Core @ 1.8GHz',
            ram: '4GB LPDDR4',
            storage: '64GB eMMC + microSD',
            protocol: 'Ethernet, WiFi 6, BLE 5.2, Zigbee',
            temp: '0 ~ 60°C',
            power: '12V DC / 최대 15W',
            os: 'Linux (Yocto / Debian)',
        },
        description: 'IoT 엣지 게이트웨이. 최대 500개 센서 노드 관리.',
        datasheet: 'GW-E400_Datasheet_v3.0.pdf',
    },
]

const faqs = [
    {
        keywords: ['moq', 'mot', '최소', '주문', '수량', '몇 개'],
        answer: '일반적으로 MOQ는 100pcs입니다. 다만 제품군에 따라 다를 수 있습니다.\n\n· MCU 시리즈: 100pcs\n· 센서: 200pcs\n· 게이트웨이: 50pcs\n\n샘플 주문은 5pcs부터 가능합니다.',
    },
    {
        keywords: ['리드타임', 'lead time', '납기', '배송', '언제', '기간'],
        answer: '표준 리드타임:\n\n· 샘플 (5pcs 이하): 3~5 영업일\n· 소량 (100~500pcs): 2~3주\n· 양산 (1,000pcs 이상): 4~6주\n\n긴급 주문 시 별도 협의 가능합니다.',
    },
    {
        keywords: ['가격', 'price', '비용', '견적', '얼마'],
        answer: '정확한 견적은 수량과 사양에 따라 달라집니다.\n아래 정보를 메일로 보내주시면 24시간 내에 견적서를 보내드립니다:\n\n1. 필요 제품 모델명\n2. 예상 수량\n3. 납기 요청일\n\n📧 sales@itembedded.com',
    },
    {
        keywords: ['커스텀', 'custom', '맞춤', '제', '변경', '수정'],
        answer: '네, 커스터마이징이 가능합니다.\n\n· 펌웨어 커스텀: 기본 제공 SDK 활용\n· 하드웨어 변경: 1,000pcs 이상 시 가능\n· 인증: CE, FCC, KC 인증 지원\n\n상세 요구사항을 전달해 주시면 기술팀에서 검토 후 회신드립니다.',
    },
    {
        keywords: ['인증', 'certification', 'ce', 'fcc', 'kc', 'rohs'],
        answer: '현재 보유 인증:\n\n· CE (EU)\n· FCC (미국)\n· KC (한국)\n· RoHS / REACH 준수\n\n추가 인증이 필요하시면 별도 문의 부탁드립니다.',
    },
    {
        keywords: ['전압', 'voltage', '입력', '전원', 'power'],
        answer: '제품별 동작 전압:\n\n· MCU-X200: 3.3V\n· MCU-X300: 1.8V ~ 3.6V\n· MCU-X500: 5V\n· SEN-T100: 2.4V ~ 5.5V\n· GW-E400: 12V DC\n\n상세 전원 설계 가이드는 데이터시트를 참고해 주세요.',
    },
    {
        keywords: ['안녕', 'hello', 'hi', '반갑', '처음'],
        answer: '안녕하세요! 👋\nIT Embedded AI 기술 상담 봇입니다.\n\n아래와 같은 질문을 하실 수 있습니다:\n\n· 제품 스펙 문의 (예: "MCU-X200 스펙")\n· MOQ / 리드타임\n· 가격 / 견적\n· 커스터마이징\n· 인증 정보\n\n무엇이 궁금하신가요?',
    },
]

export { products, faqs }
