export const algoHl7Config: string = `# includes 中不需要的注释即可 ctr + /

orderNum: 230722
dateOfBirth: 20000107
# F/M/O/U
gender: F
order:
  # NW XO CA
  orderType: NW
  includes:
    # 虚拟项
    - GAAD
    - PreROMA
    - PostROMA
    # 固定格式 S3_
    - S3_AFP
    - S3_PIVKAII
    - S3_HE4
    - S3_CA125
observation:
  includes:
    - item: S3_AFP
      value: 3
      unit: ng/mL
      checkTime: 20230601080000
    - item: S3_PIVKAII
      value: 5
      unit: ng/mL
      checkTime: 20230602080000
    - item: S3_HE4
      value: 6
      unit: pmol/L
      checkTime: 20230603080000
    - item: S3_CA125
      value: 7
      unit: U/mL
      checkTime: 20230604080000
`;

export const FTPConfig: string = `# 只支持单个sandbox发送
host: 47.108.213.112
username: root
password: Flzx3kc@
port: 22
sandbox:
  # 不需要发的注释掉
  - name: cdp013
    rootpath: /tmp/corelab/cdp013/interface/CDP_Files
    order: Orders
    observation: Results
  # - name: cdp014
  #   rootpath: /tmp/corelab/cdp014_2/interface/CDP_Files
  #   order: Orders
  #   observation: Results
`;
