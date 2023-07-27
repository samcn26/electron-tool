export const templates = {
  order: `
MSH|^~\&|Lis01|FAC1|Infinity01|FAC2|20230610081559||OML^O21|t001|P|2.3|||ER|ER||8859/1
PID|1||p04112||^Smith||19000101|M
PV1|||1||||||||||||||||^^^^^^^^心血管内科|
DG1||ST|1.不稳定型心绞痛；2.高血压；
ORC|NW|t001|||||RI||20220601080000||||||||||1
OBR||t001||S3_AFP|||20220601080000||||A
OBR||t001||S3_PIVKAII|||20220601080000||||A
OBR||t001||S3_HE4|||20220601080000||||A
OBR||t001||S3_CA125|||20220601080000||||A
OBR||t001||GAAD|||20220601080000||||A
OBR||t001||PreROMA|||20220601080000||||A
OBR||t001||PostROMA|||20220601080000||||A
`,

  observation: `
MSH|^~\&|Infinity01|PACMAN-LAB|Lis01|PSM-LAB|20230610081559||ORU^R01|t002|P|2.5|||ER|NE
PID|1||p04112||^Smith||20000107|M
ORC|SC|t002|||CM||||20230610081559||||||||1
OBR|1|t002|||||||||||||||||||||||F
OBX|1|NM|S3_AFP||3||||||F|||20230601080000|1100^C8K_JZ_7A
OBX|2|NM|S3_PIVKAII||5||||||F|||20230601080000|1103^C8K_JZ_7A:MU1#c702#1#1^MU1-c702-1-1@5712^3
OBX|3|NM|S3_HE4||6||||||F|||20230601080000|1103^C8K_JZ_7A:MU1#c702#1#1^MU1-c702-1-1@5712^3
OBX|3|NM|S3_CA125||7||||||F|||20230601080000|1103^C8K_JZ_7A:MU1#c702#1#1^MU1-c702-1-1@5712^3
`,
};

export const locMapping = {
  // hl7 location mapping
  MSH: {
    // Message Control ID use order
    orderNum: 9,
  },
  PID: {
    dateOfBirth: 7,
    gender: 8,
  },
  ORC: {
    orderType: 1,
    orderNum: 2,
  },
  OBR: {
    orderNum: 2,
  },
  OBX: {
    item: 3,
    value: 5,
    unit: 6,
    checkTime: 14,
  },
};

// obr obx location of order/observation
export const filterLocInfo = {
  order: 4,
  observation: 3,
};
