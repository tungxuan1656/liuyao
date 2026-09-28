# Dữ liệu tri thức Lục Hào

Thư mục này chứa thuật ngữ, phần giải thích về quái và quẻ, quy tắc ngắn gọn, cùng thông tin thư mục. Các tệp dữ liệu tuân theo kiểu bản ghi trong `packages/knowledge/src/schema.ts`. Dữ liệu tự chứa và không nhập `@liuyao/core` khi chạy.

Mã định danh ổn định của tám quái và bảng đối chiếu nội quái/ngoại quái theo thứ tự Văn Vương trong gói này được lặp lại có chủ đích từ hợp đồng/bảng tương ứng trong `@liuyao/core`. Kiểm thử tri thức phân tích hai danh mục và bảng lõi rồi đối chiếu với bản ghi tri thức. Cách bảo vệ hợp đồng chỉ dùng trong kiểm thử này không tạo phụ thuộc lúc chạy từ dữ liệu tri thức tới gói tính toán.

## Current content

- `TRIGRAMS` và `HEXAGRAMS` cung cấp tên hiển thị và phần giải thích ngắn gọn cho 72 quái, quẻ. Phần giải thích quẻ nêu nội quái, ngoại quái và số thứ tự Văn Vương.
- `TERMS` giải thích các trường và phân loại được dùng bởi `ReadingResult` và `PrimaryLineResult`, gồm mười thiên can, mười hai địa chi, ngũ hành và năm loại Lục thân.
- `RULES` có mã `rule-*`, nhóm và phần giải thích cho từng quy ước của `liuyao-standard-v1`. Các quy tắc mô tả quy ước xác định, không đưa ra dự đoán.
- `SOURCES` cung cấp thông tin thư mục về Chu Dịch, Kinh Thị Dịch Truyện, Tăng San Bốc Dịch và đặc tả tính toán phiên bản 1 của dự án. Bản ghi Kinh Thị Dịch Truyện chỉ làm bối cảnh lịch sử, không được dùng làm bằng chứng cho quy tắc vận hành.
- `REFERENCES` liên kết các quy tắc kết quả với vị trí nguồn. Tham chiếu hợp đồng dự án ghi chính xác quy ước triển khai. Vị trí trong Tăng San Bốc Dịch dẫn các chương được dùng cho cung, Nạp Giáp, hào động và biến đổi, ngũ hành, Lục thân; không khẳng định một môn phái duy nhất quy định mọi cách làm Lục Hào về sau. Tham chiếu Chu Dịch liên kết `term-trigram` với phần Thuyết Quái bàn về tám quái và các thuộc tính của chúng.

Các bản ghi không sao chép văn bản nguồn hoặc bản dịch hiện đại. Phần giải thích là tóm lược ngắn gọn do dự án tự viết bằng tiếng Việt. Tác phẩm kinh điển thuộc phạm vi công cộng; trang của nhà cung cấp và ấn bản/bản dịch hiện đại có thể có quyền riêng. Bản ghi nguồn không cấp quyền chung đối với nội dung của nhà cung cấp.

## Licensing

Giấy phép `AGPL-3.0-only` trong bản kê gói áp dụng cho phần mềm được cấp phép AGPL, không áp dụng cho dữ liệu đã tuyển chọn trong thư mục này. Tri thức tuyển chọn và nội dung do dự án biên soạn được **All Rights Reserved**, trừ khi một tệp cụ thể ghi khác. Gói được đặt ở chế độ riêng tư vì chứa tài liệu có điều khoản cấp phép khác nhau và không thể phát hành như một gói AGPL đồng nhất. Xem [giấy phép dữ liệu](LICENSE) và [chính sách cấp phép toàn kho mã](../../../LICENSING.md) trước khi thêm hoặc tái sử dụng nội dung.
