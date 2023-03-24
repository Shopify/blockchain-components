/**
 * This script ensures that the packages are built prior to
 * an example framework running.
 *
 * This works well since we're utilizing turbo which does a great job of
 * caching and bundling the packages quickly.
 */

import chalk from 'chalk';
import {execa} from 'execa';
import inquirer from 'inquirer';
import ora from 'ora';

const SPINNER = ora({
  color: 'green',
  text: chalk.green('👷 Building packages...'),
});

const OPTION_DATA = {
  'Create React App': 'example:cra',
  'Custom theme': 'example:custom-theme',
  'Next.js': 'example:nextjs',
  Remix: 'example:remix',
  Vite: 'example:vite',
};

const buildPackagesCommand = chalk.bold('yarn build:packages');
const repositoryChalk = chalk.bold(
  chalk.green('Shopify/blockchain-components'),
);

const errorText = `
  ${chalk.bold(
    'This is unusual and should not have happened. Here are some recommended next steps:',
  )}
  1. Try running ${buildPackagesCommand} in the repository root directory.
  2. Open an issue in the ${repositoryChalk} repository on Github.
`;

inquirer
  .prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Which example do you want to run?',
      choices: ['Create React App', 'Custom theme', 'Next.js', 'Remix', 'Vite'],
    },
  ])
  .then(async ({framework}) => {
    const script = OPTION_DATA[framework];

    try {
      SPINNER.start();

      await execa('yarn', ['build:packages'])
        .then(() => {
          SPINNER.succeed('Packages built successfully!');
        })
        .catch(() => {
          SPINNER.fail(chalk.red('Failed to build packages! 😥'));
          console.log(errorText);
        });

      // Start the example script
      execa('yarn', [script], {
        stdout: 'inherit',
        stderr: 'inherit',
        shell: true,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.log(error);
  });
