/**
 * Knowledge base for the AI chatbot.
 * Maps keywords/patterns to structured responses.
 */

const products = [
    {
        id: 'auto-edge-v1',
        name: 'AUTO-Edge V1',
        keywords: ['v1', 'nano', 'orin', 'edge'],
        specs: {
            processor: 'NVIDIA Orin Nano',
            memory: '8GB LPDDR5',
            temp: '-40 ~ 85°C',
            interface: 'CAN-FD, GMSL2',
            power: '10W ~ 15W',
            os: 'Ubuntu 20.04 (JetPack 5.x)',
        },
        description: '컴팩트 ADAS 엣지 AI 보드. 엔트리급 자율주행 라인업 최적화.',
        datasheet: 'AUTO-Edge_V1_Datasheet.pdf',
    },
    {
        id: 'auto-edge-v2',
        name: 'AUTO-Edge V2',
        keywords: ['v2', 'nx', 'orin', 'edge', '오린'],
        specs: {
            processor: 'NVIDIA Orin NX',
            memory: '16GB LPDDR5',
            temp: '-40 ~ 85°C',
            interface: 'CAN-FD, GMSL2 x 4',
            power: '15W ~ 25W',
            os: 'Ubuntu 20.04 (JetPack 5.x)',
        },
        description: '고성능 자율주행 엣지 AI 보드. 다중 카메라 스트리밍 지원.',
        datasheet: 'AUTO-Edge_V2_Datasheet.pdf',
    },
    {
        id: 'auto-fusion-f1',
        name: 'AUTO-Fusion F1',
        keywords: ['f1', 'fusion', 'snapdragon', 'ride', '퓨전'],
        specs: {
            processor: 'Qualcomm Snapdragon Ride',
            memory: '32GB LPDDR5',
            temp: '-40 ~ 105°C',
            interface: 'CAN-FD x 4, Automotive Ethernet',
            power: '30W ~ 50W',
            safety: 'ASIL-D Ready',
        },
        description: 'L3 이상 자율주행을 위한 멀티 센서 퓨전 통합 제어기.',
        datasheet: 'AUTO-Fusion_F1_Datasheet.pdf',
    },
    {
        id: 'auto-radar-r1',
        name: 'AUTO-Radar R1',
        keywords: ['r1', 'radar', '4d', 'nxp', '레이더'],
        specs: {
            type: '4D Imaging Radar Module',
            range: '최대 300m',
            processor: 'NXP S32R294',
            interface: '100BASE-T1, CAN-FD',
            fov: '방위각 120° / 고도각 30°',
        },
        description: '악천후 환경에서 안정적인 객체 인지가 가능한 4D 이미징 레이더.',
        datasheet: 'AUTO-Radar_R1_Datasheet.pdf',
    },
    {
        id: 'auto-vision-c1',
        name: 'AUTO-Vision C1',
        keywords: ['c1', 'vision', 'camera', 'ambarella', '카메라'],
        specs: {
            resolution: '8MP (4K)',
            processor: 'Ambarella CV22',
            interface: 'GMSL2, FPD-Link III',
            fov: '수평 120° 광각',
            hdr: '120dB LED 플리커 억제(LFM)',
        },
        description: '주야간 전천후 객체 인식용 고해상도 차량용 카메라.',
        datasheet: 'AUTO-Vision_C1_Datasheet.pdf',
    },
]

const faqs = [
    {
        keywords: ['moq', 'mot', '최소', '주문', '수량', '몇 개', 'poc', '데모', '샘플'],
        answer: '일반적으로 샘플 및 PoC 물량은 1~10pcs 단위로 제공됩니다.\n\n· 엣지 보드: 1pcs부터 PoC 대응 가능\n· 카메라/레이더 모듈: 5pcs부터\n\n양산 MOQ는 프로젝트 규모에 따라 보통 1,000pcs 단위로 협의됩니다.',
    },
    {
        keywords: ['리드타임', 'lead time', '납기', '배송', '언제', '기간'],
        answer: '표준 리드타임 안내 (PoC 및 샘플 기준):\n\n· 샘플 (10pcs 이하): 2~3주\n· 소량 양산 (100pcs~): 8~12주\n· 대량 양산: 최소 16주 전 발주 필요\n\nASIL 인증용 문서화 패키지는 H/W 납품 시 동시 제공됩니다.',
    },
    {
        keywords: ['가격', 'price', '비용', '견적', '얼마'],
        answer: '자율주행 ADAS 통합 보드의 가격은 인터페이스 구성 및 NPU TOPS 스펙에 따라 달라집니다.\n정확한 PoC 견적은 아래 메일로 NDA 요청 및 기술 스펙서를 보내주시면 안내해 드립니다:\n\n📧 sales@auto-adas.com',
    },
    {
        keywords: ['커스텀', 'custom', '맞춤', '제', '변경', '수정'],
        answer: '네, 차량 맞춤형 커스터마이징이 가능합니다.\n\n· 펌웨어: 특정 센서 데이터 파싱을 위한 미들웨어 수정\n· 하드웨어: GMSL2 포트 수 증감, 폼팩터 변경\n\n엔지니어링 비용(NRE)은 별도 산정됩니다.',
    },
    {
        keywords: ['인증', 'certification', 'asil', 'iso26262', 'iso', '안전'],
        answer: 'AUTO-ADAS 솔루션은 전장 규격을 준수합니다:\n\n· ISO 26262 (차량 기능안전): ASIL-B ~ ASIL-D Ready 보드 제공\n· ISO/SAE 21434 (사이버 보안): 적용 모듈 지원\n· AEC-Q100 지원 부품 100% 사용\n\n상세한 FMEDA 리포트는 파트너사 전용 포털에서 받을 수 있습니다.',
    },
    {
        keywords: ['안녕', 'hello', 'hi', '반갑', '처음'],
        answer: '안녕하세요! 👋\nAUTO-ADAS 글로벌 엔지니어 기술 봇입니다.\n\n아래와 같은 질문을 하실 수 있습니다:\n\n· 센서/제어기 스펙 문의 (예: "AUTO-Edge V2 스펙")\n· PoC 데모 샘플 절차\n· ASIL 인증 및 기능안전 문의\n· 하드웨어 커스터마이징\n\n기술 검토 중 궁금하신 점을 자유롭게 입력해 주세요.',
    },
]

export { products, faqs }
