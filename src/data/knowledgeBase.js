export const products = [
    {
        id: 'auto-edge-v1',
        name: 'AUTO-Edge V1',
        keywords: ['v1', 'nano', 'orin', 'edge', 'entry'],
        specs: {
            processor: 'NVIDIA Orin Nano',
            memory: '8GB LPDDR5',
            temp: '-40 ~ 85°C',
            interface: 'CAN-FD, GMSL2',
            power: '10W ~ 15W',
            os: 'Ubuntu 20.04 (JetPack 5.x)',
        },
        description: 'Compact ADAS edge AI board. Optimized for entry-level autonomous driving lineups.',
        datasheet: 'AUTO-Edge_V1_Datasheet.pdf',
    },
    {
        id: 'auto-edge-v2',
        name: 'AUTO-Edge V2',
        keywords: ['v2', 'nx', 'orin', 'edge', 'high-perf'],
        specs: {
            processor: 'NVIDIA Orin NX (100 TOPS)',
            memory: '16GB LPDDR5',
            temp: '-40 ~ 105°C',
            interface: 'CAN-FD, GMSL2 x 4, 10GbE',
            power: '25W ~ 35W',
            os: 'Ubuntu 22.04 (JetPack 6.x)',
        },
        description: 'High-performance edge AI board for L2+ ~ L3 autonomous driving and multi-camera perception.',
        datasheet: 'AUTO-Edge_V2_Datasheet.pdf',
    },
    {
        id: 'auto-fusion-f1',
        name: 'AUTO-Fusion F1',
        keywords: ['fusion', 'f1', 'ride', 'qualcomm', 'snapdragon', 'perception'],
        specs: {
            processor: 'Qualcomm Snapdragon Ride (SA8295P)',
            memory: '16GB LPDDR5',
            temp: '-40 ~ 105°C',
            interface: 'CAN-FD, GMSL2 x 8, PCIe 4.0',
            power: '25W ~ 40W',
            computation: '30+ TOPS AI, 1 GFLOPS GPU',
        },
        description: 'Transformer-based multi-sensor fusion platform. Supports 4D Imaging Radar, Solid-state LiDAR, and 8MP camera arrays for zero-blind-spot perception.',
        datasheet: 'AUTO-Fusion_F1_Datasheet.pdf',
    },
    {
        id: 'auto-radar-r1',
        name: 'AUTO-Radar R1',
        keywords: ['radar', 'r1', '4d', 'imaging', 'long-range'],
        specs: {
            type: '4D Imaging Radar',
            range: '300m (detection), 200m (tracking)',
            fov: '±60° Azimuth, ±15° Elevation',
            interface: 'Automotive Ethernet, CAN-FD',
            resolution: '1° Azimuth, 2° Elevation',
        },
        description: 'Long-range 4D Imaging Radar module for all-weather perception. Provides elevation data for 3D occupancy grid construction.',
        datasheet: 'AUTO-Radar_R1_Datasheet.pdf',
    },
    {
        id: 'auto-vision-c1',
        name: 'AUTO-Vision C1',
        keywords: ['camera', 'c1', 'vision', '8mp', 'isp'],
        specs: {
            sensor: '8MP CMOS (Sony IMX678)',
            hdr: '140dB HDR',
            interface: 'GMSL2 / FPD-Link III',
            temp: '-40 ~ 85°C',
            features: 'LED Flicker Mitigation, ISP Bypass',
        },
        description: '8MP automotive-grade camera module with HDR. Optimized for Transformer-based vision perception and night driving.',
        datasheet: 'AUTO-Vision_C1_Datasheet.pdf',
    },
]

export const faqs = [
    {
        keywords: ['odd', 'operational', 'urban', 'city', 'intersection', 'left turn', 'vlm'],
        answer: 'Yes, our solution includes ODD (Operational Design Domain) expansion for urban environments.\n\n· Complex intersection navigation with unprotected left-turn logic\n· Vision-language model (VLM) based scene understanding\n· Supports highway, urban arterial, and parking scenarios\n\nContact us for a detailed ODD specification document.',
    },
    {
        keywords: ['autosar', 'adaptive', 'classic', 'bsw', 'rte', 'mcal'],
        answer: 'Our software stack is fully compliant with both Adaptive and Classic AUTOSAR architectures.\n\n· Adaptive AUTOSAR: ara::com, ara::exec, ara::diag\n· Classic AUTOSAR: BSW, RTE, MCAL integration\n· ISO/SAE 21434 Cybersecurity framework support\n\nWe provide pre-validated AUTOSAR SWC packages for rapid integration.',
    },
    {
        keywords: ['euro ncap', 'ncap', '2026', 'safety', 'rating', 'assessment'],
        answer: 'Our solutions are designed to meet Euro NCAP 2026 safety assessment requirements.\n\n· AEB (Autonomous Emergency Braking) for Pedestrians & Cyclists\n· Lane Support Systems (LSS)\n· Speed Assistance Systems (SAS)\n· Occupant Status Monitoring (OSM)\n\nWe provide a Euro NCAP compliance matrix upon request.',
    },
    {
        keywords: ['transformer', 'attention', 'perception', 'long-range', 'detection', 'bev'],
        answer: 'We employ Transformer-based perception models for long-range object detection and scene understanding.\n\n· BEV (Bird\'s Eye View) Transformer architecture\n· Attention-based multi-camera fusion\n· Effective detection range up to 200m+\n· Real-time inference on NVIDIA Orin & Snapdragon Ride\n\nAsk for our Perception Architecture whitepaper for technical details.',
    },
    {
        keywords: ['moq', 'mot', 'minimum', 'order', 'quantity', 'poc', 'demo', 'sample'],
        answer: 'Sample and PoC quantities are available in small batches:\n\n· Edge AI Boards: From 1 unit for PoC\n· Camera / Radar Modules: From 5 units\n\nMass production MOQ is typically 1,000 units and can be discussed based on project scope.',
    },
    {
        keywords: ['lead time', 'delivery', 'when', 'timeline', 'shipping'],
        answer: 'Standard lead time reference (PoC & Sample):\n\n· Samples (≤10 units): 2~3 weeks\n· Small batch (100+ units): 8~12 weeks\n· Mass production: Min. 16 weeks advance ordering\n\nASIL documentation packages are delivered with hardware.',
    },
    {
        keywords: ['asil', 'iso 26262', 'safety', 'certification', 'functional', 'lockstep'],
        answer: 'Our full ADAS integration board meets ISO 26262 ASIL-D standards.\n\n· ASIL-D lockstep core architecture\n· ISO/SAE 21434 Cybersecurity compliance\n· Full safety case documentation included\n· Adaptive & Classic AUTOSAR support\n\n📎 Download: Safety Case Guidebook (PDF, 5.1MB)',
    },
    {
        keywords: ['custom', 'hardware', 'customization', 'modification', 'design'],
        answer: 'Yes, we offer hardware customization services:\n\n· Interface expansion (additional CAN/LIN/Ethernet ports)\n· Custom connector layout for specific vehicle platforms\n· Thermal design optimization for your target environment\n· PCBA form factor adjustments\n\nCustom projects typically begin with a 4~6 week design phase after NDA.',
    },
    {
        keywords: ['nvidia', 'orin', 'jetson', 'agx', 'orin nx', 'orin nano'],
        answer: 'We provide solutions based on the NVIDIA Orin platform:\n\n· AUTO-Edge V1: NVIDIA Orin Nano (40 TOPS)\n· AUTO-Edge V2: NVIDIA Orin NX (100 TOPS)\n· Both support JetPack 5.x / 6.x SDK\n· TensorRT, CUDA, and DeepStream optimized\n\nAsk about our NVIDIA DGX-based training pipeline for custom model development.',
    },
    {
        keywords: ['qualcomm', 'snapdragon', 'ride', 'sa8295'],
        answer: 'Our AUTO-Fusion F1 platform is powered by Qualcomm Snapdragon Ride (SA8295P).\n\n· 30+ TOPS AI compute\n· Multi-sensor fusion with up to 8 GMSL2 cameras\n· PCIe 4.0 for LiDAR/Radar expansion\n· Qualcomm Neural Processing SDK support\n\nIdeal for L2+ to L3 autonomous driving applications.',
    },
]
