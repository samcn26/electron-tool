import './index.scss';
import { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import { GET } from 'renderer/api/ipc';
import { algoHl7Config } from 'renderer/utils/consts';
import yaml from 'js-yaml';
import YamlEditor from '@focus-reactive/react-yaml';

import { getHl7 } from '../../../api/algosuite';

const AlgoSuiteTool = () => {
  const [yml, setYml] = useState(yaml.load(algoHl7Config) as object);
  const [hasError, setError] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClick = () => {
    if (!hasError) {
      getHl7(yml);
    } else {
      messageApi.open({
        type: 'error',
        content: '请检查yml格式',
      });
    }
  };
  const handleChange = ({ json }: any) => {
    setYml(json);
    setError(false);
  };
  const handleError = (err: any) => {
    setError(err);
  };

  useEffect(() => {
    const listener = GET('/algo/getHl7', ({ code, message: content }) => {
      if (code === 0) {
        messageApi.open({
          type: 'success',
          content,
        });
      } else {
        messageApi.open({
          type: 'error',
          content,
        });
      }
    });

    return () => {
      listener();
    };
  }, [messageApi]);
  //       {/* <HL7Config className="hl7-config" /> */}
  return (
    <Space className="algo-test-tool">
      {contextHolder}
      <div className="hl7-config">
        <YamlEditor
          text={algoHl7Config}
          onChange={handleChange}
          onError={handleError}
        />
      </div>

      <Button
        type="primary"
        shape="circle"
        className="btn"
        style={{ width: '80px', height: '80px' }}
        onClick={handleClick}
      >
        生成HL7
      </Button>
    </Space>
  );
};

export default AlgoSuiteTool;
