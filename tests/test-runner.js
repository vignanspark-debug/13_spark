import { execSync } from 'child_process';
import path from 'path';

console.log('====================================================');
console.log('HACKVERSE 2026 — CAMPUS PULSE TEST SUITE RUNNER');
console.log('====================================================');

try {
  const output = execSync('node test.js', { cwd: path.resolve('backend'), encoding: 'utf-8' });
  console.log(output);
  console.log('✅ ALL TEST SUITES PASSED SUCCESSFULLY!');
  process.exit(0);
} catch (err) {
  console.error('❌ TEST FAILURE:', err.stdout || err.message);
  process.exit(1);
}
