import type { KnowledgeSource } from '../src/schema.js';

export const SOURCES = [
  {
    id: 'source-zhouyi',
    title: 'Chu Dịch (Kinh Dịch)',
    author:
      'Theo truyền thống gắn với Chu Văn Vương và Chu Công; bản văn lưu truyền có nhiều lớp tác giả.',
    publication:
      'Bản kinh điển lưu truyền; mục này không khẳng định niên đại biên soạn hoặc lịch sử xuất bản.',
    rights:
      'Tác phẩm cổ; bản văn kinh điển được dẫn thuộc phạm vi công cộng. Mục này chỉ diễn đạt lại thông tin thư mục bằng lời riêng, không sao chép bản dịch.',
    provenance:
      'Bản Chu Dịch lưu truyền gồm lời quẻ và lời hào; phần Thập Dực lưu truyền có thiên Thuyết Quái bàn về các quái và thuộc tính gắn với chúng. Nguồn tra cứu thư mục: Dự án Văn bản Trung Hoa, https://ctext.org/book-of-changes.',
  },
  {
    id: 'source-jingshi-yizhuan',
    title: 'Kinh Thị Dịch Truyện',
    author: 'Tương truyền do Kinh Phòng biên soạn.',
    publication:
      'Văn bản cổ được quy cho Kinh Phòng; mục này không khẳng định niên đại biên soạn hoặc lịch sử xuất bản.',
    rights:
      'Tác phẩm cổ; bản văn kinh điển được dẫn thuộc phạm vi công cộng. Mục này chỉ diễn đạt lại thông tin thư mục bằng lời riêng, không sao chép bản dịch.',
    provenance:
      'Tác phẩm gắn với học giả Kinh Phòng thời Hán và cách giải Dịch của ông. Nguồn tra cứu thư mục: Dự án Văn bản Trung Hoa, https://ctext.org/jingshi-yizhuan/zh. Chỉ ghi nhận làm bối cảnh lịch sử; mục này không khẳng định tác phẩm có đầy đủ các bảng Lục Hào được dùng về sau.',
  },
  {
    id: 'source-zengshan-buyi',
    title: 'Tăng San Bốc Dịch',
    author:
      'Dự án Văn bản Trung Hoa ghi tác giả là Dã Hạc Lão Nhân; quá trình truyền bản và biên tập về sau có liên hệ với Lý Văn Huy.',
    publication:
      'Văn bản truyền thống; mục này không khẳng định ấn bản, niên đại biên soạn hoặc lịch sử xuất bản.',
    rights:
      'Nguyên tác kinh điển thuộc phạm vi công cộng. Mục này chỉ diễn đạt lại thông tin thư mục bằng lời riêng, không sao chép nguyên văn hoặc bản dịch.',
    provenance:
      'Dự án Văn bản Trung Hoa ghi tác giả Dã Hạc Lão Nhân tại https://ctext.org/wiki.pl?if=en&res=497805; lời bạt quyển hai ghi phần bổ sung của Lý Văn Huy tại https://ctext.org/wiki.pl?chapter=157683&if=en. Văn bản được dẫn cũng có tại Wikisource: https://zh.wikisource.org/zh-hans/%E5%A2%9E%E5%88%AA%E5%8D%9C%E6%98%93. Các chương được dẫn thuộc chính văn; phần phụ lục do người đóng góp thêm không được xem là nội dung của sách.',
  },
  {
    id: 'source-liuyao-v1-contract',
    title: 'Đặc tả tính toán Lục Hào phiên bản 1',
    author: 'Nhóm duy trì dự án Lục Hào.',
    publication: 'Đặc tả trong mã nguồn và phần triển khai xác định của phiên bản 1.',
    rights: 'Mã nguồn dự án được cấp phép theo AGPL-3.0-only.',
    provenance:
      'Các hợp đồng và phép tính tại packages/liuyao-core/src/contracts.ts, calculation.ts và board.ts xác định các trường kết quả cùng quy ước phiên bản 1 mà kho mã này triển khai.',
  },
] as const satisfies readonly KnowledgeSource[];
