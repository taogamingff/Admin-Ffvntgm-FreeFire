# FFVN.TGM Admin Notification

Admin URL: https://admin-ffvntgm-freefire.vercel.app/
User URL: https://ffvntgm-event-freefire.vercel.app/

## 1. Database
Tạo project Supabase, mở SQL Editor và chạy `supabase.sql`.

## 2. Vercel Environment Variables
Trong Admin project → Settings → Environment Variables, thêm:

SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
ADMIN_PASSWORD=MAT_KHAU_ADMIN
ADMIN_SECRET=CHUOI_BI_MAT_DAI
USER_ORIGIN=https://ffvntgm-event-freefire.vercel.app

Các giá trị secret phải để ở server-side Environment Variables, không đưa vào HTML/JS. Sau khi đổi Environment Variables cần redeploy Vercel.

## 3. Deploy
Đưa thư mục `admin` lên project có domain admin-ffvntgm-freefire.vercel.app.

## 4. User
Trong project User, thêm `user-integration/notification.js` vào trang muốn hiển thị thông báo.
