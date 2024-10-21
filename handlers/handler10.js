// 문자열을 대문자로 바꾸는 핸들러
const handler10 = (data) => {
  const processedData = data.toString().toUpperCase();
  return Buffer.from(processedData);
};

export default handler10;
