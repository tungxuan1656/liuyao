# Vietnamese product language

This document owns the user-facing language and terminology rules for the Lục Hào web application and its local knowledge catalog.

## Approved language

- Use Vietnamese for all user-facing web copy and all knowledge names, aliases, explanations, source descriptions, and reference locations.
- Do not display Han characters or English/Chinese romanized names in the application or knowledge catalog.
- Write Vietnamese with full diacritics. Search can normalize case, punctuation, and Vietnamese diacritics without changing displayed text.
- Keep stable IDs, package names, route paths, ruleset codes, source URLs, and numeric/domain values unchanged. Treat these as technical identifiers, not prose.
- Translate labels for technical identifiers into Vietnamese. Do not translate or rename the identifiers themselves.
- Keep bibliographic descriptions in Vietnamese. Use Vietnamese or Latin-script titles and names; retain source URLs as links.
- Keep implementation errors and developer diagnostics in English only when they are not shown to users. Map user-visible errors to clear Vietnamese messages in the web layer.

## Terminology control

Use the following canonical display names for trigrams and hexagrams. They follow the Vietnamese names in the listed reference; the table is a name glossary, not an endorsement of interpretations on that page.

### Bát quái

| Stable ID          | Vietnamese name | Association |
| ------------------ | --------------- | ----------- |
| `trigram-heaven`   | Càn             | Trời        |
| `trigram-lake`     | Đoài            | Đầm         |
| `trigram-fire`     | Ly              | Lửa         |
| `trigram-thunder`  | Chấn            | Sấm         |
| `trigram-wind`     | Tốn             | Gió         |
| `trigram-water`    | Khảm            | Nước        |
| `trigram-mountain` | Cấn             | Núi         |
| `trigram-earth`    | Khôn            | Đất         |

### 64 quẻ theo thứ tự Văn Vương

| ID            | Tên chuẩn            | ID            | Tên chuẩn           | ID            | Tên chuẩn           | ID            | Tên chuẩn             |
| ------------- | -------------------- | ------------- | ------------------- | ------------- | ------------------- | ------------- | --------------------- |
| `hexagram-01` | Thuần Càn            | `hexagram-17` | Trạch Lôi Tùy       | `hexagram-33` | Thiên Sơn Độn       | `hexagram-49` | Trạch Hỏa Cách        |
| `hexagram-02` | Thuần Khôn           | `hexagram-18` | Sơn Phong Cổ        | `hexagram-34` | Lôi Thiên Đại Tráng | `hexagram-50` | Hỏa Phong Đỉnh        |
| `hexagram-03` | Thủy Lôi Truân       | `hexagram-19` | Địa Trạch Lâm       | `hexagram-35` | Hỏa Địa Tấn         | `hexagram-51` | Thuần Chấn            |
| `hexagram-04` | Sơn Thủy Mông        | `hexagram-20` | Phong Địa Quan      | `hexagram-36` | Địa Hỏa Minh Di     | `hexagram-52` | Thuần Cấn             |
| `hexagram-05` | Thủy Thiên Nhu       | `hexagram-21` | Hỏa Lôi Phệ Hạp     | `hexagram-37` | Phong Hỏa Gia Nhân  | `hexagram-53` | Phong Sơn Tiệm        |
| `hexagram-06` | Thiên Thủy Tụng      | `hexagram-22` | Sơn Hỏa Bí          | `hexagram-38` | Hỏa Trạch Khuê      | `hexagram-54` | Lôi Trạch Quy Muội    |
| `hexagram-07` | Địa Thủy Sư          | `hexagram-23` | Sơn Địa Bác         | `hexagram-39` | Thủy Sơn Kiển       | `hexagram-55` | Lôi Hỏa Phong         |
| `hexagram-08` | Thủy Địa Tỷ          | `hexagram-24` | Địa Lôi Phục        | `hexagram-40` | Lôi Thủy Giải       | `hexagram-56` | Hỏa Sơn Lữ            |
| `hexagram-09` | Phong Thiên Tiểu Súc | `hexagram-25` | Thiên Lôi Vô Vọng   | `hexagram-41` | Sơn Trạch Tổn       | `hexagram-57` | Thuần Tốn             |
| `hexagram-10` | Thiên Trạch Lý       | `hexagram-26` | Thiên Sơn Đại Súc   | `hexagram-42` | Phong Lôi Ích       | `hexagram-58` | Thuần Đoài            |
| `hexagram-11` | Địa Thiên Thái       | `hexagram-27` | Sơn Lôi Di          | `hexagram-43` | Trạch Thiên Quải    | `hexagram-59` | Phong Thủy Hoán       |
| `hexagram-12` | Thiên Địa Bĩ         | `hexagram-28` | Trạch Phong Đại Quá | `hexagram-44` | Thiên Phong Cấu     | `hexagram-60` | Thủy Trạch Tiết       |
| `hexagram-13` | Thiên Hỏa Đồng Nhân  | `hexagram-29` | Thuần Khảm          | `hexagram-45` | Trạch Địa Tụy       | `hexagram-61` | Phong Trạch Trung Phu |
| `hexagram-14` | Hỏa Thiên Đại Hữu    | `hexagram-30` | Thuần Ly            | `hexagram-46` | Địa Phong Thăng     | `hexagram-62` | Lôi Sơn Tiểu Quá      |
| `hexagram-15` | Địa Sơn Khiêm        | `hexagram-31` | Trạch Sơn Hàm       | `hexagram-47` | Trạch Thủy Khốn     | `hexagram-63` | Thủy Hỏa Ký Tế        |
| `hexagram-16` | Lôi Địa Dự           | `hexagram-32` | Lôi Phong Hằng      | `hexagram-48` | Thủy Phong Tỉnh     | `hexagram-64` | Hỏa Thủy Vị Tế        |

### Thuật ngữ Lục Hào

| Concept                  | Tên chuẩn               | Ghi chú                                                                                                                              |
| ------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Ruleset                  | Quy ước tính            | Mã quy ước vẫn giữ nguyên; không trình bày mã như tên tiếng Việt.                                                                    |
| Primary hexagram         | Quẻ chính               | Quẻ tạo từ sáu giá trị hào ban đầu.                                                                                                  |
| Changed hexagram         | Quẻ biến                | Chỉ có khi có ít nhất một hào động.                                                                                                  |
| Trigram                  | Quái                    | Tên riêng dùng Càn, Đoài, Ly, Chấn, Tốn, Khảm, Cấn, Khôn.                                                                            |
| Lower / upper trigram    | Nội quái / Ngoại quái   | Ba hào dưới / ba hào trên.                                                                                                           |
| Line / line position     | Hào / vị trí hào        | Đánh số từ dưới lên, từ một đến sáu.                                                                                                 |
| Yin / yang               | Âm / Dương              | Thuộc tính của hào.                                                                                                                  |
| Moving line              | Hào động                | Hào có giá trị 6 hoặc 9; đổi âm dương ở quẻ biến.                                                                                    |
| Palace                   | Cung                    | Nhóm phân loại quẻ chính theo quy ước hiện hành.                                                                                     |
| Palace element           | Ngũ hành của cung       | Hành gắn với cung của quẻ chính.                                                                                                     |
| Shi / Ying line          | Hào Thế / hào Ứng       | Tên thuật ngữ chuyên môn được giữ theo cách dùng tiếng Việt.                                                                         |
| Na Jia                   | Nạp Giáp                | Phép gán thiên can, địa chi cho các hào qua nội quái và ngoại quái.                                                                  |
| Heavenly / earthly cycle | Thiên can / địa chi     | Dùng tên Hán-Việt: Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý; Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi. |
| Five Elements            | Ngũ hành                | Kim, Mộc, Thủy, Hỏa, Thổ.                                                                                                            |
| Six Relatives            | Lục thân                | Năm loại quan hệ trong bộ dữ liệu: Huynh đệ, Tử tôn, Thê tài, Quan quỷ, Phụ mẫu.                                                     |
| Generation / control     | Tương sinh / tương khắc | Giữ đúng chiều quan hệ được nêu trong mô tả quy tắc.                                                                                 |

Use the glossary in the knowledge catalog, result labels, filters, and help text. Do not invent or silently vary a domain translation; record accepted terms here before applying them broadly.

Knowledge content must remain original, rights-safe, and explicit about the implemented ruleset. Vietnamese copy must not add predictions or change deterministic results.

### Name reference

- Wikipedia contributors, [“Ký tự kinh dịch”](https://vi.wikipedia.org/wiki/K%C3%BD_t%E1%BB%B1_kinh_d%E1%BB%8Bch), accessed 2026-09-28. Used only to cross-check the conventional Vietnamese names and King Wen ordering; no explanatory prose is copied.
- Lục thân and core Liu Yao terminology were cross-checked against Vietnamese-language usage in [“Thuật ngữ chuyên dụng trong Lục Hào”](https://vuphac.com/thuat-ngu-chuyen-dung-trong-luc-hao-giai-thich-chi-tiet/) and [“Thiên Nhẫn Phong Thủy Sự”](https://vietnamthuquan.eu/TacPham/thien-nhan-phong-thuy-su-34036/chuong-239). Definitions in this product remain original and limited to implemented deterministic facts.

## Runtime boundary

V1 has one language: Vietnamese. Do not add a language selector, translation framework, remote translation service, or parallel locale catalog. Keep UI copy with its owning component and structured domain terminology in `@liuyao/knowledge`.

## Verification

- Set the document language metadata to Vietnamese.
- Review visible text, accessible names, status/error messages, browser metadata, and knowledge records.
- Test that user-facing knowledge text contains no Han characters and that Vietnamese search remains local and diacritic-tolerant.
- Verify reading calculations and stable IDs remain unchanged.

See `knowledge-browser.md` for knowledge search behavior and `product-identity.md` for release identity ownership.
