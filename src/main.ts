import { sleep } from './sleep';
import './style.scss';

console.log('started app');

mdr();


async function mdr() {
  const textArea = document.querySelector<HTMLTextAreaElement>('#myTextArea')!;
  await sleep(1000);
  textArea.value = 'Hello jeune padawan, \r\n';
  await sleep(1500);
  textArea.value += 'Bienvenue dans ma matrice.\r\n'

  while(true) {
    await sleep(1000);
    textArea.value += '.'
  }
}