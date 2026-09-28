import type { KnowledgeTerm } from '../src/schema.js';

export const TERMS = [
  {
    id: 'term-ruleset',
    name: 'Quy ước tính',
    aliases: [],
    definition: 'Bộ quy ước được dùng để tạo ra một kết quả gieo quẻ có thể tái lập.',
  },
  {
    id: 'term-primary-hexagram',
    name: 'Quẻ chính',
    aliases: [],
    definition: 'Quẻ gồm sáu hào được xác định trực tiếp từ các giá trị đầu vào.',
    applicableRuleIds: ['rule-trigram-composition'],
  },
  {
    id: 'term-changed-hexagram',
    name: 'Quẻ biến',
    aliases: [],
    definition:
      'Quẻ tạo ra khi đổi tính âm dương của từng hào động; không có quẻ biến nếu không có hào động.',
    applicableRuleIds: ['rule-moving-line-change', 'rule-trigram-composition'],
  },
  {
    id: 'term-trigram',
    name: 'Quái',
    aliases: [],
    definition: 'Hình gồm ba hào; nội quái và ngoại quái kết hợp thành một quẻ sáu hào.',
    applicableRuleIds: ['rule-trigram-composition'],
  },
  {
    id: 'term-lower-trigram',
    name: 'Nội quái',
    aliases: ['Quái dưới'],
    definition: 'Ba hào dưới của quẻ, đọc từ dưới lên.',
    applicableRuleIds: ['rule-trigram-composition'],
  },
  {
    id: 'term-upper-trigram',
    name: 'Ngoại quái',
    aliases: ['Quái trên'],
    definition: 'Ba hào trên của quẻ, đọc từ dưới lên.',
    applicableRuleIds: ['rule-trigram-composition'],
  },
  {
    id: 'term-line-position',
    name: 'Vị trí hào',
    aliases: [],
    definition: 'Thứ tự của hào, đánh số từ một đến sáu theo chiều từ dưới lên.',
    applicableRuleIds: ['rule-line-position-order'],
  },
  {
    id: 'term-line-value',
    name: 'Giá trị hào',
    aliases: [],
    definition:
      'Giá trị đầu vào 6, 7, 8 hoặc 9, biểu thị tính âm dương và trạng thái động của hào.',
    applicableRuleIds: ['rule-line-polarity-values', 'rule-moving-line-change'],
  },
  {
    id: 'term-polarity',
    name: 'Tính âm dương',
    aliases: [],
    definition: 'Phân loại âm hoặc dương của một hào trong quẻ chính.',
    applicableRuleIds: ['rule-line-polarity-values'],
  },
  {
    id: 'term-yin',
    name: 'Âm',
    aliases: ['Hào âm'],
    definition: 'Tính của hào đứt; theo quy ước này, giá trị 6 và 8 là âm.',
    applicableRuleIds: ['rule-line-polarity-values'],
  },
  {
    id: 'term-yang',
    name: 'Dương',
    aliases: ['Hào dương'],
    definition: 'Tính của hào liền; theo quy ước này, giá trị 7 và 9 là dương.',
    applicableRuleIds: ['rule-line-polarity-values'],
  },
  {
    id: 'term-moving-line',
    name: 'Hào động',
    aliases: [],
    definition: 'Hào có giá trị đầu vào 6 hoặc 9; tính âm dương của hào đổi trong quẻ biến.',
    applicableRuleIds: ['rule-moving-line-change'],
  },
  {
    id: 'term-palace',
    name: 'Cung',
    aliases: ['Bát cung'],
    definition: 'Một trong tám nhóm gắn với quái, dùng để phân loại quẻ chính theo quy ước này.',
    applicableRuleIds: ['rule-palace-and-markers'],
  },
  {
    id: 'term-palace-element',
    name: 'Ngũ hành của cung',
    aliases: ['Hành của cung'],
    definition: 'Ngũ hành được gán cho cung của quẻ chính.',
    applicableRuleIds: ['rule-palace-and-markers'],
  },
  {
    id: 'term-shi-line',
    name: 'Hào Thế',
    aliases: ['Thế'],
    definition: 'Hào được đánh dấu là vị trí Thế trong cách phân cung đang dùng.',
    applicableRuleIds: ['rule-palace-and-markers'],
  },
  {
    id: 'term-ying-line',
    name: 'Hào Ứng',
    aliases: ['Ứng'],
    definition: 'Hào được đánh dấu là vị trí Ứng tương ứng trong cách phân cung đang dùng.',
    applicableRuleIds: ['rule-palace-and-markers'],
  },
  {
    id: 'term-na-jia',
    name: 'Nạp Giáp',
    aliases: [],
    definition: 'Phép gán thiên can và địa chi cho các hào thông qua nội quái và ngoại quái.',
    applicableRuleIds: ['rule-na-jia-assignment'],
  },
  {
    id: 'term-heavenly-stem',
    name: 'Thiên can',
    aliases: [],
    definition: 'Một trong mười can; trong Nạp Giáp, thiên can được gán cho hào theo quái.',
    applicableRuleIds: ['rule-na-jia-assignment'],
  },
  {
    id: 'term-earthly-branch',
    name: 'Địa chi',
    aliases: [],
    definition: 'Một trong mười hai chi; trong Nạp Giáp, địa chi được gán cho hào theo quái.',
    applicableRuleIds: ['rule-na-jia-assignment', 'rule-branch-element'],
  },
  {
    id: 'term-five-elements',
    name: 'Ngũ hành',
    aliases: [],
    definition:
      'Năm hành Kim, Mộc, Thủy, Hỏa, Thổ dùng cho các quan hệ và phân loại trong quy ước này.',
    applicableRuleIds: ['rule-branch-element', 'rule-five-element-cycles'],
  },
  {
    id: 'term-six-relative',
    name: 'Lục thân',
    aliases: [],
    definition:
      'Năm loại quan hệ được dùng trong dữ liệu này; tên gọi Lục thân không có nghĩa bộ phân loại gồm sáu loại.',
    applicableRuleIds: ['rule-six-relative-classification'],
  },
  {
    id: 'term-relative-sibling',
    name: 'Huynh đệ',
    aliases: [],
    definition: 'Loại Lục thân được gán khi ngũ hành của hào cùng hành với ngũ hành của cung.',
    applicableRuleIds: ['rule-six-relative-classification'],
  },
  {
    id: 'term-relative-child',
    name: 'Tử tôn',
    aliases: [],
    definition: 'Loại Lục thân được gán khi ngũ hành của cung sinh ngũ hành của hào.',
    applicableRuleIds: ['rule-six-relative-classification'],
  },
  {
    id: 'term-relative-wealth',
    name: 'Thê tài',
    aliases: [],
    definition: 'Loại Lục thân được gán khi ngũ hành của cung khắc ngũ hành của hào.',
    applicableRuleIds: ['rule-six-relative-classification'],
  },
  {
    id: 'term-relative-official-ghost',
    name: 'Quan quỷ',
    aliases: [],
    definition: 'Loại Lục thân được gán khi ngũ hành của hào khắc ngũ hành của cung.',
    applicableRuleIds: ['rule-six-relative-classification'],
  },
  {
    id: 'term-relative-parent',
    name: 'Phụ mẫu',
    aliases: [],
    definition: 'Loại Lục thân được gán khi ngũ hành của hào sinh ngũ hành của cung.',
    applicableRuleIds: ['rule-six-relative-classification'],
  },
  {
    id: 'term-element-generation',
    name: 'Vòng tương sinh',
    aliases: ['Ngũ hành tương sinh'],
    definition:
      'Theo chiều sinh: Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc.',
    applicableRuleIds: ['rule-five-element-cycles'],
  },
  {
    id: 'term-element-control',
    name: 'Vòng tương khắc',
    aliases: ['Ngũ hành tương khắc'],
    definition:
      'Theo chiều khắc: Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc.',
    applicableRuleIds: ['rule-five-element-cycles'],
  },
  ...(
    [
      ['metal', 'Kim'],
      ['wood', 'Mộc'],
      ['water', 'Thủy'],
      ['fire', 'Hỏa'],
      ['earth', 'Thổ'],
    ] as const
  ).map(
    ([id, name]) =>
      ({
        id: `term-element-${id}`,
        name,
        aliases: [],
        definition: `${name} là một trong năm hành dùng làm thuộc tính phân loại theo quy ước này.`,
      }) as const,
  ),
  ...(
    [
      ['jia', 'Giáp'],
      ['yi', 'Ất'],
      ['bing', 'Bính'],
      ['ding', 'Đinh'],
      ['wu', 'Mậu'],
      ['ji', 'Kỷ'],
      ['geng', 'Canh'],
      ['xin', 'Tân'],
      ['ren', 'Nhâm'],
      ['gui', 'Quý'],
    ] as const
  ).map(
    ([id, name]) =>
      ({
        id: `term-stem-${id}`,
        name,
        aliases: [],
        definition: `${name} là một trong mười thiên can.`,
      }) as const,
  ),
  ...(
    [
      ['zi', 'Tý'],
      ['chou', 'Sửu'],
      ['yin', 'Dần'],
      ['mao', 'Mão'],
      ['chen', 'Thìn'],
      ['si', 'Tỵ'],
      ['wu', 'Ngọ'],
      ['wei', 'Mùi'],
      ['shen', 'Thân'],
      ['you', 'Dậu'],
      ['xu', 'Tuất'],
      ['hai', 'Hợi'],
    ] as const
  ).map(
    ([id, name]) =>
      ({
        id: `term-branch-${id}`,
        name,
        aliases: [],
        definition: `${name} là một trong mười hai địa chi.`,
      }) as const,
  ),
] as const satisfies readonly KnowledgeTerm[];
