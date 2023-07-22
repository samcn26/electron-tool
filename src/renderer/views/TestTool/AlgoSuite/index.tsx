import './index.scss';
import { Button, Space } from 'antd';
import { useEffect } from 'react';
import { GET } from 'renderer/api/ipc';
import HL7Config from './HL7Config';
import { getHl7 } from '../../../api/algosuite';

const AlgoSuiteTool = () => {
  const handleClick = () => {
    getHl7('hello');
  };
  useEffect(() => {
    const listener = GET('/algo/getHl7', (data) => {
      console.log(data);
    });
    return () => {
      listener();
    };
  }, []);
  return (
    <Space className="algo-test-tool">
      <HL7Config className="hl7-config" />
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
