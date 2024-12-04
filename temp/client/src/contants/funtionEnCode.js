import generalString from "./generalString";

export default function enCodeDataJson (data){
    let dataBase64 = Buffer.from(JSON.stringify(data)).toString('base64');
    let stringGeneral = generalString();
    let position = Math.floor(Math.random() * 8);
    let deCodeData = dataBase64.substring(0, position) + Buffer.from(stringGeneral).toString('base64') + dataBase64.substring(position);

    return `${deCodeData}..${stringGeneral}`;
}