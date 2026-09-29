/** Order matches core weights: Earth 8, Water 4, Fire 2, Wind 1. */
export const coinIdentities = [
  {
    name: 'Đất',
    label: 'Địa',
    light: '#ffe097',
    color: '#d6a237',
    dark: '#815016',
    ink: '#49300d',
    path: 'M3 20 10 6l5 9 3-5 4 10ZM8 20l4-7',
  },
  {
    name: 'Nước',
    label: 'Thủy',
    light: '#8bdaee',
    color: '#2879b6',
    dark: '#123f73',
    ink: '#f2fcff',
    path: 'M12 2C10 6 4 11 4 15a8 8 0 0 0 16 0c0-4-6-9-8-13ZM8 15c0 3 2 4 4 4',
  },
  {
    name: 'Lửa',
    label: 'Hỏa',
    light: '#ff9c72',
    color: '#c44732',
    dark: '#79261c',
    ink: '#fff6df',
    path: 'M13 2c2 7-5 7-3 12 2-1 4-3 5-6 6 6 7 13-3 14C2 22 2 14 6 9c-1 5 3 5 3 2 0-4 1-7 4-9Z',
  },
  {
    name: 'Gió',
    label: 'Phong',
    light: '#ffffff',
    color: '#d7dfe3',
    dark: '#7b8c98',
    ink: '#344c5e',
    path: 'M2 8h13c6 0 6-7 1-6M2 12h17c5 0 5 7 0 7M2 16h8c5 0 5 6 1 6',
  },
] as const;
