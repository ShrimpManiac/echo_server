// 수신한 데이터를 대문자로 변환
const handler10 = (data) => {
  const processedData = data.toString().toUpperCase();
  return Buffer.from(processedData);
};

export default handler10;
