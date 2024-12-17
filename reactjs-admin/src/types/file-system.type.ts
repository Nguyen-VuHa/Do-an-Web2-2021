export interface IFileSystem {
  file_system_id: string;
  name: string;
  type: string;
  size: number | null;
  mime_type: string | null;
  path: string | null;
  updated_at: string;
}
