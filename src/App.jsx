import React, { useMemo, useState } from "react";

const PALETTE = {
  bg: "#FCFAF2",
  paper: "#FFFDF8",
  ink: "#1F1A17",
  sub: "#6B645C",
  line: "#E8DED1",
  gold: "#C18A26",
  vermilion: "#C73E3A",
  indigo: "#3B5F78",
  moss: "#566C3B",
  plum: "#7C5A7A",
  smoke: "#F4EFE6",
  amber: "#E6B422",
};

const ICONS = {
  spark: [
    "M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2z",
  ],
  layers: [
    "M12 3L3 7.5 12 12l9-4.5L12 3z",
    "M3 12.5L12 17l9-4.5",
    "M3 17.5L12 22l9-4.5",
  ],
  network: [
    "M6 12a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm11-7a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM17 19a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z",
    "M8.5 10.5l8-4",
    "M8.5 13.5l8 4",
  ],
  shield: [
    "M12 3l7 3v5c0 5.3-3.1 8.6-7 10-3.9-1.4-7-4.7-7-10V6l7-3z",
    "M9 12l2 2 4-4",
  ],
  chip: [
    "M8 8h8v8H8z",
    "M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3",
  ],
  search: [
    "M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13z",
    "M16 16l5 5",
  ],
  cloud: [
    "M7 18h10a4 4 0 001-7.9A5.5 5.5 0 004.7 13 4 4 0 007 18z",
  ],
  database: [
    "M12 4c-4.4 0-8 1.3-8 3s3.6 3 8 3 8-1.3 8-3-3.6-3-8-3z",
    "M4 7v4c0 1.7 3.6 3 8 3s8-1.3 8-3V7",
    "M4 11v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4",
  ],
  book: [
    "M5 4h10a3 3 0 013 3v13H8a3 3 0 00-3 3V4z",
    "M8 4v19",
  ],
  chart: [
    "M5 19V9",
    "M12 19V5",
    "M19 19v-7",
  ],
  scale: [
    "M12 4v15",
    "M6 7h12",
    "M7 7L4 12h6L7 7zm10 0l-3 5h6l-3-5z",
    "M9 19h6",
  ],
  users: [
    "M9 11a3 3 0 100-6 3 3 0 000 6zm8 2a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
    "M3.5 20a5.5 5.5 0 0111 0",
    "M14.5 20a4.5 4.5 0 019 0",
  ],
  globe: [
    "M12 3a9 9 0 100 18 9 9 0 000-18z",
    "M3 12h18",
    "M12 3c2.4 2.5 3.7 5.6 3.7 9S14.4 18.5 12 21c-2.4-2.5-3.7-5.6-3.7-9S9.6 5.5 12 3z",
  ],
  alert: [
    "M12 4l9 16H3L12 4z",
    "M12 10v4",
    "M12 17h.01",
  ],
  flow: [
    "M4 7h8a3 3 0 013 3v1",
    "M17 9l2 2-2 2",
    "M20 17h-8a3 3 0 01-3-3v-1",
    "M7 15l-2 2 2 2",
  ],
  filter: [
    "M4 6h16",
    "M7 12h10",
    "M10 18h4",
  ],
  menu: [
    "M4 7h16",
    "M4 12h16",
    "M4 17h16",
  ],
  eye: [
    "M2.5 12S6.5 6 12 6s9.5 6 9.5 6S17.5 18 12 18 2.5 12 2.5 12z",
    "M12 15a3 3 0 100-6 3 3 0 000 6z",
  ],
  arrow: [
    "M5 12h14",
    "M13 6l6 6-6 6",
  ],
};

function Icon({ name, className = "", size = 20, strokeWidth = 1.8 }) {
  const paths = ICONS[name] || ICONS.spark;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

const evidenceLegend = [
  { key: "case", en: "Case", zh: "個案", color: PALETTE.vermilion },
  { key: "note", en: "Optional Note", zh: "延伸筆記", color: PALETTE.indigo },
  { key: "course", en: "Course Lens", zh: "課程框架", color: PALETTE.moss },
  { key: "synth", en: "Synthesis", zh: "整合判讀", color: PALETTE.plum },
  { key: "verify", en: "Verify Before Quoting", zh: "引用前需核對", color: PALETTE.gold },
];

const quickFacts = [
  {
    icon: "spark",
    tags: ["course", "synth"],
    enTitle: "This session is a scale shift",
    zhTitle: "這堂課是在做尺度放大",
    en: "The logic does not start from scratch. It extends earlier platform strategy and prediction factory thinking from narrower operating-model cases into the industry-wide generative AI race.",
    zh: "這不是完全重開新題，而是把前面平臺策略與 prediction factory 的邏輯，從較窄的 operating model 案例，放大到整個生成式 AI 產業競局。",
  },
  {
    icon: "layers",
    tags: ["note", "course", "synth"],
    enTitle: "LLMs are not only products",
    zhTitle: "LLM 不只是產品",
    en: "They can also function as a general-purpose input, component, or platform layer on top of which other applications are built.",
    zh: "它們也可以是通用輸入、元件，或其他應用建在其上的平臺層。",
  },
  {
    icon: "network",
    tags: ["note", "synth"],
    enTitle: "The war is over control points",
    zhTitle: "戰場是控制點，不只是模型分數",
    en: "The real battle runs across architecture, training data, models, APIs, applications, distribution, compute, and monetization. Best-model thinking alone is too flat.",
    zh: "真正的爭奪發生在 architecture、training data、models、API、applications、distribution、compute 與 monetization。只看誰模型最強，會太平面。",
  },
  {
    icon: "search",
    tags: ["case", "synth"],
    enTitle: "Google faces the hardest redesign problem",
    zhTitle: "Google 面對最難的重設問題",
    en: "It must bring generative AI into Search without collapsing the economics, legal protections, publisher traffic logic, and advertising engine that made Search dominant.",
    zh: "它必須把生成式 AI 放進 Search，但又不能讓原本支撐 Search 主導地位的經濟性、法律保護、publisher 流量結構與廣告引擎一起失衡。",
  },
];

const readerPath = [
  { en: "Read the thesis first", zh: "先讀主論點" },
  { en: "Then scan the value chain", zh: "再看價值鏈" },
  { en: "Then compare the main players", zh: "再比主要玩家" },
  { en: "Then focus on Google’s dilemma", zh: "再抓 Google 的困境" },
  { en: "Use the course lens at the end", zh: "最後再回到課程框架" },
];

const thesis = {
  en: "AI Wars in 2025 is not just a race to build the best model. It is a struggle over control points across a layered value chain, including models, compute, cloud, developer access, applications, distribution, and monetization. Google’s problem is the sharpest because it must redesign Search around generative AI without breaking the economics, legal structure, and ecosystem relationships that made Search dominant.",
  zh: "2025 年的 AI 戰爭，不只是做出最好模型的競賽，而是圍繞分層價值鏈控制點的爭奪，包括模型、算力、雲端、開發者存取、應用、分發與變現。Google 的難題最尖銳，因為它必須用生成式 AI 重設 Search，同時又不能破壞讓 Search 長期主導的經濟性、法律結構與生態關係。",
};

const valueChain = [
  {
    key: "architecture",
    icon: "layers",
    color: PALETTE.vermilion,
    tags: ["note", "case"],
    players: ["Google", "OpenAI", "Meta", "Anthropic"],
    enTitle: "Architecture",
    zhTitle: "架構",
    en: "Transformer became the foundational architecture for modern generative AI. Google’s role matters because it helped establish a core technical foundation later commercial rivals built on.",
    zh: "Transformer 成為現代生成式 AI 的基礎架構。Google 的角色重要，因為它協助建立了後來商業競爭者共同站上的技術底座。",
  },
  {
    key: "data",
    icon: "database",
    color: PALETTE.gold,
    tags: ["note", "synth"],
    players: ["OpenAI", "Google", "Meta", "Publishers"],
    enTitle: "Pre-training and data",
    zhTitle: "預訓練與資料",
    en: "Scale improved performance, but high-quality data became scarcer and copyright pressure increased. Training sources, data access, and legal exposure all became strategic.",
    zh: "規模擴張確實提升表現，但高品質資料愈來愈稀缺，版權壓力也同步提高。訓練來源、資料存取與法律曝險都變成策略問題。",
  },
  {
    key: "models",
    icon: "chip",
    color: PALETTE.indigo,
    tags: ["note", "course"],
    players: ["OpenAI", "Google", "Anthropic", "Meta", "DeepSeek"],
    enTitle: "Foundation models and tuning",
    zhTitle: "基礎模型與微調",
    en: "Foundation models are broad and adaptable. Downstream task specialization depends on tuning, instruction design, RLHF, and productization choices.",
    zh: "Foundation models 是廣泛而可適應的底層模型。下游任務專用化，則取決於 tuning、instruction 設計、RLHF 與產品化選擇。",
  },
  {
    key: "api",
    icon: "flow",
    color: PALETTE.plum,
    tags: ["note", "course", "synth"],
    players: ["OpenAI", "Anthropic", "Microsoft", "Amazon", "Developers"],
    enTitle: "APIs and developer access",
    zhTitle: "API 與開發者存取",
    en: "APIs turn model providers into upstream suppliers for downstream builders. This layer matters because control here shapes ecosystem dependence, bargaining power, and adoption speed.",
    zh: "API 讓模型供應商變成下游開發者的上游供應者。這一層之所以重要，是因為誰控制它，就會影響 ecosystem 依賴、議價力與擴散速度。",
  },
  {
    key: "apps",
    icon: "users",
    color: PALETTE.moss,
    tags: ["note", "case", "synth"],
    players: ["ChatGPT", "Perplexity", "Copilot", "Search", "Enterprise Apps"],
    enTitle: "Applications, interface, and guardrails",
    zhTitle: "應用、介面與護欄",
    en: "User-facing products determine attention, workflow integration, and monetization. Guardrails are not peripheral. They are part of product design and governance.",
    zh: "真正面向使用者的產品，決定注意力、工作流整合與變現方式。Guardrails 不是附屬品，而是產品設計與治理本身的一部分。",
  },
  {
    key: "compute",
    icon: "cloud",
    color: PALETTE.sub,
    tags: ["note", "case", "synth"],
    players: ["Nvidia", "Google TPU", "Azure", "AWS"],
    enTitle: "Compute and inference economics",
    zhTitle: "算力與推論經濟性",
    en: "Inference is an ongoing cost center, not a trivial footnote. That is why conversational interfaces can reshape the economics of search, cloud, and application pricing.",
    zh: "推論是持續性的成本中心，不是可忽略的註腳。這也是為甚麼對話式介面會直接改變搜尋、雲端與應用定價的經濟結構。",
  },
];

const players = [
  {
    name: "Google / Alphabet",
    short: "Google",
    tone: PALETTE.vermilion,
    tags: ["case", "synth"],
    role: {
      en: "Incumbent search and ad giant with deep AI research assets",
      zh: "既有搜尋與廣告巨頭，同時握有深厚 AI 研究資產",
    },
    strengths: {
      en: [
        "Search, Ads, Android, Chrome, DeepMind, TensorFlow, Gemini, TPU path",
        "Control over the dominant query starting point, at least historically",
        "Experience deploying AI quietly inside core products",
      ],
      zh: [
        "Search、Ads、Android、Chrome、DeepMind、TensorFlow、Gemini、TPU 路徑互相支撐",
        "至少在歷史上，長期掌握最重要的 query 起點",
        "很早就在核心產品內部 quietly 部署 AI",
      ],
    },
    tension: {
      en: "Its challenge is not simply model quality. It is redesigning Search without damaging search economics, legal protections, publisher relations, and ad monetization.",
      zh: "它的難題不只是模型品質，而是要重設 Search，又不能傷到搜尋經濟性、法律保護、publisher 關係與廣告變現。",
    },
  },
  {
    name: "OpenAI",
    short: "OpenAI",
    tone: PALETTE.indigo,
    tags: ["case", "note"],
    role: {
      en: "The firm that translated frontier capability into mass consumer adoption and broad developer attention",
      zh: "把前沿模型能力轉成大眾採用與開發者注意力的關鍵公司",
    },
    strengths: {
      en: [
        "AGI mission, strong brand salience, consumer interface leadership",
        "Freemium plus API business logic",
        "Strategic partnership with Microsoft across compute and product integration",
      ],
      zh: [
        "AGI mission 與高品牌辨識度，先搶到消費者介面心智",
        "freemium 加 API 的雙重商業邏輯",
        "與 Microsoft 在算力與產品整合上形成強連結",
      ],
    },
    tension: {
      en: "OpenAI must decide where to play across the full value chain while balancing mission, openness, control, and scalable monetization.",
      zh: "OpenAI 必須決定自己在整條 value chain 上要站在哪裡，同時平衡使命、開放性、控制權與可擴張變現。",
    },
  },
  {
    name: "Microsoft",
    short: "MSFT",
    tone: PALETTE.moss,
    tags: ["case", "synth"],
    role: {
      en: "Partner, distributor, cloud host, and independent strategic actor",
      zh: "既是合作方、分發方、雲端承載方，也是獨立策略玩家",
    },
    strengths: {
      en: [
        "Azure, Bing, Copilot, Microsoft 365, enterprise workflow reach",
        "Can use AI to strengthen multiple layers at once",
        "Natural advantage in enterprise integration and distribution",
      ],
      zh: [
        "Azure、Bing、Copilot、Microsoft 365 與廣泛 enterprise workflow 入口",
        "可以同時強化多個層次，不只一個產品",
        "在企業整合與分發上先天佔優",
      ],
    },
    tension: {
      en: "Microsoft benefits from OpenAI, but has every reason to hedge, diversify suppliers, and avoid full dependence on one frontier lab.",
      zh: "Microsoft 受益於 OpenAI，但也非常有理由分散風險，避免完全依賴單一前沿實驗室。",
    },
  },
  {
    name: "Meta",
    short: "Meta",
    tone: PALETTE.plum,
    tags: ["case", "synth"],
    role: {
      en: "Open-weight strategist using commoditization as a weapon",
      zh: "把開放權重與商品化當成武器的玩家",
    },
    strengths: {
      en: [
        "Can monetize elsewhere, especially advertising and ecosystem reach",
        "Open strategy can accelerate complementor activity",
        "Less dependent on cloud monetization than some rivals",
      ],
      zh: [
        "可以在別層賺錢，特別是廣告與 ecosystem 觸達",
        "開放策略有助於加速 complementor 活動",
        "不像部分對手那樣高度依賴雲端變現",
      ],
    },
    tension: {
      en: "Meta gains when a model layer commoditizes, but that same openness also helps outside challengers move faster.",
      zh: "Meta 能從模型層商品化中受益，但同一種開放也會幫助外部挑戰者加速。",
    },
  },
  {
    name: "Anthropic",
    short: "Anthropic",
    tone: PALETTE.gold,
    tags: ["case", "synth"],
    role: {
      en: "Safety-oriented frontier challenger positioned inside blurred boundaries",
      zh: "偏安全定位的前沿挑戰者，剛好位於界線模糊的核心",
    },
    strengths: {
      en: [
        "Strong safety and governance identity",
        "Backed and distributed through large platform relationships",
        "Credible alternative to OpenAI in developer and enterprise contexts",
      ],
      zh: [
        "安全與治理定位鮮明",
        "透過大型平臺關係取得資本與分發",
        "在 developer 與 enterprise 情境中，是 OpenAI 的可信替代選項",
      ],
    },
    tension: {
      en: "Anthropic competes with Google and OpenAI, yet is financed and distributed through relationships with Google and Amazon.",
      zh: "Anthropic 與 Google、OpenAI 競爭，但同時又透過 Google 與 Amazon 的關係獲得資本與分發。",
    },
  },
  {
    name: "DeepSeek",
    short: "DeepSeek",
    tone: "#6A4C3B",
    tags: ["case", "synth"],
    role: {
      en: "Commoditization pressure from efficient training and open diffusion",
      zh: "以高效率訓練與開放擴散，提高整體商品化壓力",
    },
    strengths: {
      en: [
        "Reframes frontier defensibility through efficiency claims",
        "Changes expectations about training cost and openness",
        "Adds geopolitical as well as commercial pressure",
      ],
      zh: [
        "用效率敘事重寫前沿防禦性的想像",
        "改變市場對訓練成本與開放性的預期",
        "不只形成商業壓力，也帶入地緣政治壓力",
      ],
    },
    tension: {
      en: "Its strategic meaning is not only model strength. It is that efficient diffusion can reduce how defensible the frontier layer really is.",
      zh: "它的策略意義不只在於模型是否夠強，而在於高效率擴散可能會削弱前沿層真正的可防禦性。",
    },
  },
  {
    name: "Perplexity",
    short: "Perplexity",
    tone: "#4F7A6F",
    tags: ["case", "synth"],
    role: {
      en: "Application-layer attack on the search interface",
      zh: "從應用層直接攻擊搜尋介面",
    },
    strengths: {
      en: [
        "Clear answer-engine positioning",
        "Fast user-facing experimentation",
        "Can reshape where users begin information journeys",
      ],
      zh: [
        "answer engine 定位清楚",
        "使用者介面迭代速度快",
        "能改變使用者開始資訊旅程的位置",
      ],
    },
    tension: {
      en: "Perplexity challenges Google’s interface, but still depends on upstream model suppliers and parts of the wider search ecosystem.",
      zh: "Perplexity 挑戰 Google 的介面，但仍依賴上游模型供應商，以及更大的搜尋生態某些部分。",
    },
  },
  {
    name: "Nvidia, Amazon, Apple, publishers, regulators",
    short: "Infra + Gatekeepers",
    tone: PALETTE.sub,
    tags: ["case", "note", "synth"],
    role: {
      en: "Critical enablers, bottlenecks, gatekeepers, and rule-setters",
      zh: "關鍵使能者、瓶頸、gatekeeper 與規則重排者",
    },
    strengths: {
      en: [
        "Nvidia is the compute bottleneck",
        "Amazon is infrastructure, capital, and distribution through cloud",
        "Apple shapes mobile distribution, while publishers and regulators shape data, liability, and antitrust constraints",
      ],
      zh: [
        "Nvidia 是關鍵算力瓶頸",
        "Amazon 透過 cloud 同時扮演基礎設施、資本與分發角色",
        "Apple 影響行動分發，而 publishers 與 regulators 則重塑資料、責任與反壟斷邊界",
      ],
    },
    tension: {
      en: "These actors may not always own the model layer, but they can still reallocate control points across the system.",
      zh: "這些角色未必擁有模型層，但仍可以重排整個系統中的控制點。",
    },
  },
];

const coopetition = [
  {
    left: "Google",
    right: "OpenAI",
    en: "They compete for the query starting point, user attention, and interface mindshare.",
    zh: "雙方爭的是 query 起點、使用者注意力，以及 AI 介面的心智位置。",
  },
  {
    left: "Google",
    right: "Anthropic",
    en: "They compete in frontier models, yet remain linked through investment and cloud relationships.",
    zh: "雙方在前沿模型上競爭，但又透過投資與雲端關係彼此牽連。",
  },
  {
    left: "Microsoft",
    right: "OpenAI",
    en: "They partner across cloud, capital, and product integration, while Microsoft still has reasons to hedge.",
    zh: "雙方在雲端、資本與產品整合上合作，但 Microsoft 仍有充分理由做 hedge。",
  },
  {
    left: "Amazon",
    right: "Anthropic",
    en: "Investor and infrastructure partner, but also a broader platform for multiple model providers.",
    zh: "Amazon 既是投資方與基礎設施夥伴，同時也是面向多家模型供應商的更大平臺。",
  },
  {
    left: "Meta",
    right: "Everyone",
    en: "Its open strategy helps Meta, but also accelerates external innovation that pressures closed players.",
    zh: "Meta 的開放策略幫到自己，也同時加速外部創新，對閉源玩家形成壓力。",
  },
  {
    left: "Perplexity",
    right: "Google / OpenAI / Anthropic",
    en: "It attacks end-user search behavior while relying on upstream models and parts of the same ecosystem it challenges.",
    zh: "它一方面搶終端搜尋行為，另一方面又依賴上游模型與自己正在挑戰的生態某些部分。",
  },
  {
    left: "DeepSeek",
    right: "U.S. players",
    en: "It competes commercially and geopolitically while also benefiting from open research and tools.",
    zh: "它在商業與地緣政治層面都構成競爭，同時也受益於開放研究與工具。",
  },
  {
    left: "Nvidia",
    right: "Everyone",
    en: "Supplier to nearly all major players, which makes it both enabler and bottleneck.",
    zh: "幾乎所有主要玩家都依賴它，所以它同時是使能者，也是瓶頸。",
  },
];

const blurReasons = [
  {
    en: "The value chain is vertically unbundled.",
    zh: "價值鏈本身就是垂直拆分的。",
  },
  {
    en: "Models are both end products and platform layers.",
    zh: "模型既是終端產品，也是平臺層。",
  },
  {
    en: "Open versus closed source creates strategic ambiguity.",
    zh: "開源與閉源本身就會製造策略模糊。",
  },
  {
    en: "Investment relationships cut across direct rivalry.",
    zh: "投資關係會直接橫切競爭關係。",
  },
  {
    en: "Talent flows create shared organizational DNA.",
    zh: "人才流動讓組織血緣彼此交纏。",
  },
  {
    en: "Monetization remains unresolved across the stack.",
    zh: "整個堆疊上的變現問題都還沒有完全定型。",
  },
];

const googleTensions = [
  {
    icon: "cloud",
    titleEn: "Cost",
    titleZh: "成本",
    en: "Conversational AI raises inference costs. In search, that matters at the level of each query, not just at the lab level.",
    zh: "對話式 AI 會把推論成本往上推。對搜尋來說，這不是實驗室層次的問題，而是每次 query 的問題。",
  },
  {
    icon: "chart",
    titleEn: "Monetization",
    titleZh: "變現",
    en: "A narrative answer may not monetize as naturally as a page of links and ads.",
    zh: "敘事式答案，不一定能像連結頁面加廣告那樣自然變現。",
  },
  {
    icon: "shield",
    titleEn: "Legal and governance risk",
    titleZh: "法律與治理風險",
    en: "AI-generated answers can create liability and weaken some of the older protections that link-based search enjoyed.",
    zh: "AI 生成答案會帶來責任風險，也可能削弱連結式搜尋原本享有的某些保護。",
  },
  {
    icon: "alert",
    titleEn: "Cannibalization",
    titleZh: "自我蠶食",
    en: "Improving the user experience may still damage the incumbent business model. That is the innovator’s dilemma flavor here.",
    zh: "提升使用者體驗，仍可能反過來傷到既有商業模式。這也是此案最像 innovator’s dilemma 的地方。",
  },
];

const openClosed = [
  {
    dim: { en: "Primary logic", zh: "主要邏輯" },
    open: {
      en: "Accelerate diffusion, complementor activity, outside innovation, and standard formation.",
      zh: "加速擴散、互補者活躍、外部創新與標準形成。",
    },
    closed: {
      en: "Protect appropriability, control, and tighter system governance.",
      zh: "保護擷取性、控制權與更緊的系統治理。",
    },
  },
  {
    dim: { en: "Where advantage may come from", zh: "優勢可能來自哪裡" },
    open: {
      en: "Broader ecosystem adoption and downstream dependence.",
      zh: "更廣的 ecosystem 採用與下游依賴。",
    },
    closed: {
      en: "Ownership of performance, access, pricing, and guardrails.",
      zh: "對性能、存取、定價與 guardrails 的更強主控。",
    },
  },
  {
    dim: { en: "Typical risk", zh: "典型風險" },
    open: {
      en: "You may help rivals move faster than you expect.",
      zh: "你可能會比預期更快幫到對手。",
    },
    closed: {
      en: "You may slow diffusion and push complementors elsewhere.",
      zh: "你可能會拖慢擴散，並把 complementors 推去別處。",
    },
  },
  {
    dim: { en: "Best example in this case", zh: "本案最好的例子" },
    open: {
      en: "Meta shows that a firm can benefit from commoditizing one layer if it monetizes elsewhere.",
      zh: "Meta 說明了一家公司可以故意讓某一層商品化，只要它能在別層變現。",
    },
    closed: {
      en: "Closed players aim to keep tighter control over model performance, access, and value capture.",
      zh: "閉源玩家則傾向把模型表現、存取與價值擷取更緊地鎖在自己手中。",
    },
  },
];

const frameworkCards = [
  {
    icon: "flow",
    tags: ["course"],
    enTitle: "Prediction factory lens",
    zhTitle: "Prediction factory 視角",
    en: "A mature prediction factory links live model execution with retraining. Inputs arrive, a model generates a prediction, a decision rule is applied, a feature or function is triggered, outcomes are observed, and feedback improves the model.",
    zh: "成熟的 prediction factory 會把 live model execution 和 retraining 接起來。輸入進來，模型產生 prediction，decision rule 被套用，feature 或 function 被觸發，outcomes 被觀察，feedback 再回頭改善模型。",
  },
  {
    icon: "chart",
    tags: ["course"],
    enTitle: "Value creation is not value capture",
    zhTitle: "價值創造不等於價值擷取",
    en: "A better product does not automatically mean a better business model. Long-term advantage often comes from a portfolio of strengths such as scale, incumbency, data, agility, integrations, and governance.",
    zh: "產品更好，不代表 business model 自動更好。長期優勢通常來自一整籃組合，例如 scale、incumbency、data、agility、integrations 與 governance。",
  },
  {
    icon: "network",
    tags: ["course"],
    enTitle: "Ecosystem mapping",
    zhTitle: "生態系盤點",
    en: "Do not map only end users. In this case you must also map developers, advertisers, publishers, cloud providers, chip suppliers, model firms, complementors, regulators, and distribution gatekeepers.",
    zh: "不要只畫終端用戶。這個 case 需要一起畫出 developers、advertisers、publishers、cloud providers、chip suppliers、model firms、complementors、regulators 與 distribution gatekeepers。",
  },
  {
    icon: "layers",
    tags: ["course"],
    enTitle: "Operating model and value delivery",
    zhTitle: "Operating model 與 value delivery",
    en: "The issue is not only whether gen AI exists, but how it is embedded in a broader system of choices, features, workflows, and governance.",
    zh: "問題不只是 gen AI 存不存在，而是它如何被嵌進更大的 choices、features、workflows 與 governance 系統。",
  },
  {
    icon: "shield",
    tags: ["course"],
    enTitle: "Value capture and VRIDO",
    zhTitle: "Value capture 與 VRIDO",
    en: "To defend profits, a platform needs more than buzz. It needs positional advantages or strategic assets that are valuable, rare, hard to imitate, durable, and organization-specific.",
    zh: "要守住利潤，平臺不能只有熱度，還需要 positional advantages 或 strategic assets，而且這些資產必須具備 valuable、rare、hard to imitate、durable 與 organization-specific。",
  },
];

const coldCalls = [
  {
    qEn: "Who are the main players?",
    qZh: "主要玩家是誰？",
    aEn: "The cleanest answer is to group them by layer. Google, OpenAI, Anthropic, Meta, and DeepSeek compete around the model layer. Microsoft, Amazon, and Google also compete around cloud and enterprise integration. Perplexity attacks the application and interface layer. Nvidia controls a major compute bottleneck. Apple matters as a distribution gatekeeper. Publishers and regulators matter because training data, clickthrough, liability, and antitrust shape the economics of the system.",
    aZh: "最乾淨的答法，是按層次分。Google、OpenAI、Anthropic、Meta、DeepSeek 主要圍繞模型層競爭。Microsoft、Amazon、Google 也在 cloud 與 enterprise integration 層競爭。Perplexity 攻的是 application 與 interface 層。Nvidia 控制重要算力瓶頸。Apple 是 distribution gatekeeper。Publishers 與 regulators 則因為訓練資料、clickthrough、責任與反壟斷，直接影響整個系統的經濟性。",
  },
  {
    qEn: "Why are the lines between competition and cooperation unclear?",
    qZh: "為甚競爭與合作的界線不清楚？",
    aEn: "Because the value chain is layered and unbundled. A firm can be a supplier, investor, distributor, complementor, and rival at the same time. Microsoft needs OpenAI but does not want full dependence. Google competes with Anthropic but also funds it. Perplexity challenges Google while relying on upstream model providers. Meta’s open strategy helps its own ecosystem while also helping outside rivals.",
    aZh: "因為這條價值鏈是分層且拆開的。一家公司可以同時是供應商、投資人、分發者、互補者與對手。Microsoft 需要 OpenAI，但又不想完全依賴它。Google 與 Anthropic 競爭，但也資助它。Perplexity 挑戰 Google，同時依賴上游模型供應商。Meta 的開放策略強化自己生態，也同時幫到外部對手。",
  },
  {
    qEn: "What is Google’s core strategic dilemma?",
    qZh: "Google 的核心策略困境是甚麼？",
    aEn: "Google’s dilemma is not whether it can build a good model. It is whether it can redesign Search around generative AI without destroying the economics and protections of traditional Search. Conversational answers raise inference cost, complicate ad monetization, increase liability risk, and can reduce publisher traffic. But moving too slowly risks losing the query starting point to ChatGPT, Perplexity, and others.",
    aZh: "Google 的困境，不是它能不能做出好模型，而是它能不能用生成式 AI 重設 Search，同時不摧毀傳統 Search 的經濟性與保護。對話式答案會提高推論成本、讓廣告變現更複雜、增加責任風險，也可能壓低 publisher 流量；但若動得太慢，又可能把 query 起點讓給 ChatGPT、Perplexity 等人。",
  },
  {
    qEn: "How does this case connect to prediction factories?",
    qZh: "這個 case 和 prediction factory 有何關聯？",
    aEn: "LLM-based products are large-scale prediction factories. They take input, generate probabilistic output, route that output through decision rules and product features, and then learn from feedback. The difference from earlier cases is scale and generality, not the underlying logic.",
    aZh: "關聯在於，LLM 型產品本質上就是大規模 prediction factory。它們接收輸入、產生機率式輸出、再透過 decision rules 與產品功能把輸出用起來，最後再從 feedback 中學習。和前面案例不同的，是規模與一般性，不是底層邏輯本身。",
  },
];

const referencePool = [
  {
    titleEn: "Google related",
    titleZh: "Google 相關",
    pointsEn: [
      "Bard in March 2023, Gemini in December 2023, Gemma in February 2024, AI Overviews in May 2024, AI Mode in May 2025, and Trillium TPU in December 2024 are useful chronology anchors.",
      "Precise search revenue, cost, antitrust, search-volume, and cash-position figures should remain in the verify-first bucket before quoting in class.",
    ],
    pointsZh: [
      "Bard 於 2023 年 3 月、Gemini 於 2023 年 12 月、Gemma 於 2024 年 2 月、AI Overviews 於 2024 年 5 月、AI Mode 於 2025 年 5 月、Trillium TPU 於 2024 年 12 月，這些可作為時序錨點。",
      "精確的搜尋收入、成本、反壟斷、搜尋量與現金部位數字，仍應留在引用前核對區。",
    ],
  },
  {
    titleEn: "OpenAI related",
    titleZh: "OpenAI 相關",
    pointsEn: [
      "Founding timeline, capped-profit shift, ChatGPT adoption milestones, valuation and revenue figures, GPT-4 parameter and training-cost claims, the board crisis, and major departures are useful detail items but not all should be treated as equally verified here.",
    ],
    pointsZh: [
      "創立時間線、capped-profit 轉型、ChatGPT 採用里程碑、估值與營收、GPT-4 參數與訓練成本說法、董事會事件與重要離職動態，都屬於有用細節，但不宜在此被當成同等強度的已核實事實。",
    ],
  },
  {
    titleEn: "Microsoft related",
    titleZh: "Microsoft 相關",
    pointsEn: [
      "The Kevin Scott warning, Prometheus branding, later investments, Mistral and Figure positions, Inflection talent moves, and internal-model cost claims belong in the reference pool unless re-checked line by line.",
    ],
    pointsZh: [
      "Kevin Scott 警告、Prometheus 命名、後續投資、Mistral 與 Figure 佈局、Inflection 人才收編，以及內部模型成本優勢等說法，都應放在 reference pool，逐條核對後再引用。",
    ],
  },
  {
    titleEn: "Meta related",
    titleZh: "Meta 相關",
    pointsEn: [
      "LLaMA release sequence, ad-revenue ratio, FAIR timeline, large GPU buildout plans, and superintelligence recruiting stories are high-value but verification-sensitive.",
    ],
    pointsZh: [
      "LLaMA 發布順序、廣告營收比重、FAIR 時間線、大規模 GPU 擴建計畫與超級智慧招募故事，都屬於有價值但對驗證很敏感的細節。",
    ],
  },
  {
    titleEn: "Anthropic related",
    titleZh: "Anthropic 相關",
    pointsEn: [
      "Founding date, Constitutional AI chronology, investment size, cloud-deal size, model-access claims, and comparative rankings should remain tagged for verification.",
    ],
    pointsZh: [
      "創立時間、Constitutional AI 時序、投資規模、雲端交易規模、模型可得性說法與相對排名，仍應保留核對標記。",
    ],
  },
  {
    titleEn: "DeepSeek related",
    titleZh: "DeepSeek 相關",
    pointsEn: [
      "Founding background, R1 performance comparisons, compute-efficiency claims, App Store rank, political reactions, and market-move numbers are notable but need careful source checking.",
    ],
    pointsZh: [
      "創辦背景、R1 表現對比、算力效率說法、App Store 排名、政治反應與市場波動數字，都值得注意，但必須小心核對來源。",
    ],
  },
  {
    titleEn: "Perplexity related",
    titleZh: "Perplexity 相關",
    pointsEn: [
      "Founder background, MAU estimates, ad pricing, Comet browser details, and Chrome-acquisition speculation should not be quoted casually without re-checking.",
    ],
    pointsZh: [
      "創辦團隊背景、MAU 估計、廣告定價、Comet 瀏覽器細節與 Chrome 收購推測，都不適合在未重查前輕易引用。",
    ],
  },
  {
    titleEn: "Nvidia related",
    titleZh: "Nvidia 相關",
    pointsEn: [
      "Market-control ranges, market-cap milestones, CUDA switching-cost logic, Blackwell timing, and sold-out production claims are part of the detail pool, not the core thesis layer.",
    ],
    pointsZh: [
      "市場控制區間、市值里程碑、CUDA 轉換成本邏輯、Blackwell 時點與產能售罄說法，都屬於 detail pool，不屬於核心主論點層。",
    ],
  },
  {
    titleEn: "One red-flag item",
    titleZh: "一條應明確標紅的項目",
    pointsEn: [
      "Do not use the claim that Google invented the earlier CNN breakthrough represented by the 2012 AlexNet paper unless it is independently verified. It is the weakest item in the current cross-draft pool.",
    ],
    pointsZh: [
      "除非另行獨立驗證，否則不要使用「Google 發明了 2012 年 AlexNet 所代表的早期 CNN 突破」這句。這是目前交叉草稿池裡最弱的一條。",
    ],
  },
];

const missingAndCheck = [
  {
    en: "The underlying structure is strong and quite complete for a study interface, but precise exhibit-level numbers still deserve a final pass against the original AI Wars case and optional notes before oral quoting.",
    zh: "作為學習介面，這份結構已相當完整，但若要在課堂上口頭引用精確數字，仍建議再對原始 AI Wars case 與 optional notes 做一次 exhibit 級別的核對。",
  },
  {
    en: "The safest approach is to keep the thesis, player logic, value-chain map, and Google dilemma in the core layer, and keep high-detail statistics in a clearly separated reference pool.",
    zh: "最穩的做法，是把 thesis、player logic、value-chain map 與 Google dilemma 放在核心層，把高細節統計數字明確隔離在 reference pool。",
  },
  {
    en: "A useful next verification step would be line-by-line confirmation of market share, cost, MAU, valuation, investment, and chronology claims that sit in the verify-first bucket.",
    zh: "下一步最有價值的核對工作，是逐條確認市占、成本、MAU、估值、投資金額與時序相關說法，尤其是目前被放進 verify-first bucket 的部分。",
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function LangText({ en, zh, className = "", as = "p" }) {
  const Tag = as;
  const mode = React.useContext(LanguageContext);

  if (mode === "zh") return <Tag className={className}>{zh}</Tag>;
  if (mode === "bi") {
    return (
      <div className={cx("space-y-2", className)}>
        <Tag>{en}</Tag>
        <Tag className="text-[0.96em]" style={{ color: PALETTE.sub }}>{zh}</Tag>
      </div>
    );
  }
  return <Tag className={className}>{en}</Tag>;
}

const LanguageContext = React.createContext("en");

function EvidencePill({ tagKey }) {
  const item = evidenceLegend.find((x) => x.key === tagKey);
  const mode = React.useContext(LanguageContext);
  if (!item) return null;
  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.02em]"
      style={{ borderColor: item.color + "55", background: item.color + "12", color: item.color }}
    >
      {mode === "zh" ? item.zh : item.en}
    </span>
  );
}

function EvidenceRow({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <EvidencePill key={tag} tagKey={tag} />
      ))}
    </div>
  );
}

function SectionHeader({ icon, eyebrowEn, eyebrowZh, titleEn, titleZh, bodyEn, bodyZh }) {
  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
        <Icon name={icon} className="text-current" size={15} />
        <LangText en={eyebrowEn} zh={eyebrowZh} as="span" className="font-medium" />
      </div>
      <LangText en={titleEn} zh={titleZh} as="h2" className="text-2xl font-semibold md:text-3xl" />
      {(bodyEn || bodyZh) ? (
        <LangText en={bodyEn} zh={bodyZh} className="max-w-4xl text-sm leading-7 md:text-[15px]" />
      ) : null}
    </div>
  );
}

function BrandChip({ label, tone = PALETTE.indigo }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
      style={{ borderColor: tone + "40", background: tone + "10", color: tone }}
    >
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
        style={{ background: tone, color: "#fff" }}
      >
        {label.slice(0, 1)}
      </span>
      {label}
    </span>
  );
}

function FloatingLanguageToggle({ mode, setMode, open, setOpen }) {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs shadow-sm backdrop-blur"
        style={{
          borderColor: PALETTE.line,
          background: "rgba(255,253,248,0.92)",
          color: PALETTE.ink,
        }}
        aria-label="Open language switcher"
      >
        <Icon name="globe" size={16} className="opacity-85" />
        <span className="hidden sm:inline">Language</span>
        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: PALETTE.smoke }}>
          {mode === "en" ? "EN" : mode === "zh" ? "中" : "EN+中"}
        </span>
      </button>
      {open ? (
        <div
          className="mt-2 w-44 rounded-2xl border p-2 shadow-lg"
          style={{ borderColor: PALETTE.line, background: PALETTE.paper }}
        >
          {[
            { key: "en", label: "English" },
            { key: "zh", label: "中文" },
            { key: "bi", label: "English + 中文" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setMode(item.key);
                setOpen(false);
              }}
              className="mb-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm last:mb-0"
              style={{
                background: mode === item.key ? PALETTE.smoke : "transparent",
                color: PALETTE.ink,
              }}
            >
              <span>{item.label}</span>
              {mode === item.key ? <Icon name="spark" size={14} className="text-current" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MiniStat({ icon, titleEn, titleZh, bodyEn, bodyZh, tags }) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: PALETTE.smoke }}>
          <Icon name={icon} size={20} className="text-current" />
        </span>
        <EvidenceRow tags={tags} />
      </div>
      <LangText en={titleEn} zh={titleZh} as="h3" className="text-base font-semibold" />
      <LangText en={bodyEn} zh={bodyZh} className="mt-2 text-sm leading-7" />
    </div>
  );
}

function ValueChainLayer({ item, index }) {
  return (
    <div className="relative rounded-3xl border p-5 md:p-6" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
      <div className="absolute left-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: item.color }}>
        {index + 1}
      </div>
      <div className="ml-12 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: item.color + "18", color: item.color }}>
            <Icon name={item.icon} size={20} />
          </div>
          <EvidenceRow tags={item.tags} />
          <LangText en={item.enTitle} zh={item.zhTitle} as="h3" className="text-lg font-semibold" />
          <LangText en={item.en} zh={item.zh} className="max-w-2xl text-sm leading-7" />
        </div>
        <div className="flex max-w-sm flex-wrap gap-2 md:justify-end">
          {item.players.map((player) => (
            <BrandChip key={player} label={player} tone={item.color} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayerCard({ player }) {
  return (
    <div className="rounded-3xl border p-5 md:p-6" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold text-white" style={{ background: player.tone }}>
            {player.short.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-lg font-semibold">{player.name}</div>
            <LangText en={player.role.en} zh={player.role.zh} className="mt-1 text-sm leading-6" />
          </div>
        </div>
        <EvidenceRow tags={player.tags} />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr,1fr]">
        <div>
          <LangText en="What gives it weight" zh="它的重要支點" as="h4" className="text-sm font-semibold uppercase tracking-[0.08em]" />
          <div className="mt-3 space-y-3">
            {player.strengths.en.map((_, idx) => (
              <div key={idx} className="rounded-2xl border px-4 py-3 text-sm leading-7" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                <LangText en={player.strengths.en[idx]} zh={player.strengths.zh[idx]} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <LangText en="Core tension" zh="核心張力" as="h4" className="text-sm font-semibold uppercase tracking-[0.08em]" />
          <div className="mt-3 rounded-2xl border p-4 text-sm leading-7" style={{ borderColor: player.tone + "35", background: player.tone + "10" }}>
            <LangText en={player.tension.en} zh={player.tension.zh} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CoopetitionRow({ item }) {
  return (
    <div className="grid gap-4 rounded-2xl border p-4 md:grid-cols-[180px,40px,1fr]" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
      <div className="flex flex-wrap items-center gap-2">
        <BrandChip label={item.left} tone={PALETTE.indigo} />
        <BrandChip label={item.right} tone={PALETTE.vermilion} />
      </div>
      <div className="flex items-center justify-center">
        <Icon name="arrow" size={18} className="opacity-70" />
      </div>
      <LangText en={item.en} zh={item.zh} className="text-sm leading-7" />
    </div>
  );
}

function FrameworkCard({ card }) {
  return (
    <div className="rounded-3xl border p-5" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: PALETTE.smoke }}>
          <Icon name={card.icon} size={18} />
        </div>
        <EvidenceRow tags={card.tags} />
      </div>
      <LangText en={card.enTitle} zh={card.zhTitle} as="h3" className="text-base font-semibold" />
      <LangText en={card.en} zh={card.zh} className="mt-2 text-sm leading-7" />
    </div>
  );
}

function ColdCallItem({ item }) {
  const mode = React.useContext(LanguageContext);
  return (
    <details className="group rounded-2xl border p-0" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
        <div className="pr-4 text-left font-medium">
          {mode === "zh" ? item.qZh : mode === "bi" ? (
            <div className="space-y-1">
              <div>{item.qEn}</div>
              <div className="text-sm" style={{ color: PALETTE.sub }}>{item.qZh}</div>
            </div>
          ) : item.qEn}
        </div>
        <div className="transition-transform group-open:rotate-90">
          <Icon name="arrow" size={18} />
        </div>
      </summary>
      <div className="border-t px-5 py-4 text-sm leading-7" style={{ borderColor: PALETTE.line }}>
        <LangText en={item.aEn} zh={item.aZh} />
      </div>
    </details>
  );
}

function ReferenceItem({ item }) {
  const mode = React.useContext(LanguageContext);
  const title = mode === "zh" ? item.titleZh : item.titleEn;
  const enPoints = item.pointsEn || [];
  const zhPoints = item.pointsZh || [];

  return (
    <details className="group rounded-2xl border" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium">
        <span>{title}</span>
        <div className="flex items-center gap-2">
          <EvidencePill tagKey="verify" />
          <div className="transition-transform group-open:rotate-90">
            <Icon name="arrow" size={18} />
          </div>
        </div>
      </summary>
      <div className="border-t px-5 py-4" style={{ borderColor: PALETTE.line }}>
        {mode === "bi" ? (
          <div className="space-y-4">
            {enPoints.map((point, idx) => (
              <div key={idx} className="rounded-2xl border p-4 text-sm leading-7" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                <div>{point}</div>
                <div className="mt-2" style={{ color: PALETTE.sub }}>{zhPoints[idx]}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {(mode === "zh" ? zhPoints : enPoints).map((point, idx) => (
              <div key={idx} className="rounded-2xl border p-4 text-sm leading-7" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                {point}
              </div>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

function TopNav() {
  const items = [
    { href: "#thesis", en: "Thesis", zh: "主論點" },
    { href: "#value-chain", en: "Value Chain", zh: "價值鏈" },
    { href: "#players", en: "Players", zh: "玩家" },
    { href: "#google", en: "Google", zh: "Google" },
    { href: "#frameworks", en: "Course Lens", zh: "課程框架" },
    { href: "#appendix", en: "Reference Pool", zh: "附錄池" },
  ];
  const mode = React.useContext(LanguageContext);
  return (
    <div className="sticky top-0 z-30 border-b backdrop-blur" style={{ borderColor: PALETTE.line, background: "rgba(252,250,242,0.88)" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-white" style={{ background: PALETTE.ink }}>
            <Icon name="layers" size={18} />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-[0.08em] uppercase">AI Wars</div>
            <div className="text-xs" style={{ color: PALETTE.sub }}>
              {mode === "zh" ? "超詳細視覺化雙語架構" : mode === "bi" ? "Detailed bilingual learning infrastructure / 超詳細雙語學習架構" : "Detailed bilingual learning infrastructure"}
            </div>
          </div>
        </div>
        <div className="hidden flex-wrap items-center gap-4 md:flex">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="text-sm transition-opacity hover:opacity-100" style={{ color: PALETTE.sub }}>
              {mode === "zh" ? item.zh : mode === "bi" ? `${item.en} / ${item.zh}` : item.en}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <Icon name="menu" size={18} className="opacity-75" />
        </div>
      </div>
    </div>
  );
}

export default function AIWarsInfrastructure() {
  const [mode, setMode] = useState("en");
  const [toggleOpen, setToggleOpen] = useState(false);

  const pageTitle = useMemo(() => {
    if (mode === "zh") return "AI Wars：超詳細視覺化架構";
    if (mode === "bi") return "AI Wars: Detailed Visual Infrastructure / AI Wars：超詳細視覺化架構";
    return "AI Wars: Detailed Visual Infrastructure";
  }, [mode]);

  return (
    <LanguageContext.Provider value={mode}>
      <div className="min-h-screen" style={{ background: PALETTE.bg, color: PALETTE.ink }}>
        <TopNav />
        <FloatingLanguageToggle mode={mode} setMode={setMode} open={toggleOpen} setOpen={setToggleOpen} />

        <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6 md:pt-10">
          <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:gap-8">
            <div className="rounded-[28px] border p-6 md:p-8" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
              <div className="flex flex-wrap items-center gap-2">
                <EvidencePill tagKey="case" />
                <EvidencePill tagKey="note" />
                <EvidencePill tagKey="course" />
                <EvidencePill tagKey="synth" />
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                <Icon name="eye" size={14} />
                <LangText en="Built for general readers first" zh="預設先面向一般讀者" as="span" className="font-medium" />
              </div>

              <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl md:leading-[1.05]">
                {pageTitle}
              </h1>

              <LangText
                en="A rebuilt reader-facing map of the AI industry race, organized by thesis, value chain, player logic, Google’s dilemma, and direct links back to course frameworks. The default mode is English. A subtle floating control lets you switch to Chinese-only or bilingual view."
                zh="這是一份重建後、直接面向讀者的 AI 產業競局地圖，依序整理成 thesis、value chain、player logic、Google dilemma，以及和課程框架的直接連結。預設為英文版，右下角的隱藏式控制可以切換成純中文或中英同步版。"
                className="mt-4 max-w-3xl text-sm leading-7 md:text-[15px]"
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {quickFacts.map((card) => (
                  <MiniStat
                    key={card.enTitle}
                    icon={card.icon}
                    titleEn={card.enTitle}
                    titleZh={card.zhTitle}
                    bodyEn={card.en}
                    bodyZh={card.zh}
                    tags={card.tags}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border p-6" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
                <div className="flex items-center gap-2">
                  <Icon name="arrow" size={18} className="opacity-70" />
                  <LangText en="Fast reading path" zh="快速閱讀路徑" as="h2" className="text-lg font-semibold" />
                </div>
                <div className="mt-4 space-y-3">
                  {readerPath.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-7" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                      <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: PALETTE.ink }}>
                        {index + 1}
                      </div>
                      <LangText en={step.en} zh={step.zh} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border p-6" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
                <div className="flex items-center justify-between gap-3">
                  <LangText en="Evidence labels" zh="證據標記" as="h2" className="text-lg font-semibold" />
                  <Icon name="filter" size={18} className="opacity-70" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {evidenceLegend.map((item) => (
                    <span key={item.key} className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs" style={{ borderColor: item.color + "35", background: item.color + "10", color: item.color }}>
                      <span className="inline-flex h-2 w-2 rounded-full" style={{ background: item.color }} />
                      {mode === "zh" ? item.zh : mode === "bi" ? `${item.en} / ${item.zh}` : item.en}
                    </span>
                  ))}
                </div>
                <LangText
                  en="The interface preserves different certainty levels on purpose. Core arguments stay in the main path. Precision-heavy claims stay in a separate reference pool instead of being blended into the same factual layer."
                  zh="這個介面刻意保留不同的確定性層級。核心論點放在主閱讀路徑；高精度數字與細節則被隔離在 reference pool，而不是硬混成同一層事實。"
                  className="mt-4 text-sm leading-7"
                />
              </div>
            </div>
          </section>

          <section id="thesis" className="mt-10 rounded-[32px] border p-6 md:p-8" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
            <SectionHeader
              icon="spark"
              eyebrowEn="Core thesis"
              eyebrowZh="核心主論點"
              titleEn="The single cleanest answer"
              titleZh="最乾淨的一句總答案"
              bodyEn="This is the best high-confidence thesis to hold onto when the case starts to sprawl."
              bodyZh="當 case 開始變得很大、很散時，最值得先抓住的，就是這一個高信心主論點。"
            />
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
              <div className="rounded-3xl border p-6 text-[15px] leading-8 md:text-base" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                <LangText en={thesis.en} zh={thesis.zh} />
              </div>
              <div className="rounded-3xl border p-6" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
                <LangText en="Why this wording works" zh="為甚這個寫法最穩" as="h3" className="text-base font-semibold" />
                <div className="mt-4 space-y-3 text-sm leading-7">
                  <div className="rounded-2xl border p-4" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                    <LangText en="It avoids flattening the industry into a one-number model race." zh="它避免把整個產業扁平化成單一模型分數競賽。" />
                  </div>
                  <div className="rounded-2xl border p-4" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                    <LangText en="It explains why Google is the focal firm without pretending other players are side characters." zh="它解釋了為甚 Google 是焦點公司，同時又不把其他玩家降成配角。" />
                  </div>
                  <div className="rounded-2xl border p-4" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                    <LangText en="It links directly back to Kevin Boudreau’s course language: value creation, operating model, value capture, ecosystem mapping, and prediction factories." zh="它也能直接接回 Kevin Boudreau 的課程語言：value creation、operating model、value capture、ecosystem mapping 與 prediction factories。" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="value-chain" className="mt-14 space-y-6">
            <SectionHeader
              icon="layers"
              eyebrowEn="Layered market map"
              eyebrowZh="分層市場地圖"
              titleEn="Generative AI is a stack, not one flat market"
              titleZh="生成式 AI 是堆疊，不是單一平面市場"
              bodyEn="The optional notes are most valuable here because they shift the discussion from one headline model war to a layered value-chain fight."
              bodyZh="在這一段，optional notes 最有價值，因為它把討論從單一 headline model war，轉成分層 value chain 的爭奪。"
            />
            <div className="space-y-4">
              {valueChain.map((item, index) => (
                <ValueChainLayer key={item.key} item={item} index={index} />
              ))}
            </div>
          </section>

          <section id="players" className="mt-14 space-y-6">
            <SectionHeader
              icon="users"
              eyebrowEn="Main player map"
              eyebrowZh="主要玩家版圖"
              titleEn="Who matters, and why each one matters differently"
              titleZh="誰重要，以及每一個人是怎麼不同地重要"
              bodyEn="The right answer is not a single list of company names. Each player matters because it sits at a different layer, with a different route to influence and monetization."
              bodyZh="正確答案不是一張公司名單而已。每個玩家之所以重要，是因為它站在不同層，掌握不同的影響力來源與變現路徑。"
            />
            <div className="grid gap-4 xl:grid-cols-2">
              {players.map((player) => (
                <PlayerCard key={player.name} player={player} />
              ))}
            </div>
          </section>

          <section className="mt-14 space-y-6">
            <SectionHeader
              icon="network"
              eyebrowEn="Competition and cooperation"
              eyebrowZh="競爭與合作"
              titleEn="The cleanest word is coopetition"
              titleZh="最準的一個詞是競合"
              bodyEn="The case prompt itself pushes the question of who competes with whom and who cooperates with whom. The useful answer is a layered map, not a clean split."
              bodyZh="case 本身就把問題推向：誰和誰競爭，誰和誰合作。真正有用的答法，是一張分層地圖，而不是硬切成乾淨兩邊。"
            />
            <div className="grid gap-4 xl:grid-cols-[1fr,0.82fr]">
              <div className="space-y-3">
                {coopetition.map((item) => (
                  <CoopetitionRow key={`${item.left}-${item.right}`} item={item} />
                ))}
              </div>
              <div className="rounded-[28px] border p-6" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
                <LangText en="Why the lines are blurry" zh="為甚界線會模糊" as="h3" className="text-lg font-semibold" />
                <div className="mt-4 space-y-3">
                  {blurReasons.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-7" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                      <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white" style={{ background: PALETTE.indigo }}>
                        {idx + 1}
                      </div>
                      <LangText en={item.en} zh={item.zh} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="google" className="mt-14 space-y-6">
            <SectionHeader
              icon="search"
              eyebrowEn="Google’s dilemma"
              eyebrowZh="Google 的策略困境"
              titleEn="The hardest redesign problem in the case"
              titleZh="本案最難的一個重設問題"
              bodyEn="Google’s real problem is not whether it can build a strong model. It is whether it can productize generative AI inside Search without breaking the economic and governance structure of Search."
              bodyZh="Google 真正的問題，不是它能不能做出強模型，而是它能不能把生成式 AI 產品化地放進 Search，同時不破壞 Search 的經濟結構與治理結構。"
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {googleTensions.map((item) => (
                <div key={item.titleEn} className="rounded-3xl border p-5" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: PALETTE.smoke }}>
                    <Icon name={item.icon} size={18} />
                  </div>
                  <LangText en={item.titleEn} zh={item.titleZh} as="h3" className="mt-4 text-base font-semibold" />
                  <LangText en={item.en} zh={item.zh} className="mt-2 text-sm leading-7" />
                </div>
              ))}
            </div>
            <div className="rounded-3xl border p-6 text-[15px] leading-8" style={{ borderColor: PALETTE.vermilion + "35", background: PALETTE.vermilion + "08" }}>
              <LangText
                en="The sharpest classroom line is this: Google is trying to defend the most profitable query system in the world while redesigning the interface that made it profitable in the first place."
                zh="最適合上課抓的一句話是：Google 一邊想守住全球最賺錢的 query system，一邊又不得不重設當初讓它賺錢的介面。"
              />
            </div>
          </section>

          <section className="mt-14 space-y-6">
            <SectionHeader
              icon="shield"
              eyebrowEn="Open versus closed"
              eyebrowZh="開源與閉源"
              titleEn="This is a positioning debate, not a moral debate"
              titleZh="這不是道德辯論，而是定位辯論"
              bodyEn="Open and closed strategies are different ways of deciding where to keep control and where to let diffusion run."
              bodyZh="開源與閉源，是在決定哪一層要握控制權，哪一層要讓擴散發生的不同策略選擇。"
            />
            <div className="overflow-hidden rounded-[28px] border" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
              <div className="grid border-b md:grid-cols-[220px,1fr,1fr]" style={{ borderColor: PALETTE.line }}>
                <div className="p-4 font-semibold" />
                <div className="border-l p-4 text-base font-semibold" style={{ borderColor: PALETTE.line, color: PALETTE.moss }}>
                  <LangText en="Open strategy" zh="開放策略" />
                </div>
                <div className="border-l p-4 text-base font-semibold" style={{ borderColor: PALETTE.line, color: PALETTE.vermilion }}>
                  <LangText en="Closed strategy" zh="閉源策略" />
                </div>
              </div>
              {openClosed.map((row, idx) => (
                <div key={idx} className="grid md:grid-cols-[220px,1fr,1fr]" style={{ borderTop: idx === 0 ? "none" : `1px solid ${PALETTE.line}` }}>
                  <div className="p-4 text-sm font-medium" style={{ background: PALETTE.smoke }}>
                    <LangText en={row.dim.en} zh={row.dim.zh} />
                  </div>
                  <div className="border-l p-4 text-sm leading-7" style={{ borderColor: PALETTE.line }}>
                    <LangText en={row.open.en} zh={row.open.zh} />
                  </div>
                  <div className="border-l p-4 text-sm leading-7" style={{ borderColor: PALETTE.line }}>
                    <LangText en={row.closed.en} zh={row.closed.zh} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="frameworks" className="mt-14 space-y-6">
            <SectionHeader
              icon="book"
              eyebrowEn="Direct links back to class"
              eyebrowZh="和課程的直接連結"
              titleEn="How this case fits Kevin Boudreau’s course language"
              titleZh="這個 case 如何直接接回 Kevin Boudreau 的課程語言"
              bodyEn="This is where the interface stops being only a company map and becomes a study tool."
              bodyZh="這一段會讓整個頁面從公司地圖，真正變成可用的學習工具。"
            />
            <div className="grid gap-4 xl:grid-cols-3">
              {frameworkCards.map((card) => (
                <FrameworkCard key={card.enTitle} card={card} />
              ))}
            </div>
          </section>

          <section className="mt-14 space-y-6">
            <SectionHeader
              icon="spark"
              eyebrowEn="Cold-call ready"
              eyebrowZh="冷抽問可直接回答"
              titleEn="Short answers that still sound grounded"
              titleZh="短，但仍站得住腳的回答版本"
              bodyEn="These are built to stay clear, direct, and usable in class without collapsing nuance into fluff."
              bodyZh="這些答案是為了讓你在課堂上能短而準地回答，同時不把細節壓扁成空話。"
            />
            <div className="space-y-3">
              {coldCalls.map((item) => (
                <ColdCallItem key={item.qEn} item={item} />
              ))}
            </div>
          </section>

          <section id="appendix" className="mt-14 space-y-6">
            <SectionHeader
              icon="alert"
              eyebrowEn="High-detail appendix"
              eyebrowZh="高細節附錄"
              titleEn="Reference pool kept separate on purpose"
              titleZh="刻意隔離的 reference pool"
              bodyEn="Nothing here is useless. The point is simply that detail density should not be confused with equal certainty."
              bodyZh="這一區不是沒用，而是高細節不應被誤認成和核心論點同等強度的已核實事實。"
            />
            <div className="space-y-3">
              {referencePool.map((item) => (
                <ReferenceItem key={item.titleEn} item={item} />
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-[32px] border p-6 md:p-8" style={{ borderColor: PALETTE.line, background: PALETTE.paper }}>
            <SectionHeader
              icon="alert"
              eyebrowEn="Completeness and verification"
              eyebrowZh="完整性與核對提醒"
              titleEn="What is still worth checking before final quoting"
              titleZh="在最終引用前，仍值得再查的地方"
              bodyEn="The structure below is designed to be complete enough for studying, but still honest about where precision checking would improve confidence."
              bodyZh="這個結構已經足夠用來學習，但也必須誠實標出哪些地方若再做精確核對，整體信心會更高。"
            />
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {missingAndCheck.map((item, idx) => (
                <div key={idx} className="rounded-3xl border p-5 text-sm leading-7" style={{ borderColor: PALETTE.line, background: PALETTE.smoke }}>
                  <LangText en={item.en} zh={item.zh} />
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </LanguageContext.Provider>
  );
}
