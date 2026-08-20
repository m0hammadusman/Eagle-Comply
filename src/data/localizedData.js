import { 
  solutions as rawSolutions, 
  industries as rawIndustries, 
  countries as rawCountries, 
  regulations as rawRegulations, 
  insights as rawInsights, 
  resources as rawResources, 
  caseStudies as rawCaseStudies, 
  experts as rawExperts, 
  careers as rawCareers 
} from './complianceData';

import localizedJson from './localizedData.json';


const projectOverrides = {
  en: {
    solutions: {
      'financial-crime-compliance': {name:'AML/CFT & Financial Crime Compliance',category:'Financial Crime',badge:'Core Practice',shortDesc:'End-to-end AML/CFT programmes, KYC/CDD/EDD, risk assessments, transaction monitoring, sanctions and Travel Rule implementation.',valueProp:'Build auditable, risk-based AML/CFT frameworks aligned with applicable international standards.'},
      'regulatory-compliance': {name:'Regulatory Compliance & Licensing Readiness',category:'Regulatory Advisory',badge:'Strategic Advisory',shortDesc:'Regulatory frameworks, licensing readiness, gap assessments, monitoring programmes, reporting and regulatory change management.',valueProp:'Translate complex regulatory requirements into practical, documented compliance programmes.'},
      'risk-governance': {name:'Enterprise Risk Management & Governance',category:'Risk & Governance',badge:'Board-Level Governance',shortDesc:'Enterprise risk assessments, risk appetite, operational risk, third-party oversight, governance structures and control testing.',valueProp:'Establish proportionate risk and governance frameworks that support controlled growth.'},
      'legal-compliance': {name:'Legal & Compliance Advisory',category:'Legal Advisory',badge:'Specialized Advisory',shortDesc:'Regulatory research, compliance documentation, contract and policy review, digital asset advisory and privacy compliance.',valueProp:'Bridge statutory obligations and operational execution with clear, practical advisory support.'},
      'compliance-training': {name:'Institutional Compliance & AML Training',category:'Training & Capability',badge:'Capability Building',shortDesc:'AML/CFT, sanctions, KYC/CDD, regulatory obligations, board awareness and role-based compliance training.',valueProp:'Build practical compliance capability across frontline teams, management and boards.'},
      'compliance-reviews': {name:'Independent Reviews & Regulatory Gap Assessments',category:'Independent Assurance',badge:'Independent Assurance',shortDesc:'Independent AML/CFT reviews, compliance testing, regulatory gap assessments, remediation roadmaps and assurance reporting.',valueProp:'Obtain an independent view of control effectiveness, gaps and remediation priorities.'}
    },
    industries: {
      banking:{name:'Banking & Credit Institutions'},fintech:{name:'FinTech & Digital Challengers'},payments:{name:'Payment Service Providers'},'remittance-msb':{name:'Remittance & Money Service Businesses'},'digital-assets':{name:'Crypto & Digital Assets'},'financial-services':{name:'Financial Services'},startups:{name:'Regulated-Industry Startups'}
    },
    countries:{'united-kingdom':{name:'United Kingdom'},'european-union':{name:'European Union'},'united-states':{name:'United States'},'united-arab-emirates':{name:'United Arab Emirates'},singapore:{name:'Singapore'},pakistan:{name:'Pakistan'},australia:{name:'Australia'}},
    regulations:{'fatf-standards':{name:'FATF Recommendations'},'eu-6amld':{name:'EU 6AMLD'},'uk-mlr-2017':{name:'UK Money Laundering Regulations 2017'},'us-bsa-aml':{name:'US BSA/AML'},'eu-mica':{name:'EU MiCA'},gdpr:{name:'GDPR & Data Protection'}}
  },
  fr: {
    solutions:{
      'financial-crime-compliance':{name:'Conformité AML/CFT & criminalité financière',category:'Criminalité financière',badge:'Domaine clé',shortDesc:'Programmes AML/CFT, KYC/CDD/EDD, évaluations des risques, surveillance des transactions, sanctions et Travel Rule.',valueProp:'Construire des cadres AML/CFT fondés sur les risques et vérifiables.'},
      'regulatory-compliance':{name:'Conformité réglementaire & préparation aux licences',category:'Conseil réglementaire',badge:'Conseil stratégique',shortDesc:'Cadres réglementaires, préparation aux licences, analyses d’écarts, monitoring, reporting et gestion du changement.',valueProp:'Transformer les exigences réglementaires complexes en programmes pratiques et documentés.'},
      'risk-governance':{name:'Gestion des risques & gouvernance d’entreprise',category:'Risques & gouvernance',badge:'Gouvernance conseil',shortDesc:'Évaluations des risques, appétit au risque, risques opérationnels, tiers, gouvernance et tests des contrôles.',valueProp:'Mettre en place une gouvernance des risques proportionnée favorisant une croissance maîtrisée.'},
      'legal-compliance':{name:'Conseil juridique & conformité',category:'Conseil juridique',badge:'Conseil spécialisé',shortDesc:'Recherche réglementaire, documentation, contrats et politiques, actifs numériques et confidentialité.',valueProp:'Relier les obligations légales à l’exécution opérationnelle avec un conseil pratique.'},
      'compliance-training':{name:'Formation conformité & AML institutionnelle',category:'Formation',badge:'Développement des compétences',shortDesc:'Formation AML/CFT, sanctions, KYC/CDD, obligations réglementaires et sensibilisation des dirigeants.',valueProp:'Développer les compétences de conformité des équipes et dirigeants.'},
      'compliance-reviews':{name:'Revues indépendantes & analyses d’écarts réglementaires',category:'Assurance indépendante',badge:'Assurance indépendante',shortDesc:'Revues AML/CFT, tests de conformité, gap assessments, plans de remédiation et reporting.',valueProp:'Obtenir une évaluation indépendante de l’efficacité des contrôles et des écarts.'}
    },
    industries:{banking:{name:'Banques & établissements de crédit'},fintech:{name:'FinTech & acteurs numériques'},payments:{name:'Prestataires de services de paiement'},'remittance-msb':{name:'Transferts de fonds & MSB'},'digital-assets':{name:'Crypto & actifs numériques'},'financial-services':{name:'Services financiers'},startups:{name:'Startups des secteurs réglementés'}},
    countries:{'united-kingdom':{name:'Royaume-Uni'},'european-union':{name:'Union européenne'},'united-states':{name:'États-Unis'},'united-arab-emirates':{name:'Émirats arabes unis'},singapore:{name:'Singapour'},pakistan:{name:'Pakistan'},australia:{name:'Australie'}},
    regulations:{'fatf-standards':{name:'Recommandations du GAFI'},'eu-6amld':{name:'6AMLD de l’UE'},'uk-mlr-2017':{name:'Règlement britannique 2017 sur le blanchiment'},'us-bsa-aml':{name:'BSA/AML américain'},'eu-mica':{name:'MiCA de l’UE'},gdpr:{name:'RGPD & protection des données'}}
  },
  de:{
    solutions:{
      'financial-crime-compliance':{name:'AML/CFT & Finanzkriminalitäts-Compliance',category:'Finanzkriminalität',badge:'Kernbereich',shortDesc:'AML/CFT-Programme, KYC/CDD/EDD, Risikobewertungen, Transaktionsmonitoring, Sanktionen und Travel Rule.',valueProp:'Prüfbare, risikobasierte AML/CFT-Rahmenwerke aufbauen.'},
      'regulatory-compliance':{name:'Regulatorische Compliance & Lizenzvorbereitung',category:'Regulatorische Beratung',badge:'Strategische Beratung',shortDesc:'Regulatorische Rahmenwerke, Lizenzvorbereitung, Gap-Analysen, Monitoring, Reporting und Regulatory Change.',valueProp:'Komplexe regulatorische Anforderungen in praktische, dokumentierte Programme übersetzen.'},
      'risk-governance':{name:'Unternehmensrisikomanagement & Governance',category:'Risiko & Governance',badge:'Board Governance',shortDesc:'Unternehmensrisiken, Risk Appetite, operationelle Risiken, Drittanbieter, Governance und Kontrolltests.',valueProp:'Proportionierte Risiko- und Governance-Rahmenwerke für kontrolliertes Wachstum etablieren.'},
      'legal-compliance':{name:'Rechts- & Compliance-Beratung',category:'Rechtsberatung',badge:'Spezialisierte Beratung',shortDesc:'Regulatorische Recherche, Compliance-Dokumentation, Vertrags- und Richtlinienprüfung, Digital Assets und Datenschutz.',valueProp:'Gesetzliche Pflichten und operative Umsetzung durch klare Beratung verbinden.'},
      'compliance-training':{name:'Institutionelle Compliance- & AML-Schulung',category:'Training',badge:'Kompetenzaufbau',shortDesc:'AML/CFT, Sanktionen, KYC/CDD, regulatorische Pflichten und Schulungen für Management und Mitarbeitende.',valueProp:'Praktische Compliance-Kompetenz in Teams, Management und Boards aufbauen.'},
      'compliance-reviews':{name:'Unabhängige Reviews & regulatorische Gap-Assessments',category:'Unabhängige Prüfung',badge:'Independent Assurance',shortDesc:'AML/CFT-Reviews, Compliance-Tests, Gap-Assessments, Maßnahmenpläne und Assurance-Reporting.',valueProp:'Eine unabhängige Sicht auf Kontrollwirksamkeit, Lücken und Prioritäten erhalten.'}
    },
    industries:{banking:{name:'Banken & Kreditinstitute'},fintech:{name:'FinTech & digitale Herausforderer'},payments:{name:'Zahlungsdienstleister'},'remittance-msb':{name:'Geldtransfer & Money Service Businesses'},'digital-assets':{name:'Krypto & digitale Vermögenswerte'},'financial-services':{name:'Finanzdienstleistungen'},startups:{name:'Startups in regulierten Branchen'}},
    countries:{'united-kingdom':{name:'Vereinigtes Königreich'},'european-union':{name:'Europäische Union'},'united-states':{name:'Vereinigte Staaten'},'united-arab-emirates':{name:'Vereinigte Arabische Emirate'},singapore:{name:'Singapur'},pakistan:{name:'Pakistan'},australia:{name:'Australien'}},
    regulations:{'fatf-standards':{name:'FATF-Empfehlungen'},'eu-6amld':{name:'EU 6AMLD'},'uk-mlr-2017':{name:'UK Geldwäscheverordnung 2017'},'us-bsa-aml':{name:'US BSA/AML'},'eu-mica':{name:'EU MiCA'},gdpr:{name:'DSGVO & Datenschutz'}}
  },
  es:{
    solutions:{
      'financial-crime-compliance':{name:'Cumplimiento AML/CFT y Delitos Financieros',category:'Delitos financieros',badge:'Práctica principal',shortDesc:'Programas AML/CFT, KYC/CDD/EDD, evaluaciones de riesgo, monitoreo de transacciones, sanciones y Travel Rule.',valueProp:'Diseñar marcos AML/CFT auditables y basados en riesgos.'},
      'regulatory-compliance':{name:'Cumplimiento Regulatorio y Preparación para Licencias',category:'Asesoría regulatoria',badge:'Asesoría estratégica',shortDesc:'Marcos regulatorios, preparación de licencias, análisis de brechas, monitoreo, reporting y gestión del cambio.',valueProp:'Convertir requisitos regulatorios complejos en programas prácticos y documentados.'},
      'risk-governance':{name:'Gestión de Riesgos Empresariales y Gobierno',category:'Riesgo y gobierno',badge:'Gobierno del consejo',shortDesc:'Evaluaciones de riesgo, apetito de riesgo, riesgo operativo, terceros, gobierno y pruebas de controles.',valueProp:'Establecer marcos proporcionales de riesgo y gobierno para un crecimiento controlado.'},
      'legal-compliance':{name:'Asesoría Legal y de Cumplimiento',category:'Asesoría legal',badge:'Asesoría especializada',shortDesc:'Investigación regulatoria, documentación, revisión de contratos y políticas, activos digitales y privacidad.',valueProp:'Conectar las obligaciones legales con la ejecución operativa de forma clara.'},
      'compliance-training':{name:'Formación Institucional en Cumplimiento y AML',category:'Formación',badge:'Desarrollo de capacidades',shortDesc:'Formación AML/CFT, sanciones, KYC/CDD, obligaciones regulatorias y sensibilización de equipos y consejos.',valueProp:'Desarrollar capacidades prácticas de cumplimiento en toda la organización.'},
      'compliance-reviews':{name:'Revisiones Independientes y Evaluaciones de Brechas',category:'Aseguramiento independiente',badge:'Aseguramiento',shortDesc:'Revisiones AML/CFT, pruebas de cumplimiento, análisis de brechas, planes de remediación e informes.',valueProp:'Obtener una visión independiente de la eficacia de los controles y las brechas.'}
    },
    industries:{banking:{name:'Banca e Instituciones de Crédito'},fintech:{name:'FinTech y Nuevos Operadores Digitales'},payments:{name:'Proveedores de Servicios de Pago'},'remittance-msb':{name:'Remesas y Money Service Businesses'},'digital-assets':{name:'Criptoactivos y Activos Digitales'},'financial-services':{name:'Servicios Financieros'},startups:{name:'Startups de Sectores Regulados'}},
    countries:{'united-kingdom':{name:'Reino Unido'},'european-union':{name:'Unión Europea'},'united-states':{name:'Estados Unidos'},'united-arab-emirates':{name:'Emiratos Árabes Unidos'},singapore:{name:'Singapur'},pakistan:{name:'Pakistán'},australia:{name:'Australia'}},
    regulations:{'fatf-standards':{name:'Recomendaciones del GAFI'},'eu-6amld':{name:'6AMLD de la UE'},'uk-mlr-2017':{name:'Reglamento británico contra el blanqueo 2017'},'us-bsa-aml':{name:'BSA/AML de EE. UU.'},'eu-mica':{name:'MiCA de la UE'},gdpr:{name:'RGPD y protección de datos'}}
  }
};


for (const lang of ['it','pt','ar','ja','zh','ko']) {
  projectOverrides[lang] = {
    solutions: Object.fromEntries(Object.entries(projectOverrides.en.solutions).map(([id,v]) => [id, { ...v }])),
    industries: Object.fromEntries(Object.entries(projectOverrides.en.industries).map(([id,v]) => [id, { ...v }])),
    countries: Object.fromEntries(Object.entries(projectOverrides.en.countries).map(([id,v]) => [id, { ...v }])),
    regulations: Object.fromEntries(Object.entries(projectOverrides.en.regulations).map(([id,v]) => [id, { ...v }]))
  };
}
Object.assign(projectOverrides.it, {
  solutions: {...projectOverrides.it.solutions,
    'financial-crime-compliance':{...projectOverrides.en.solutions['financial-crime-compliance'],name:'Conformità AML/CFT e criminalità finanziaria'},
    'regulatory-compliance':{...projectOverrides.en.solutions['regulatory-compliance'],name:'Conformità normativa e preparazione alle licenze'},
    'risk-governance':{...projectOverrides.en.solutions['risk-governance'],name:'Gestione del rischio aziendale e governance'},
    'legal-compliance':{...projectOverrides.en.solutions['legal-compliance'],name:'Consulenza legale e compliance'},
    'compliance-training':{...projectOverrides.en.solutions['compliance-training'],name:'Formazione istituzionale compliance e AML'},
    'compliance-reviews':{...projectOverrides.en.solutions['compliance-reviews'],name:'Review indipendenti e gap assessment regolamentari'}},
  industries:{banking:{name:'Banche e istituti di credito'},fintech:{name:'FinTech e operatori digitali'},payments:{name:'Prestatori di servizi di pagamento'},'remittance-msb':{name:'Rimesse e Money Service Business'},'digital-assets':{name:'Crypto e asset digitali'},'financial-services':{name:'Servizi finanziari'},startups:{name:'Startup in settori regolamentati'}},
  countries:{'united-kingdom':{name:'Regno Unito'},'european-union':{name:'Unione Europea'},'united-states':{name:'Stati Uniti'},'united-arab-emirates':{name:'Emirati Arabi Uniti'},singapore:{name:'Singapore'},pakistan:{name:'Pakistan'},australia:{name:'Australia'}},
  regulations:{'fatf-standards':{name:'Raccomandazioni FATF'},'eu-6amld':{name:'EU 6AMLD'},'uk-mlr-2017':{name:'UK Money Laundering Regulations 2017'},'us-bsa-aml':{name:'US BSA/AML'},'eu-mica':{name:'EU MiCA'},gdpr:{name:'GDPR e protezione dei dati'}}
});
Object.assign(projectOverrides.pt, {industries:{banking:{name:'Bancos e instituições de crédito'},fintech:{name:'FinTech e operadores digitais'},payments:{name:'Prestadores de serviços de pagamento'},'remittance-msb':{name:'Remessas e Money Service Businesses'},'digital-assets':{name:'Criptoativos e ativos digitais'},'financial-services':{name:'Serviços financeiros'},startups:{name:'Startups em setores regulados'}}});
Object.assign(projectOverrides.ar, {industries:{banking:{name:'البنوك ومؤسسات الائتمان'},fintech:{name:'التقنية المالية والجهات الرقمية'},payments:{name:'مقدمو خدمات الدفع'},'remittance-msb':{name:'الحوالات وشركات خدمات الأموال'},'digital-assets':{name:'الأصول الرقمية والعملات المشفرة'},'financial-services':{name:'الخدمات المالية'},startups:{name:'الشركات الناشئة في القطاعات المنظمة'}}});
Object.assign(projectOverrides.ja, {industries:{banking:{name:'銀行・信用機関'},fintech:{name:'FinTech・デジタル事業者'},payments:{name:'決済サービス事業者'},'remittance-msb':{name:'送金・マネーサービス事業者'},'digital-assets':{name:'暗号資産・デジタル資産'},'financial-services':{name:'金融サービス'},startups:{name:'規制業界のスタートアップ'}}});
Object.assign(projectOverrides.zh, {industries:{banking:{name:'银行与信贷机构'},fintech:{name:'金融科技与数字创新企业'},payments:{name:'支付服务提供商'},'remittance-msb':{name:'汇款与货币服务企业'},'digital-assets':{name:'加密资产与数字资产'},'financial-services':{name:'金融服务'},startups:{name:'受监管行业初创企业'}}});
Object.assign(projectOverrides.ko, {industries:{banking:{name:'은행 및 신용기관'},fintech:{name:'핀테크 및 디지털 사업자'},payments:{name:'결제 서비스 제공업체'},'remittance-msb':{name:'송금 및 머니서비스 사업자'},'digital-assets':{name:'암호자산 및 디지털자산'},'financial-services':{name:'금융서비스'},startups:{name:'규제 산업 스타트업'}}});


const remainingServiceNames = {
  it:{'financial-crime-compliance':'Conformità AML/CFT e criminalità finanziaria','regulatory-compliance':'Conformità normativa e preparazione alle licenze','risk-governance':'Gestione del rischio aziendale e governance','legal-compliance':'Consulenza legale e compliance','compliance-training':'Formazione istituzionale compliance e AML','compliance-reviews':'Review indipendenti e gap assessment regolamentari'},
  pt:{'financial-crime-compliance':'Conformidade AML/CFT e crimes financeiros','regulatory-compliance':'Conformidade regulatória e preparação para licenciamento','risk-governance':'Gestão de riscos empresariais e governança','legal-compliance':'Consultoria jurídica e de compliance','compliance-training':'Formação institucional em compliance e AML','compliance-reviews':'Revisões independentes e avaliações de lacunas'},
  ar:{'financial-crime-compliance':'الامتثال لمكافحة غسل الأموال وتمويل الإرهاب والجرائم المالية','regulatory-compliance':'الامتثال التنظيمي والاستعداد للترخيص','risk-governance':'إدارة المخاطر المؤسسية والحوكمة','legal-compliance':'الاستشارات القانونية والامتثال','compliance-training':'التدريب المؤسسي على الامتثال وAML','compliance-reviews':'المراجعات المستقلة وتقييمات الفجوات التنظيمية'},
  ja:{'financial-crime-compliance':'AML/CFT・金融犯罪コンプライアンス','regulatory-compliance':'規制コンプライアンス・ライセンス準備','risk-governance':'エンタープライズリスク管理・ガバナンス','legal-compliance':'法務・コンプライアンスアドバイザリー','compliance-training':'コンプライアンス・AML研修','compliance-reviews':'独立レビュー・規制ギャップ評価'},
  zh:{'financial-crime-compliance':'AML/CFT 与金融犯罪合规','regulatory-compliance':'监管合规与许可准备','risk-governance':'企业风险管理与治理','legal-compliance':'法律与合规咨询','compliance-training':'机构合规与 AML 培训','compliance-reviews':'独立审查与监管差距评估'},
  ko:{'financial-crime-compliance':'AML/CFT 및 금융범죄 컴플라이언스','regulatory-compliance':'규제 컴플라이언스 및 라이선스 준비','risk-governance':'전사적 위험관리 및 거버넌스','legal-compliance':'법률 및 컴플라이언스 자문','compliance-training':'기관 컴플라이언스 및 AML 교육','compliance-reviews':'독립 검토 및 규제 격차 평가'}
};
for (const [lang, names] of Object.entries(remainingServiceNames)) {
  for (const [id, name] of Object.entries(names)) projectOverrides[lang].solutions[id] = { ...projectOverrides[lang].solutions[id], name };
}

function getLangData(lang = 'en') {
  const base = localizedJson[lang] || localizedJson.en || {};
  const project = projectOverrides[lang] || projectOverrides.en;
  return {
    ...base,
    solutions: { ...(base.solutions || {}), ...(project.solutions || {}) },
    industries: { ...(base.industries || {}), ...(project.industries || {}) },
    countries: { ...(base.countries || {}), ...(project.countries || {}) },
    regulations: { ...(base.regulations || {}), ...(project.regulations || {}) }
  };
}

export function getLocalizedSolutions(lang = 'en') {
  const dict = getLangData(lang).solutions || {};
  return rawSolutions.map(s => {
    const loc = dict[s.id] || {};
    return {
      ...s,
      name: loc.name || s.name,
      category: loc.category || s.category,
      badge: loc.badge || s.badge,
      shortDesc: loc.shortDesc || s.shortDesc,
      valueProp: loc.valueProp || s.valueProp,
      pricingTier: loc.pricingTier || s.pricingTier,
      timeline: loc.timeline || s.timeline,
      challenges: loc.challenges || s.challenges,
      scope: loc.scope || s.scope,
      deliverables: loc.deliverables || s.deliverables,
      process: loc.process || s.process
    };
  });
}

export function getLocalizedIndustries(lang = 'en') {
  const dict = getLangData(lang).industries || {};
  return rawIndustries.map(ind => {
    const loc = dict[ind.id] || {};
    return {
      ...ind,
      name: loc.name || ind.name,
      heroTag: loc.heroTag || ind.heroTag,
      overview: loc.overview || ind.overview
    };
  });
}

export function getLocalizedCountries(lang = 'en') {
  const dict = getLangData(lang).countries || {};
  return rawCountries.map(c => {
    const loc = dict[c.id] || {};
    return {
      ...c,
      name: loc.name || c.name,
      region: loc.region || c.region,
      capital: loc.capital || c.capital,
      overview: loc.overview || c.overview,
      status: loc.status || c.status,
      office: loc.office || c.office,
      keySectors: loc.keySectors || c.keySectors
    };
  });
}

export function getLocalizedRegulations(lang = 'en') {
  const dict = getLangData(lang).regulations || {};
  return rawRegulations.map(r => {
    const loc = dict[r.id] || {};
    return {
      ...r,
      name: loc.name || r.name,
      jurisdiction: loc.jurisdiction || r.jurisdiction,
      status: loc.status || r.status,
      shortDesc: loc.shortDesc || r.shortDesc,
      penalties: loc.penalties || r.penalties
    };
  });
}

export function getLocalizedExperts(lang = 'en') {
  const dict = getLangData(lang).experts || {};
  return rawExperts.map(e => {
    const loc = dict[e.id] || {};
    return {
      ...e,
      name: loc.name || e.name,
      title: loc.title || e.title,
      role: loc.role || e.role,
      location: loc.location || e.location,
      bio: loc.bio || e.bio
    };
  });
}

export function getLocalizedCaseStudies(lang = 'en') {
  const dict = getLangData(lang).caseStudies || {};
  return rawCaseStudies.map(cs => {
    const loc = dict[cs.id] || {};
    return {
      ...cs,
      title: loc.title || cs.title,
      client: loc.client || cs.client,
      industryName: loc.industryName || cs.industryName,
      challenge: loc.challenge || cs.challenge,
      solution: loc.solution || cs.solution,
      outcome: loc.outcome || cs.outcome
    };
  });
}

export function getLocalizedInsights(lang = 'en') {
  const dict = getLangData(lang).insights || {};
  return rawInsights.map(ins => {
    const loc = dict[ins.id] || {};
    return {
      ...ins,
      title: loc.title || ins.title,
      category: loc.category || ins.category,
      authorName: loc.authorName || ins.authorName,
      readTime: loc.readTime || ins.readTime,
      excerpt: loc.excerpt || ins.excerpt
    };
  });
}

export function getLocalizedResources(lang = 'en') {
  const dict = getLangData(lang).resources || {};
  return rawResources.map(res => {
    const loc = dict[res.id] || {};
    return {
      ...res,
      title: loc.title || res.title,
      category: loc.category || res.category,
      format: loc.format || res.format,
      description: loc.description || res.description
    };
  });
}

export function getLocalizedCareers(lang = 'en') {
  const dict = getLangData(lang).careers || {};
  return rawCareers.map(car => {
    const loc = dict[car.id] || {};
    return {
      ...car,
      title: loc.title || car.title,
      department: loc.department || car.department,
      location: loc.location || car.location,
      type: loc.type || car.type,
      description: loc.description || car.description
    };
  });
}

export function getLocalizedPillars(lang = 'en') {
  const data = getLangData(lang);
  return data.corePillars || getLangData('en').corePillars || [];
}

export function getLocalizedBadges(lang = 'en') {
  const data = getLangData(lang);
  return data.badges || getLangData('en').badges || [];
}

export function getLocalizedRadar(lang = 'en') {
  const data = getLangData(lang);
  return data.radar || getLangData('en').radar || {};
}

export function getLocalizedMilestones(lang = 'en') {
  const data = getLangData(lang);
  return data.milestones || getLangData('en').milestones || [];
}

export function getLocalizedOffices(lang = 'en') {
  const data = getLangData(lang);
  return data.offices || getLangData('en').offices || [];
}

export function getLocalizedDetailCommon(lang = 'en') {
  const data = getLangData(lang);
  return data.detailCommon || getLangData('en').detailCommon || {};
}

export function getLocalizedModals(lang = 'en') {
  const data = getLangData(lang);
  return data.modals || getLangData('en').modals || {};
}
