import type { ReadingResult } from '@liuyao/core';
import { getHexagram, getTrigram } from '@liuyao/knowledge';

export const elementNames: Record<string, string> = {
  wood: 'Mộc',
  fire: 'Hỏa',
  earth: 'Thổ',
  metal: 'Kim',
  water: 'Thủy',
};
export const relativeNames: Record<string, string> = {
  sibling: 'Huynh đệ',
  child: 'Tử tôn',
  wealth: 'Thê tài',
  'official-ghost': 'Quan quỷ',
  parent: 'Phụ mẫu',
};
export const stemNames: Record<string, string> = {
  jia: 'Giáp',
  yi: 'Ất',
  bing: 'Bính',
  ding: 'Đinh',
  wu: 'Mậu',
  ji: 'Kỷ',
  geng: 'Canh',
  xin: 'Tân',
  ren: 'Nhâm',
  gui: 'Quý',
};
export const branchNames: Record<string, string> = {
  zi: 'Tý',
  chou: 'Sửu',
  yin: 'Dần',
  mao: 'Mão',
  chen: 'Thìn',
  si: 'Tỵ',
  wu: 'Ngọ',
  wei: 'Mùi',
  shen: 'Thân',
  you: 'Dậu',
  xu: 'Tuất',
  hai: 'Hợi',
};
export const stemName = (value: string) => stemNames[value] ?? 'Can không xác định';
export const branchName = (value: string) => branchNames[value] ?? 'Chi không xác định';
export const elementName = (value: string) => elementNames[value] ?? 'Ngũ hành không xác định';
export const relativeName = (value: string) => relativeNames[value] ?? 'Lục thân không xác định';
export function hexagramLabel(id: string) {
  const entity = getHexagram(id as Parameters<typeof getHexagram>[0]);
  return entity?.name ?? 'Quẻ không xác định';
}
export function trigramLabel(id: ReadingResult['lowerTrigramId']) {
  const entity = getTrigram(id);
  return entity?.name ?? 'Quái không xác định';
}
