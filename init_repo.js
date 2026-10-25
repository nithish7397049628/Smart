const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

const repoDir = path.resolve(__dirname);

async function initAndCommit() {
  console.log('Initializing Git repository at:', repoDir);
  await git.init({ fs, dir: repoDir, defaultBranch: 'main' });
  console.log('✓ Git repository initialized with branch "main".');

  // Read all files ignoring node_modules, .env, and .git
  const ignoreList = ['node_modules', '.git', '.env'];

  function getAllFiles(dir, baseDir = '') {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (ignoreList.includes(file)) continue;
      const fullPath = path.join(dir, file);
      const relPath = path.join(baseDir, file).replace(/\\/g, '/');
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(getAllFiles(fullPath, relPath));
      } else {
        results.push(relPath);
      }
    }
    return results;
  }

  const files = getAllFiles(repoDir);
  console.log(`Adding ${files.length} project files to staging...`);

  for (const f of files) {
    await git.add({ fs, dir: repoDir, filepath: f });
  }
  console.log('✓ All files staged.');

  const sha = await git.commit({
    fs,
    dir: repoDir,
    author: {
      name: 'Smart City 360 Team',
      email: 'team@smartcity360.gov.in'
    },
    message: 'Initial commit: Complete Smart City 360 civic reporting web application'
  });

  console.log('✓ Initial commit created successfully!');
  console.log('  Commit SHA:', sha);
}

initAndCommit().catch(err => {
  console.error('Git error:', err);
});
