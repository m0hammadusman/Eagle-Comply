import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredServices = [
  'financial-crime-compliance',
  'regulatory-compliance',
  'risk-governance',
  'legal-compliance',
  'compliance-training',
  'compliance-reviews'
];
const requiredRoutes = ['/services/', '/industries/', '/insights/', '/resources/', '/contact/', '/legal/'];

const complianceData = fs.readFileSync(path.join(root, 'src/data/complianceData.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'src/App.jsx'), 'utf8');

const missingServices = requiredServices.filter(id => !complianceData.includes(`"id": "${id}"`));
const missingRoutes = requiredRoutes.filter(route => !app.includes(route));
const translations = JSON.parse(fs.readFileSync(path.join(root, 'src/context/translations.json'), 'utf8'));
const requiredTranslationPaths = [
  ['brand', 'name'],
  ['brand', 'tagline'],
  ['brand', 'subphrase'],
  ['brand', 'disclaimer'],
  ['nav', 'home'],
  ['nav', 'services'],
  ['nav', 'insights'],
  ['nav', 'resources'],
  ['nav', 'bookConsultation'],
  ['pillars', 'tag'],
  ['pillars', 'title'],
  ['pillars', 'p1_title'],
  ['pillars', 'p1_desc'],
  ['pillars', 'p2_title'],
  ['pillars', 'p2_desc'],
  ['pillars', 'p3_title'],
  ['pillars', 'p3_desc'],
  ['pillars', 'p4_title'],
  ['pillars', 'p4_desc']
];
const missingTranslations = Object.entries(translations).flatMap(([lang, data]) =>
  requiredTranslationPaths
    .filter(([section, key]) => !data?.[section]?.[key])
    .map(([section, key]) => `${lang}.${section}.${key}`)
);

console.log('EagleComply project audit');
console.log('Required services:', requiredServices.length - missingServices.length, '/', requiredServices.length);
console.log('Route patterns:', requiredRoutes.length - missingRoutes.length, '/', requiredRoutes.length);
console.log('Core translation keys:', requiredTranslationPaths.length * Object.keys(translations).length - missingTranslations.length, '/', requiredTranslationPaths.length * Object.keys(translations).length);
if (missingServices.length) console.log('Missing services:', missingServices);
if (missingRoutes.length) console.log('Missing route patterns:', missingRoutes);
if (missingTranslations.length) console.log('Missing translation keys:', missingTranslations);
process.exit(missingServices.length || missingRoutes.length || missingTranslations.length ? 1 : 0);
