#!/usr/bin/env node

import { execSync } from 'child_process'
import inquirer from 'inquirer'

const registries = {
  npm: 'https://registry.npmjs.org',
  npmmirror: 'https://registry.npmmirror.com',
  iflytek: 'https://depend.iflytek.com:443/artifactory/api/npm/npm-repo'
};

async function switchRegistry() {
  const choices = Object.keys(registries).map(name => ({
    name: `${name} (${registries[name]})`,
    value: name
  }));

  const prompt = inquirer.createPromptModule()

  const { registry } = await prompt([
    {
      type: 'list',
      name: 'registry',
      message: 'Select an NPM registry:',
      choices
    }
  ]);

  const url = registries[registry];
  execSync(`npm config set registry ${url}`, { stdio: 'inherit' });
  console.log(`Registry switched to: ${url}`);
}

switchRegistry();
