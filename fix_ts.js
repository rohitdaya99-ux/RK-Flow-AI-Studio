const fs = require('fs');
const glob = require('glob'); // Note: we can just use fs.readdirSync if glob is missing, but glob might be available. Let's use pure JS.
const path = require('path');

const dir = 'src/features/auto-reel';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Pipeline.ts') || f.endsWith('Service.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/job: AutoReelJob/g, '_job: AutoReelJob');
  content = content.replace(/import \{.*?\} from '\.\/models';/g, match => match); // keep it
  
  // Specific fixes
  content = content.replace(/import { CoverageGraph, ProductionReport }/, 'import { ProductionReport }');
  content = content.replace(/import { ProductionReport, CoverageGraph }/, 'import { ProductionReport }');
  content = content.replace(/import { ClipDescriptor, AutoReelJob }/, 'import { AutoReelJob }');
  content = content.replace(/const usedFaces = new Set<string>\(\);/, '// const usedFaces = new Set<string>();');
  content = content.replace(/import { ReviewSession, ApprovalState }/, 'import { ReviewSession }');
  
  fs.writeFileSync(filePath, content);
}
console.log('Fixed TS files.');
