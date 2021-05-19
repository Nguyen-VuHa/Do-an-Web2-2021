const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

exports.send = asyncHandler(async function (to, subject, link, fullname, email) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'cgv.cinema.vn@gmail.com' ,
      pass: 'Vuha20111999'
    }
  });

  const info = await transporter.sendMail({
    from: 'cgv.cinema.vn@gmail.com',
    to,
    subject,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="x-apple-disable-message-reformatting" />
        <title>Votre compte Steam : accès depuis un nouvel ordinateur</title>
    
        <style type="text/css" media="screen">
            @font-face {
                font-family: 'Motiva Sans';
                font-style: normal;
                font-weight: 300;
                src: local('Motiva Sans'), url('https://store.akamai.steamstatic.com/public/shared/fonts/email/MotivaSans-Light.woff') format('woff');
            }
    
            @font-face {
                font-family: 'Motiva Sans';
                font-style: normal;
                font-weight: normal;
                src: local('Motiva Sans'), url('https://store.akamai.steamstatic.com//public/shared/fonts/email/MotivaSans-Regular.woff') format('woff');
            }
    
            @font-face {
                font-family: 'Motiva Sans';
                font-style: normal;
                font-weight: bold;
                src: local('Motiva Sans'), url('https://store.akamai.steamstatic.com//public/shared/fonts/email/MotivaSans-Bold.woff') format('woff');
            }
        </style>
    
        <style type="text/css" media="screen">
            body { padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#ffffff; -webkit-text-size-adjust:none }
            a { color:#3999ec; text-decoration:underline }
            body a { color:#ffffff; text-decoration:underline }
            img { margin: 0 !important; -ms-interpolation-mode: bicubic; }
    
            /* for recepits */
                table { mso-table-lspace:0pt; mso-table-rspace:0pt; }
                img, a img{ border:0; outline:none; text-decoration:none; }
                #outlook a { padding:0; }
                .ReadMsgBody { width:100%; }
                .ExternalClass { width:100%; }
                div,p,a,li,td,blockquote { mso-line-height-rule:exactly; }
                a[href^=tel],a[href^=sms] { color:inherit; text-decoration:none; }
                .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
            /* END for recepits */
    
            a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    
            .btn-18 a { display: block; padding: 13px 35px; text-decoration: none; }
    
            .l-white a { color: #ffffff; }
            .l-black a { color: #000001; }
            .l-grey1 a { color: #dbdee2; }
            .l-grey2 a { color: #a1a2a4; }
            .l-grey3 a { color: #dadcdd; }
            .l-grey4 a { color: #f1f1f1; }
            .l-grey5 a { color: #dddedf; }
            .l-grey6 a { color: #bfbfbf; }
            .l-grey7 a { color: #dcdddd; }
            .l-grey8 a { color: #8e96a4; }
            .l-green a { color: #a4d007; }
            .l-blue a { color: #6a7c96; }
            .l-blue1 a { color: #3999ec; }
            .l-blue2 a { color: #9eb8cc; }
    
    
            /* Mobile styles */
            @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                .mpy-35 { padding-top: 35px !important; padding-bottom: 35px !important; }
    
                .mpx-15 { padding-left: 15px !important; padding-right: 15px !important; }
    
                .mpx-20 { padding-left: 20px !important; padding-right: 20px !important; }
    
                .mpb-30 { padding-bottom: 30px !important; }
    
                .mpb-10 { padding-bottom: 10px !important; }
    
                .mpb-15 { padding-bottom: 15px !important; }
    
                .mpb-20 { padding-bottom: 20px !important; }
    
                .mpb-35 { padding-bottom: 35px !important; }
    
                .mpb-40 { padding-bottom: 40px !important; }
    
                .mpb-50 { padding-bottom: 50px !important; }
    
                .mpb-60 { padding-bottom: 60px !important; }
    
                .mpt-30 { padding-top: 30px !important; }
    
                .mpt-40 { padding-top: 40px !important; }
    
                .mpy-40 { padding-top: 40px !important; padding-bottom: 40px !important; }
    
                .mpt-0 { padding-top: 0px !important; }
    
                .mpr-0 { padding-right: 0px !important; }
    
                .mfz-14 { font-size: 14px !important; }
    
                .mfz-28 { font-size: 28px !important; }
    
                .mfz-16 { font-size: 16px !important; }
    
                .mfz-24 { font-size: 24px !important; }
    
                .mlh-18 { line-height: 18px !important; }
    
                u + body .gwfw { width:100% !important; width:100vw !important; }
    
                .td,
                .m-shell { width: 100% !important; min-width: 100% !important; }
    
                .mt-left { text-align: left !important; }
                .mt-center { text-align: center !important; }
                .mt-right { text-align: right !important; }
    
                .m-left { text-align: left !important; }
                .me-left { margin-right: auto !important; }
                .me-center { margin: 0 auto !important; }
                .me-right { margin-left: auto !important; }
    
                .mh-auto { height: auto !important; }
                .mw-auto { width: auto !important; }
    
                .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }
    
                .column,
                .column-top,
                .column-dir,
                .column-dir-top { float: left !important; width: 100% !important; display: block !important; }
    
                .kmMobileStretch { float: left !important; width: 100% !important; display: block !important; padding-left: 0 !important; padding-right: 0 !important; }
    
                .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
                .m-block { display: block !important; }
    
                .mw-15 { width: 15px !important; }
    
                .mw-2p { width: 2% !important; }
                .mw-32p { width: 32% !important; }
                .mw-49p { width: 49% !important; }
                .mw-50p { width: 50% !important; }
                .mw-100p { width: 100% !important; }
    
                .mbgs-200p { background-size: 200% auto !important; }
            }
        </style>
    </head>
    
    
    <body class="body" style="padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#ffffff; -webkit-text-size-adjust:none;">
    <center>
        <table width="100%" border="0" cellspacing="0" cellpadding="0"style="margin: 0; padding: 0; width: 100%; height: 100%;" bgcolor="#ffffff" class="gwfw">
            <tr>
                <td style="margin: 0; padding: 0; width: 100%; height: 100%;" align="center" valign="top">
                    <table width="775" border="0" cellspacing="0" cellpadding="0"class="m-shell">
                        <tr>
                            <td class="td" style="width:775px; min-width:775px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <!-- Main -->
                                    <tr>
                                        <td class="p-80 mpy-35 mpx-15" bgcolor="#212429" style="padding: 80px;">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
    
                                                <!-- Logo -->
                                                <tr>
                                                    <td class="img pb-45" style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 45px;">
                                                        <a href="https://cgv-cinema-movie.herokuapp.com/" target="_blank">
                                                            <img src="https://cgv-cinema-movie.herokuapp.com/image/icon-bg.png" width="200" height="88" border="0" alt="Steam" />
                                                        </a>
    
                                                    </td>
                                                </tr>
                                                <!-- END Logo -->
    
                                                <!-- All Content Exists within this table column -->
                                                <tr>
                                                    <td>
    
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="title-36 pb-30 c-grey6 fw-b" style="font-size:36px; line-height:42px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; text-align:left; padding-bottom: 30px; color:#bfbfbf; font-weight:bold;">
                            Xin chào! ${fullname},</td>
            </tr>
          </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="text-18 c-grey4 pb-30" style="font-size:18px; line-height:25px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; text-align:left; color:#dbdbdb; padding-bottom: 30px;">
                            Bạn vừa đăng ký thành viên CGV với tài khoản ${email}:</td>
            </tr>
          </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="pb-70 mpb-50" style="padding-bottom: 70px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0"bgcolor="#17191c">
                  <tr>
                    <td class="py-30 px-56" style="padding-top: 30px; padding-bottom: 30px; padding-left: 56px; padding-right: 56px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td class="title-48 c-blue1 fw-b a-center" style="font-size:48px; line-height:52px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; color:#3a9aed; font-weight:bold; text-align:center;">
                            <a href="${link}" style="text-decoration: none; color: #54ab35;">Active Account</a>											</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td class="text-18 c-grey4 pb-30" style="font-size:18px; line-height:25px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; text-align:left; color:#dbdbdb; padding-bottom: 30px;">
                            Email này được tạo do nỗ lực đăng nhập từ web hoặc thiết bị di động có địa chỉ <a style="color: #c6d4df;" href="https://cgv-cinema-movie.herokuapp.com/">https://cgv-cinema-movie.herokuapp.com/</a> . Nỗ lực đăng nhập bao gồm tên tài khoản và mật khẩu chính xác của bạn.<br><br>
                            Cần ấn "Active Account" để hoàn tất đăng nhập.<span style="color: #ffffff; font-weight: bold;">Không ai có thể truy cập tài khoản của bạn mà không truy cập email này.</span><br><br>
    <span style="color: #ffffff; font-weight: bold;">Nếu bạn không cố gắng đăng nhập</span>, sau đó vui lòng thay đổi mật khẩu của bạn và cân nhắc việc thay đổi mật khẩu email của bạn để đảm bảo an toàn cho tài khoản của bạn.</td>
            </tr>
          </table>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="text-18 c-blue1 pb-40" style="font-size:18px; line-height:25px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; text-align:left; color:#3a9aed; padding-bottom: 40px;"></td>
                    </tr>
                </table>
                
                                                                                                    <!-- Signature -->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="pt-30" style="padding-top: 30px;">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td class="img" width="3" bgcolor="#3a9aed" style="font-size:0pt; line-height:0pt; text-align:left;"></td>
                                                                        <td class="img" width="37" style="font-size:0pt; line-height:0pt; text-align:left;"></td>
                                                                        <td>
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                                                                                                        <td class="text-16 py-20 c-grey4 fallback-font" style="font-size:16px; line-height:22px; font-family:'Motiva Sans', Helvetica, Arial, sans-serif; text-align:left; padding-top: 20px; padding-bottom: 20px; color:#f1f1f1;">
                                                                                            Cheers,<br />
    CGV Việt Nam                                                                                   </td>
                                                                                                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!-- END Signature -->
                                                    
                                                    </td>
                                                </tr>
    
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- END Main -->
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
    </body>
    </html>
    `,
  });
  
  return info;
});