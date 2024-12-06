
interface ImportMetaEnv {
    VITE_API_URL: string; // Khai báo biến môi trường VITE_API_URL
    // Thêm các biến môi trường khác ở đây nếu cần
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  