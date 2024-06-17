#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

const templateDir = path.resolve(__dirname, 'template');
const projectDir = path.resolve(process.cwd(), process.argv[2] || 'my-next-app');

if (fs.existsSync(projectDir)) {
  console.error(`Directory ${projectDir} already exists. Please choose another project name.`);
  process.exit(1);
}

console.log(`Creating a new Custom Next.js project at ${projectDir}`);

ncp(templateDir, projectDir, (err) => {
  if (err) {
    console.error('Failed to copy template files:', err);
    process.exit(1);
  }

  try {
    process.chdir(projectDir);
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installed successfully.');
  } catch (error) {
    console.error('Failed to install dependencies:', error);
    process.exit(1);
  }
});
