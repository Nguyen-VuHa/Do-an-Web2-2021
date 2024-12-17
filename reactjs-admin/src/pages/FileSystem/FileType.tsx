import React, { ReactNode } from 'react';
import ExcelIcon from 'src/images/icon/excel.png';
import PowerPointIcon from 'src/images/icon/powerpoint.png';
import WordIcon from 'src/images/icon/word.png';
import JSONIcon from 'src/images/icon/json.png';
import HTMLIcon from 'src/images/icon/html.png';
import JavascriptIcon from 'src/images/icon/javascript.png';
import CSSIcon from 'src/images/icon/css.png';
import AudioIcon from 'src/images/icon/audio.png';
import MP4Icon from 'src/images/icon/mp4.png';
import PDFIcon from 'src/images/icon/pdf.png';
import OtherFileIcon from 'src/images/icon/other-file.png';
import { getFileType } from '~/utils/detect';

type FileTypeProps = {
  mimeType: string;
  children: ReactNode;
  size?: number;
};

const FileType: React.FC<FileTypeProps> = ({ mimeType, children, size }) => {
  const fileType = getFileType(mimeType);

  switch (fileType) {
    case 'image':
      return children;
    case 'excel':
      return (
        <img
          src={ExcelIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    case 'word':
      return (
        <img
          src={WordIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    case 'powerpoint':
      return (
        <img
          src={PowerPointIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    case 'json':
      return (
        <img
          src={JSONIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    case 'javascript':
      return (
        <img
          src={JavascriptIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    case 'html':
      return (
        <img
          src={HTMLIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    case 'css':
      return (
        <img
          src={CSSIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    case 'audio':
      return (
        <img
          src={AudioIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    case 'mp4':
      return (
        <img
          src={MP4Icon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    case 'pdf':
      return (
        <img
          src={PDFIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
    default:
      return (
        <img
          src={OtherFileIcon}
          className="bg-center bg-no-repeat bg-contain"
          alt="NO FILE"
          width={size}
          height={size}
          style={{ height: size }}
        />
      );
  }
};

export default FileType;
