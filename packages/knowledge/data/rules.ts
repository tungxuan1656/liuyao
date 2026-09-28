import type { KnowledgeRule } from '../src/schema.js';

const RULESET = 'liuyao-standard-v1' as const;

export const RULES = [
  {
    id: 'rule-reading-result-fields',
    ruleset: RULESET,
    title: 'Các trường của kết quả gieo quẻ',
    explanation:
      'Kết quả gồm mã quy ước tính, mã quẻ chính và quẻ biến, mã nội quái và ngoại quái, cung và ngũ hành của cung, cùng vị trí hào Thế và hào Ứng. Đây là các giá trị phân loại được tính ra, không phải lời dự đoán.',
    category: 'metadata',
  },
  {
    id: 'rule-line-position-order',
    ruleset: RULESET,
    title: 'Thứ tự các hào',
    explanation:
      'Sáu hào được xếp từ dưới lên; vị trí của chúng lần lượt là một đến sáu theo thứ tự đó.',
    category: 'structure',
  },
  {
    id: 'rule-line-polarity-values',
    ruleset: RULESET,
    title: 'Giá trị hào và tính âm dương',
    explanation:
      'Giá trị đầu vào 6 và 8 là âm; giá trị 7 và 9 là dương. Kết quả vẫn ghi lại giá trị đầu vào của hào trong quẻ chính.',
    category: 'classification',
  },
  {
    id: 'rule-moving-line-change',
    ruleset: RULESET,
    title: 'Hào động và sự biến đổi',
    explanation:
      'Giá trị 6 và 9 đánh dấu hào động. Tính âm dương của các hào này đổi để tạo quẻ biến; hào tĩnh giữ nguyên tính âm dương. Nếu không có hào động thì không có mã quẻ biến.',
    category: 'transformation',
  },
  {
    id: 'rule-trigram-composition',
    ruleset: RULESET,
    title: 'Cấu tạo quẻ từ hai quái',
    explanation:
      'Hào một đến hào ba tạo thành nội quái; hào bốn đến hào sáu tạo thành ngoại quái. Cặp quái này xác định quẻ chính.',
    category: 'structure',
  },
  {
    id: 'rule-palace-and-markers',
    ruleset: RULESET,
    title: 'Cung và dấu hào',
    explanation:
      'Theo quy ước tính này, quẻ chính được xếp vào một cung. Cách phân cung xác định một vị trí hào Thế và một vị trí hào Ứng; các vị trí được ghi bằng số đếm từ dưới lên.',
    category: 'classification',
  },
  {
    id: 'rule-na-jia-assignment',
    ruleset: RULESET,
    title: 'Gán thiên can và địa chi theo Nạp Giáp',
    explanation:
      'Mỗi hào của quẻ chính được gán thiên can và địa chi theo quái chứa hào đó và vị trí của hào. Ba hào đầu dùng nội quái; ba hào cuối dùng ngoại quái.',
    category: 'classification',
  },
  {
    id: 'rule-branch-element',
    ruleset: RULESET,
    title: 'Ngũ hành gắn với địa chi',
    explanation:
      'Ngũ hành của hào lấy theo địa chi đã gán: Tý và Hợi thuộc Thủy; Sửu, Thìn, Mùi và Tuất thuộc Thổ; Dần và Mão thuộc Mộc; Tỵ và Ngọ thuộc Hỏa; Thân và Dậu thuộc Kim.',
    category: 'classification',
  },
  {
    id: 'rule-five-element-cycles',
    ruleset: RULESET,
    title: 'Quan hệ tương sinh và tương khắc của ngũ hành',
    explanation:
      'Chiều tương sinh là Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, rồi Thủy sinh Mộc. Chiều tương khắc là Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, rồi Kim khắc Mộc.',
    category: 'classification',
  },
  {
    id: 'rule-six-relative-classification',
    ruleset: RULESET,
    title: 'Phân loại Lục thân',
    explanation:
      'So với ngũ hành của cung: cùng hành là Huynh đệ; cung sinh hào là Tử tôn; cung khắc hào là Thê tài; hào khắc cung là Quan quỷ; hào sinh cung là Phụ mẫu. Bộ phân loại gồm năm loại.',
    category: 'classification',
  },
] as const satisfies readonly KnowledgeRule[];
