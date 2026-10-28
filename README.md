# Giải bóng đá ADNX & EFUN open cup 2026

Landing page HTML, CSS và JavaScript thuần. Mở `index.html` bằng trình duyệt để xem, không cần cài đặt hay build.

## Nội dung

- Banner giải đấu.
- Thể lệ dự kiến.
- 6 đội chia thành bảng A và bảng B.
- 8 trận đấu với bộ lọc: tất cả, bảng A, bảng B, vòng cuối.
- Đơn vị tổ chức và khu vực nhà tài trợ.

## Cập nhật

- `index.html`: nội dung, thể lệ, đơn vị tổ chức và tài trợ.
- `teams.js`: tên và danh sách 69 cầu thủ của 6 đội, dùng chung cho thẻ đội, modal và tên đội trong lịch đấu. Mỗi cầu thủ gồm tên, vị trí và phân loại.
- `Danh_sach_cac_doi_ADNX_EFUN_2026.xlsx`: bản xuất từ ảnh, có bộ lọc theo đội, vị trí và phân loại. File Excel là bản xuất tĩnh, không tự đồng bộ khi sửa `teams.js`.
- `script.js`: danh sách cặp đấu trong `matches`; phần ngày, giờ và sân nằm trong `renderMatches`.
- `styles.css`: màu sắc, bố cục và giao diện điện thoại.
- `assets/stadium.jpg`: ảnh banner, tải từ Unsplash (photo-1522778119026-d647f0596c20).

Danh sách đội được nhập từ ảnh `20261028-080438.png`: Team 1 có 10 cầu thủ; Team 2–5 mỗi đội 11; SABO có 15. Phân bảng tạm thời: Team 1–3 ở bảng A, Team 4–5 và SABO ở bảng B. Ngày giờ, địa điểm, nhà tài trợ và điều lệ chuyên môn chờ xác nhận. Logo ADNX (`assets/logo_17304.png`) và EFUN (`assets/114_11544.png`) do người dùng cung cấp, được dùng ở đầu trang, chân trang và phần đơn vị tổ chức. Phông chữ được tải từ Google Fonts; trang có phông dự phòng khi không có mạng.

## Kiểm tra

Đã kiểm tra bằng Playwright với Microsoft Edge: bộ lọc trả đúng 8/3/3/2 trận, menu di động đóng/mở đúng, không có lỗi JavaScript và không tràn ngang tại chiều rộng 1440, 390 và 320 px.

Đã đối chiếu 69 bản ghi Excel với dữ liệu trên trang; kiểm tra đủ 6 modal, đóng bằng nút/Esc/bấm ngoài, trả focus về nút mở và cuộn danh sách trên điện thoại.

`desktop-preview.png` và `mobile-preview.png` là ảnh xem trước của phiên bản ban đầu, trước khi thêm danh sách cầu thủ.
