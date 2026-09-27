import type { ReadingResult } from '@liuyao/core';
import { getHexagram, getTrigram } from '@liuyao/knowledge';

export const elementNames: Record<string, string> = {
  wood: 'Wood',
  fire: 'Fire',
  earth: 'Earth',
  metal: 'Metal',
  water: 'Water',
};
export const relativeNames: Record<string, string> = {
  sibling: 'Sibling',
  child: 'Child',
  wealth: 'Wealth',
  'official-ghost': 'Official Ghost',
  parent: 'Parent',
};
export const stemNames: Record<string, string> = {
  jia: 'Jia',
  yi: 'Yi',
  bing: 'Bing',
  ding: 'Ding',
  wu: 'Wu',
  ji: 'Ji',
  geng: 'Geng',
  xin: 'Xin',
  ren: 'Ren',
  gui: 'Gui',
};
export const branchNames: Record<string, string> = {
  zi: 'Zi',
  chou: 'Chou',
  yin: 'Yin',
  mao: 'Mao',
  chen: 'Chen',
  si: 'Si',
  wu: 'Wu',
  wei: 'Wei',
  shen: 'Shen',
  you: 'You',
  xu: 'Xu',
  hai: 'Hai',
};
export const stemName = (value: string) => stemNames[value] ?? value;
export const branchName = (value: string) => branchNames[value] ?? value;
export const elementName = (value: string) => elementNames[value] ?? value;
export const relativeName = (value: string) => relativeNames[value] ?? value;
export function hexagramLabel(id: string) {
  const entity = getHexagram(id as Parameters<typeof getHexagram>[0]);
  return entity ? `${entity.han} ${entity.name}` : id;
}
export function trigramLabel(id: ReadingResult['lowerTrigramId']) {
  const entity = getTrigram(id);
  return entity ? `${entity.han} ${entity.name}` : id;
}
