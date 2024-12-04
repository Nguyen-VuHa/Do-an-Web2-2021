const baseString =
  "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomString = (length, base) => {
    let result = "";
    const baseLength = base.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = getRandomInt(0, baseLength);
        result += base[randomIndex];
    }

    return result;
};

export default function generalString(size = 8) {
    return getRandomString(size, baseString);
}